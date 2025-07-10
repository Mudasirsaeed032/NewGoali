import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { Link } from 'react-router-dom'

const AthleteDashboard = () => {
  const [user, setUser] = useState(null)
  const [fundraisers, setFundraisers] = useState([])
  const [tickets, setTickets] = useState([])
  const [inviteLink, setInviteLink] = useState('')

  useEffect(() => {
    const fetchDashboard = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUser(user)

      // ✅ Fetch own fundraisers
      const { data: fundraiserData } = await supabase
        .from('fundraisers')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false })

      setFundraisers(fundraiserData)

      // ✅ Get team_id for invite
      const { data: userRecord } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single()

      if (userRecord?.team_id) {
        const invite = `${window.location.origin}/join?token=${user.id}&role=parent`
        setInviteLink(invite)
      }

      // ✅ Fetch tickets
      const res = await fetch(`http://localhost:5000/api/tickets/by-user/${user.id}`)
      const data = await res.json()
      setTickets(data.tickets || [])
    }

    fetchDashboard()
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink)
    alert('Parent invite link copied!')
  }

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Athlete Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create Fundraiser</h2>
        <Link to="/create-fundraiser" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + New Fundraiser
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Fundraisers</h2>
        {fundraisers.length === 0 ? (
          <p>No fundraisers yet.</p>
        ) : (
          <ul className="space-y-2">
            {fundraisers.map(f => (
              <li key={f.id} className="border border-gray-600 p-4 rounded bg-gray-800">
                <div className="font-semibold">{f.title}</div>
                <div>Status: {f.status}</div>
                <Link to={`/fundraiser/${f.id}`} className="text-blue-400 text-sm underline">View / Donate</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Invite Parent</h2>
        {inviteLink && (
          <>
            <input value={inviteLink} readOnly className="bg-gray-700 p-2 rounded w-full mb-2 text-white" />
            <button onClick={handleCopy} className="bg-green-600 px-4 py-1 rounded hover:bg-green-700">
              Copy Invite Link
            </button>
          </>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Tickets</h2>
        {tickets.length === 0 ? (
          <p>No tickets purchased.</p>
        ) : (
          <table className="w-full text-sm text-left bg-white text-black rounded shadow">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2">Event</th>
                <th className="p-2">Date</th>
                <th className="p-2">QR Code</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} className="border-t">
                  <td className="p-2">{ticket.event_title}</td>
                  <td className="p-2">{new Date(ticket.created_at).toLocaleDateString()}</td>
                  <td className="p-2">
                    <img src={ticket.qr_code_url} alt="QR Code" className="h-16" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default AthleteDashboard
