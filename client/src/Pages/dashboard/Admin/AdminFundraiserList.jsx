import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'
import { Link } from 'react-router-dom'

const AdminFundraiserList = () => {
  const [fundraisers, setFundraisers] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFundraisers = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: profile } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single()

      let url = `http://localhost:5000/api/fundraisers?team_id=${profile.team_id}`
      if (filter !== 'all') url += `&status=${filter}`

      const res = await fetch(url)
      const json = await res.json()

      setFundraisers(json.fundraisers || [])
      setLoading(false)
    }

    fetchFundraisers()
  }, [filter])

  const handleStatusChange = async (id, newStatus) => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const res = await fetch(`http://localhost:5000/api/fundraisers/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, admin_id: user.id })
    })

    if (res.ok) {
      setFundraisers((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
      )
    } else {
      alert('Failed to update status')
    }
  }

  return (
    <div className="bg-gray rounded-lg shadow p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Manage Fundraisers</h2>
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
      ) : fundraisers.length === 0 ? (
        <p className="text-gray-500">No fundraisers found.</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Title</th>
              <th className="p-2">Goal</th>
              <th className="p-2">Raised</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fundraisers.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-2">{f.title}</td>
                <td className="p-2">${f.goal_amount}</td>
                <td className="p-2">${f.collected_amount}</td>
                <td className="p-2 capitalize">{f.status}</td>
                <td className="p-2 flex flex-wrap gap-2">
                  {f.status === 'pending' && (
                    <button
                      onClick={() => handleStatusChange(f.id, 'published')}
                      className="px-2 py-1 text-xs bg-green-500 text-white rounded"
                    >
                      Approve
                    </button>
                  )}
                  {f.status !== 'closed' && (
                    <button
                      onClick={() => handleStatusChange(f.id, 'closed')}
                      className="px-2 py-1 text-xs bg-gray-600 text-white rounded"
                    >
                      Close
                    </button>
                  )}
                  <Link
                    to={`/fundraisers/${f.id}`}
                    className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    View Page
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminFundraiserList
