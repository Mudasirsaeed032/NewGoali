import { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'

const AthleteManager = () => {
  const [teamId, setTeamId] = useState(null)
  const [userId, setUserId] = useState(null)
  const [athletes, setAthletes] = useState([])
  const [athleteUsers, setAthleteUsers] = useState([])
  const [form, setForm] = useState({ full_name: '', position: '', age: '', jersey_number: '', user_id: null })
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    const fetchInitial = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user.id)

      const { data: userData } = await supabase.from('users').select('team_id').eq('id', user.id).single()
      const team_id = userData.team_id
      setTeamId(team_id)

      // 1. Get users (athletes)
      const { data: userList } = await supabase
        .from('users')
        .select('id, full_name, email')
        .eq('team_id', team_id)
        .eq('role', 'athlete')

      setAthleteUsers(userList)

      // 2. Get existing athlete profiles
      const res = await fetch(`http://localhost:5000/api/athletes/by-team/${team_id}`)
      const { athletes } = await res.json()
      setAthletes(athletes)
    }

    fetchInitial()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCreate = (user_id, full_name) => {
    setForm({ full_name, position: '', age: '', jersey_number: '', user_id })
    setEditingId(null)
  }

  const handleEdit = (a) => {
    setForm({
      full_name: a.full_name,
      position: a.position || '',
      age: a.age || '',
      jersey_number: a.jersey_number || '',
      user_id: a.user_id
    })
    setEditingId(a.id)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this athlete profile?')) return
    await fetch(`http://localhost:5000/api/athletes/${id}`, { method: 'DELETE' })
    setAthletes(athletes.filter(a => a.id !== id))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      ...form,
      age: Number(form.age),
      jersey_number: Number(form.jersey_number),
      team_id: teamId,
      created_by: userId
    }

    if (editingId) {
      await fetch(`http://localhost:5000/api/athletes/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } else {
      await fetch('http://localhost:5000/api/athletes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }

    setForm({ full_name: '', position: '', age: '', jersey_number: '', user_id: null })
    setEditingId(null)

    const res = await fetch(`http://localhost:5000/api/athletes/by-team/${teamId}`)
    const { athletes } = await res.json()
    setAthletes(athletes)
  }

  const hasProfile = (user_id) => athletes.some((a) => a.user_id === user_id)

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingId ? 'Edit Athlete Profile' : 'Create Athlete Profile'}</h2>

      {form.user_id && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" required className="border p-2 rounded" />
          <input type="text" name="position" value={form.position} onChange={handleChange} placeholder="Position" className="border p-2 rounded" />
          <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" className="border p-2 rounded" />
          <input type="number" name="jersey_number" value={form.jersey_number} onChange={handleChange} placeholder="Jersey #" className="border p-2 rounded" />
          <button type="submit" className="col-span-full bg-blue-600 text-white py-2 rounded">
            {editingId ? 'Update Profile' : 'Create Profile'}
          </button>
        </form>
      )}

      <h3 className="text-xl font-semibold mb-2">Athletes</h3>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Position</th>
            <th className="p-2">Jersey</th>
            <th className="p-2">Age</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {athleteUsers.map((u) => {
            const profile = athletes.find((a) => a.user_id === u.id)
            return (
              <tr key={u.id} className="border-t">
                <td className="p-2">{u.full_name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{profile?.position || '-'}</td>
                <td className="p-2">{profile?.jersey_number || '-'}</td>
                <td className="p-2">{profile?.age || '-'}</td>
                <td className="p-2 space-x-2">
                  {profile ? (
                    <>
                      <button onClick={() => handleEdit(profile)} className="text-blue-600 text-xs">Edit</button>
                      <button onClick={() => handleDelete(profile.id)} className="text-red-600 text-xs">Delete</button>
                    </>
                  ) : (
                    <button onClick={() => handleCreate(u.id, u.full_name)} className="text-green-600 text-xs">Create Profile</button>
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

export default AthleteManager
