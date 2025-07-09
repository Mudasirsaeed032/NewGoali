const UserTable = ({ users }) => {
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
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
