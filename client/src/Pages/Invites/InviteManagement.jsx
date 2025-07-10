import { useState } from "react";

const InviteManagement = ({ teamId, userRole }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('parent');

  const allowedRoles = userRole === 'coach' ? ['parent', 'athlete'] : ['admin', 'coach', 'parent', 'athlete'];

  const handleSend = async () => {
    const res = await fetch('http://localhost:5000/api/invite/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role, team_id: teamId })
    });

    const data = await res.json();
    if (res.ok) alert('Invite sent');
    else alert('Failed to send invite');
  };

  return (
    <div className="bg-gray shadow-md p-4 rounded mt-4">
      <h2 className="text-lg font-semibold mb-2">Send Invite</h2>
      <input
        type="email"
        placeholder="Email"
        className="border px-2 py-1 mr-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <select
        className="border px-2 py-1 mr-2"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        {allowedRoles.map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={handleSend}>Send</button>
    </div>
  );
};

export default InviteManagement;
