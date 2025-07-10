import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient'

const UserTable = ({ users }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [teamUsers, setTeamUsers] = useState(users)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user)
    }
    getUser()
  }, [])

  const handleRemove = async (targetUserId) => {
    if (!currentUser) return

    const confirm = window.confirm('Are you sure you want to remove this user?')
    if (!confirm) return

    const res = await fetch('http://localhost:5000/api/admin/remove-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        admin_id: currentUser.id,
        user_id: targetUserId
      })
    })

    const data = await res.json()
    if (res.ok) {
      alert('User removed')
      // Remove user from local state
      setTeamUsers(teamUsers.filter(u => u.id !== targetUserId))
    } else {
      alert(`Failed: ${data.error}`)
    }
  }

  return (
    <div className="bg-white text-black rounded-lg shadow p-4 overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">Team Members</h2>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
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
          {teamUsers.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">{u.full_name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">
                <span className="inline-block px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs capitalize">
                  {u.role}
                </span>
              </td>
              <td className="p-2">{u.phone_number || '-'}</td>
              <td className="p-2">{new Date(u.created_at).toLocaleDateString()}</td>
              <td className="p-2">
                {(u.id !== currentUser?.id) && (
                  <button
                    onClick={() => handleRemove(u.id)}
                    className="text-red-600 hover:underline text-xs"
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
