import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient.js'

const PublicFundraiserEventList = () => {
  const [items, setItems] = useState([])
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id || null)

      const { data: fundraisers } = await supabase
        .from('fundraisers')
        .select('*')
        .eq('status', 'published')

      const { data: events } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')

      const combined = [
        ...fundraisers.map(f => ({ ...f, type: 'fundraiser' })),
        ...events.map(e => ({ ...e, type: 'event' }))
      ]

      setItems(combined)
    }

    fetchData()
  }, [])

  const handleDonate = async (fundraiser_id) => {
    const amount = prompt('Enter donation amount (USD):')
    if (!amount || isNaN(amount)) return alert('Invalid amount')

    const res = await fetch('http://localhost:5000/api/payments/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        amount: parseFloat(amount),
        fundraiser_id
      })
    })

    const data = await res.json()
    window.location.href = data.url
  }

  const handleBuyTicket = async (event_id, price) => {
    const res = await fetch('http://localhost:5000/api/payments/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userId,
        amount: price,
        event_id
      })
    })

    const data = await res.json()
    window.location.href = data.url
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Support Our Fundraisers & Events</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map(item => (
          <div key={item.id} className="bg-white text-black shadow-md rounded-lg p-4 space-y-2">
            <h2 className="text-xl font-semibold">{item.title}</h2>
            <p>{item.description}</p>
            <p><strong>Date:</strong> {item.date ? new Date(item.date).toLocaleDateString() : 'N/A'}</p>
            {item.type === 'fundraiser' && (
              <>
                <p><strong>Goal:</strong> ${item.goal_amount}</p>
                <button
                  onClick={() => handleDonate(item.id)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Donate
                </button>
              </>
            )}
            {item.type === 'event' && (
              <>
                <p><strong>Price:</strong> ${item.price}</p>
                <button
                  onClick={() => handleBuyTicket(item.id, item.price)}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Buy Ticket
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default PublicFundraiserEventList
