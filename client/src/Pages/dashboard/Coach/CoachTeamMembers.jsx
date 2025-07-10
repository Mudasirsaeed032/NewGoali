import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const CoachTeamMembers = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMembers = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data: coach, error } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single()

      if (error || !coach) return

      const { data: users } = await supabase
        .from('users')
        .select('*')
        .eq('team_id', coach.team_id)
        .in('role', ['parent', 'athlete'])

      setMembers(users || [])
      setLoading(false)
    }

    fetchMembers()
  }, [])

  const handleRemove = async (id) => {
    if (!confirm('Are you sure you want to remove this member?')) return

    const { error } = await supabase.from('users').delete().eq('id', id)

    if (error) {
      alert('Failed to remove member.')
    } else {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  if (loading) return <div className="p-6">Loading team members...</div>

  return (
    <div className="p-6 max-w-5xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Team Members</h2>
      {members.length === 0 ? (
        <p>No team members found.</p>
      ) : (
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Joined</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t border-gray-600">
                <td className="p-2">{m.full_name}</td>
                <td className="p-2">{m.email}</td>
                <td className="p-2 capitalize">{m.role}</td>
                <td className="p-2">{m.phone_number || '-'}</td>
                <td className="p-2">{new Date(m.created_at).toLocaleDateString()}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleRemove(m.id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CoachTeamMembers
