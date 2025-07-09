import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const AdminEventList = () => {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single()

      let url = `http://localhost:5000/api/events?team_id=${profile.team_id}`
      if (filter !== 'all') url += `&status=${filter}`

      const res = await fetch(url)
      const json = await res.json()

      setEvents(json.events || [])
      setLoading(false)
    }

    fetchEvents()
  }, [filter])

  const handleStatusChange = async (eventId, newStatus) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const res = await fetch(`http://localhost:5000/api/events/${eventId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, admin_id: user.id })
    })

    if (res.ok) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === eventId ? { ...ev, status: newStatus } : ev
        )
      )
    } else {
      alert('Failed to update status')
    }
  }

  return (
    <div className="bg-gray rounded-lg shadow p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Manage Events</h2>
        <select
          className="border rounded px-3 py-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="published">Published</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Date</th>
              <th className="p-2">Location</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-t">
                <td className="p-2">{ev.title}</td>
                <td className="p-2">{new Date(ev.date).toLocaleDateString()}</td>
                <td className="p-2">{ev.location}</td>
                <td className="p-2 capitalize">{ev.status}</td>
                <td className="p-2 space-x-2">
                  {ev.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(ev.id, 'published')}
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>
                  )}
                  {ev.status !== 'closed' && (
                    <button
                      onClick={() => handleStatusChange(ev.id, 'closed')}
                      className="px-2 py-1 text-xs bg-gray-500 text-white rounded"
                    >
                      Close
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminEventList
