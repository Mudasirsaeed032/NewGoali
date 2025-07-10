require('dotenv').config();
const supabase = require('../services/supabase');
const QRCode = require('qrcode');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook error:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const metadata = session.metadata || {}

    // ✅ Fetch team_id from user metadata
    const { data: user, error: userErr } = await supabase
      .from('users')
      .select('team_id')
      .eq('id', metadata.user_id)
      .single()

    if (userErr || !user) {
      console.error('Failed to fetch user/team:', userErr)
      return res.status(500).json({ error: 'Failed to get team_id' })
    }

    // ✅ Build payment object
    const newPayment = {
      user_id: metadata.user_id,
      amount: session.amount_total / 100,
      method: 'stripe',
      status: 'completed',
      fundraiser_id: metadata.fundraiser_id || null,
      event_id: metadata.event_id || null,
      team_id: user.team_id,
      type: metadata.event_id ? 'ticket' : 'donation'  // ✅ matches allowed values
    }



    // ✅ Insert into payments
    const { error: insertError } = await supabase
      .from('payments')
      .insert(newPayment)

    if (insertError) {
      console.error('Failed to store payment:', insertError)
      return res.status(500).json({ error: 'Failed to store payment' })
    }

    // ✅ Update fundraiser total
    if (metadata.fundraiser_id) {
      await supabase.rpc('update_collected_amount', {
        fid: metadata.fundraiser_id
      })
    }
    // ✅ Ticket generation
  if (metadata.event_id) {
    const ticketData = {
      user_id: metadata.user_id,
      event_id: metadata.event_id,
    }

    const ticketPayload = JSON.stringify({
      user_id: metadata.user_id,
      event_id: metadata.event_id,
      purchased_at: new Date().toISOString(),
    })

    const qrDataURL = await QRCode.toDataURL(ticketPayload)

    const { error: ticketError } = await supabase
      .from('tickets')
      .insert({
        ...ticketData,
        qr_code_url: qrDataURL
      })

    if (ticketError) {
      console.error('Failed to insert ticket:', ticketError)
    }
  }

    return res.status(200).json({ received: true })
  }

  res.status(200).json({ received: true })
}
