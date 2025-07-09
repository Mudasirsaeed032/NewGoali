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
      success_url: 'http://localhost:5173/fundraisers/:id',
      cancel_url: 'http://localhost:5173/fundraisers/cancel'
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe session error:', err)
    res.status(500).json({ error: 'Failed to create Stripe session' })
  }
}
