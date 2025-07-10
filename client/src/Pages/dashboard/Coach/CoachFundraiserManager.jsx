import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const CoachFundraiserManager = () => {
  const [userId, setUserId] = useState(null)
  const [teamId, setTeamId] = useState(null)
  const [fundraisers, setFundraisers] = useState([])
  const [form, setForm] = useState({
    title: '',
    description: '',
    goal_amount: ''
  })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const fetchInitial = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user.id)

      const { data: userData } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single()

      setTeamId(userData.team_id)

      const res = await fetch(`http://localhost:5000/api/fundraisers/owned/${user.id}`)
      const { fundraisers } = await res.json()
      setFundraisers(fundraisers)
    }

    fetchInitial()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleEdit = (f) => {
    setForm({
      title: f.title,
      description: f.description,
      goal_amount: f.goal_amount
    })
    setEditingId(f.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this fundraiser?')) return
    await fetch(`http://localhost:5000/api/fundraisers/${id}`, { method: 'DELETE' })
    setFundraisers(fundraisers.filter(f => f.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,
      goal_amount: Number(form.goal_amount),
      collected_amount: 0,
      team_id: teamId,
      owner_id: userId,
      status: 'pending_approval'
    }

    if (editingId) {
      await fetch(`http://localhost:5000/api/fundraisers/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } else {
      await fetch('http://localhost:5000/api/fundraisers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }

    setForm({ title: '', description: '', goal_amount: '' })
    setEditingId(null)

    const res = await fetch(`http://localhost:5000/api/fundraisers/owned/${userId}`)
    const { fundraisers } = await res.json()
    setFundraisers(fundraisers)
  }

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Fundraiser' : 'Create Fundraiser'}</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="border rounded p-2 bg-gray-800 text-white"
        />
        <input
          type="number"
          name="goal_amount"
          value={form.goal_amount}
          onChange={handleChange}
          placeholder="Goal Amount"
          required
          className="border rounded p-2 bg-gray-800 text-white"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows="3"
          className="col-span-full border rounded p-2 bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="col-span-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Fundraiser' : 'Create Fundraiser'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">My Fundraisers</h3>
      <table className="w-full text-sm text-left border border-gray-600">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Status</th>
            <th className="p-2">Progress</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {fundraisers.map((f) => {
            const percent = f.collected_amount && f.goal_amount
              ? Math.min(100, (f.collected_amount / f.goal_amount) * 100)
              : 0
            return (
              <tr key={f.id} className="border-t border-gray-600">
                <td className="p-2">{f.title}</td>
                <td className="p-2 capitalize">{f.status}</td>
                <td className="p-2">
                  <div className="w-full bg-gray-700 rounded">
                    <div
                      className="bg-green-500 text-xs text-center text-white rounded"
                      style={{ width: `${percent}%` }}
                    >
                      {percent.toFixed(1)}%
                    </div>
                  </div>
                </td>
                <td className="p-2 space-x-2">
                  {f.status !== 'published' && (
                    <>
                      <button onClick={() => handleEdit(f)} className="text-blue-400 text-xs">Edit</button>
                      {f.collected_amount === 0 && (
                        <button onClick={() => handleDelete(f.id)} className="text-red-400 text-xs">Delete</button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default CoachFundraiserManager
