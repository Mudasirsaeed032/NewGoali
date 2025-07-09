const InviteTable = ({ invites }) => {
  return (

    <div className="bg-white text-black rounded-lg shadow p-4 overflow-x-auto mt-8">
      <h2 className="text-lg font-bold mb-4">Sent Invitations</h2>
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Invite Link</th>
            <th className="p-2">Expires</th>
          </tr>
        </thead>
        <tbody>
          {invites.map((invite) => (
            <tr key={invite.id} className="border-t">
              <td className="p-2">{invite.email}</td>
              <td className="p-2 capitalize">{invite.role}</td>
              <td className="p-2">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium
                    ${invite.status === 'accepted'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}
                >
                  {invite.status}
                </span>
              </td>
              <td className="p-2 text-blue-600 text-xs truncate max-w-[150px]">
                {`/join?token=${invite.token}`}
              </td>
              <td className="p-2 text-gray-600">
                {new Date(invite.expires_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InviteTable
