import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

const MyTickets = () => {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: ticketData, error } = await supabase
        .from('tickets')
        .select('id, event_id, qr_code_url, created_at, events ( title, date, location )')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Failed to fetch tickets:', error)
      } else {
        setTickets(ticketData)
      }

      setLoading(false)
    }

    fetchTickets()
  }, [])

  if (loading) return <div className="p-6">Loading your tickets...</div>

  if (tickets.length === 0) return (
    <div className="p-6 text-center text-gray-600">
      You haven’t purchased any tickets yet.
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Tickets</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-gray p-4 shadow rounded border">
            <h3 className="text-lg font-semibold mb-1">{ticket.events?.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(ticket.events?.date).toDateString()} | {ticket.events?.location}
            </p>
            <img src={ticket.qr_code_url} alt="QR Code" className="w-full h-auto rounded" />
            <p className="mt-2 text-xs text-gray-400">
              Purchased: {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyTickets
