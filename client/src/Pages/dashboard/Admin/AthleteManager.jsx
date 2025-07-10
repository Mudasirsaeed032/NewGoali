import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const AthleteManager = () => {
  const [athletes, setAthletes] = useState([])
  const [teamId, setTeamId] = useState(null)
  const [formData, setFormData] = useState({
    full_name: '',
    position: '',
    age: '',
    jersey_number: '',
    stats: '{}'
  })

  const fetchAthletes = async (team_id) => {
    const res = await fetch(`http://localhost:5000/api/athletes/by-team/${team_id}`)
    const data = await res.json()
    setAthletes(data.athletes || [])
  }

  useEffect(() => {
    const getTeamId = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      const { data, error } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single()
      if (!error) {
        setTeamId(data.team_id)
        fetchAthletes(data.team_id)
      }
    }
    getTeamId()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    const { data: { user } } = await supabase.auth.getUser()
    const res = await fetch('http://localhost:5000/api/athletes/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        team_id: teamId,
        created_by: user.id
      })
    })
    if (res.ok) {
      setFormData({ full_name: '', position: '', age: '', jersey_number: '', stats: '{}' })
      fetchAthletes(teamId)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this athlete?')) return
    await fetch(`http://localhost:5000/api/athletes/${id}`, { method: 'DELETE' })
    fetchAthletes(teamId)
  }

  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-2">Athlete Profiles</h2>
      <form onSubmit={handleCreate} className="flex flex-wrap gap-2 mb-4">
        <input name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Name" required className="p-2 border rounded" />
        <input name="position" value={formData.position} onChange={handleChange} placeholder="Position" className="p-2 border rounded" />
        <input name="jersey_number" value={formData.jersey_number} onChange={handleChange} placeholder="Jersey #" type="number" className="p-2 border rounded w-24" />
        <input name="age" value={formData.age} onChange={handleChange} placeholder="Age" type="number" className="p-2 border rounded w-20" />
        <input name="stats" value={formData.stats} onChange={handleChange} placeholder="Stats JSON" className="p-2 border rounded flex-grow" />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left bg-white rounded shadow">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Position</th>
              <th className="p-2">Jersey #</th>
              <th className="p-2">Age</th>
              <th className="p-2">Stats</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2">{a.full_name}</td>
                <td className="p-2">{a.position}</td>
                <td className="p-2">{a.jersey_number}</td>
                <td className="p-2">{a.age}</td>
                <td className="p-2 text-xs break-all">{a.stats}</td>
                <td className="p-2">
                  <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline text-xs">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AthleteManager
