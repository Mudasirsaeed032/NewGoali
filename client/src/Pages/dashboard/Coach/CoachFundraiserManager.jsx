import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const CoachFundraiserManager = () => {
  const [fundraisers, setFundraisers] = useState([])
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    const fetchFundraisers = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data } = await supabase
        .from('fundraisers')
        .select('*')
        .eq('owner_id', user.id)

      setFundraisers(data || [])
    }

    fetchFundraisers()
  }, [])

  const handleEdit = (fundraiser) => {
    setEditing(fundraiser)
  }

  const handleChange = (e) => {
    setEditing({ ...editing, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch(`http://localhost:5000/api/fundraisers/${editing.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing)
    })

    if (res.ok) {
      alert('Fundraiser updated.')
      setEditing(null)
      const refreshed = await supabase
        .from('fundraisers')
        .select('*')
        .eq('owner_id', editing.owner_id)
      setFundraisers(refreshed.data || [])
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Your Fundraisers</h2>
      <table className="w-full text-sm text-left mb-8">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Goal</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fundraisers.map((f) => (
            <tr key={f.id} className="border-t border-gray-600">
              <td className="p-2">{f.title}</td>
              <td className="p-2">${f.goal_amount}</td>
              <td className="p-2 capitalize">{f.status}</td>
              <td className="p-2">
                <button
                  onClick={() => handleEdit(f)}
                  className="text-blue-500 text-xs hover:underline"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded">
          <h3 className="text-lg mb-2">Edit Fundraiser</h3>
          <input
            type="text"
            name="title"
            value={editing.title}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded text-black"
            placeholder="Title"
          />
          <textarea
            name="description"
            value={editing.description}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded text-black"
            placeholder="Description"
          />
          <input
            type="number"
            name="goal_amount"
            value={editing.goal_amount}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded text-black"
            placeholder="Goal Amount"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
        </form>
      )}
    </div>
  )
}

export default CoachFundraiserManager
