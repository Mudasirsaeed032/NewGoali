const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.createFundraiserCheckout = async (req, res) => {
  const { amount, fundraiser_id, user_id, email } = req.body

  if (!amount || !fundraiser_id) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation to Fundraiser'
            },
            unit_amount: Math.round(amount * 100)  // Stripe uses cents
          },
          quantity: 1
        }
      ],
      metadata: {
        fundraiser_id,
        user_id: user_id || '',
        email: email || ''
      },
      success_url: `http://localhost:5173/fundraisers/${fundraiser_id}`,
      cancel_url: `http://localhost:5173/fundraisers/${fundraiser_id}?cancelled=true`
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session error:', err)
    res.status(500).json({ error: 'Failed to create Stripe session' })
  }
}

exports.createEventCheckout = async (req, res) => {
  const { event_id, user_id, email, amount } = req.body

  if (!event_id || !amount) {
    return res.status(400).json({ error: 'Missing event ID or amount' })
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Event Ticket',
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        event_id,
        user_id: user_id || '',
        email: email || '',
      },
      success_url: `http://localhost:5173/events/${event_id}`,
      cancel_url: `http://localhost:5173/fundraisers/${event_id}?cancelled=true`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe event checkout error:', err)
    res.status(500).json({ error: 'Failed to create Stripe session' })
  }
}
