import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setEvent(data)
    }

    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchEvent()
    fetchUser()
  }, [id])

  const handleBuyTicket = async () => {
    if (!event) return

    const res = await fetch('http://localhost:5000/api/checkout/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: id,
        user_id: user?.id || null,
        email: user?.email || null,
        amount: event.price
      })
    })

    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert('Failed to create Stripe session')
    }
  }

  if (!event) return <div className="p-6">Loading event...</div>

  return (
    <div className="max-w-xl mx-auto mt-6 p-6 bg-gray shadow rounded">
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="mb-2 text-gray-700">{event.description}</p>
      <p className="text-sm text-gray-500 mb-2">Location: {event.location}</p>
      <p className="text-sm text-gray-500 mb-2">Date: {new Date(event.date).toDateString()}</p>
      <p className="text-sm text-gray-700 mb-4">Ticket Price: <strong>${event.price}</strong></p>

      <button
        onClick={handleBuyTicket}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Buy Ticket with Stripe
      </button>
    </div>
  )
}

export default EventDetail
