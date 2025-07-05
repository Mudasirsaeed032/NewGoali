import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const InviteManagementPage = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('athlete');
  const [teamId, setTeamId] = useState('');  // Should be selected from the list of teams
  const [isInviteSent, setIsInviteSent] = useState(false);

  const handleInviteSubmit = async () => {
    try {
      // Generate a unique token (could be a random string)
      const token = Math.random().toString(36).substr(2, 9);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);  // Set the invite to expire in 7 days

      const { error } = await supabase
        .from('invites')
        .insert([
          {
            email,
            role,
            team_id: teamId,
            token,
            expires_at: expiresAt.toISOString(),
          },
        ]);

      if (error) throw error;

      // You can send the invite via email or generate a link to share
      const inviteLink = `${window.location.origin}/join-team?token=${token}`;
      console.log('Invitation Link:', inviteLink);  // This can be shared or emailed

      setIsInviteSent(true);
    } catch (error) {
      console.error('Error sending invite:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Send Invitation</h1>

      <div className="mb-4">
        <label className="block text-gray-700">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="athlete">Athlete</option>
          <option value="coach">Coach</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Team</label>
        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full p-3 mt-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          {/* Example teams, this should be dynamically populated from the database */}
          <option value="team-id-1">Team 1</option>
          <option value="team-id-2">Team 2</option>
        </select>
      </div>

      <button
        onClick={handleInviteSubmit}
        className="w-full py-3 px-4 bg-blue-600 text-white rounded-md font-medium mt-6 hover:bg-blue-700 transition-colors"
      >
        Send Invitation
      </button>

      {isInviteSent && (
        <div className="mt-4 text-green-500">
          Invitation sent! You can share the invite link or send it via email.
        </div>
      )}
    </div>
  );
};

export default InviteManagementPage;
