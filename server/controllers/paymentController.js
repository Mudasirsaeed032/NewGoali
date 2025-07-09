require('dotenv').config();
const supabase = require('../services/supabase')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook error:', err.message)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    const metadata = session.metadata || {}

    const newPayment = {
      user_id: metadata.user_id,
      amount: session.amount_total / 100,
      method: 'stripe',
      status: 'completed',
      fundraiser_id: metadata.fundraiser_id || null,
      event_id: metadata.event_id || null
    }

    const { error: insertError } = await supabase.from('payments').insert(newPayment)
    if (insertError) console.error('Failed to store payment:', insertError)

    // Optional: update fundraiser collected_amount
    if (metadata.fundraiser_id) {
      await supabase.rpc('update_collected_amount', { fid: metadata.fundraiser_id })
    }

    return res.status(200).json({ received: true })
  }

  res.status(200).json({ received: true })
}
