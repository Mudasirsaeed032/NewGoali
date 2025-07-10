import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient.js';
import { Link } from 'react-router-dom';
import InviteManagement from '../../Invites/InviteManagement.jsx';
import AthleteManager from '../../Athletes/AthleteManager.jsx'; // adjust the path if needed
import CoachFundraiserManager from './CoachFundraiserManager.jsx';


const CoachDashboard = () => {
  const [teamId, setTeamId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamId = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('users')
        .select('team_id')
        .eq('id', user.id)
        .single();

      if (data) setTeamId(data.team_id);
      setLoading(false);
    };

    fetchTeamId();
  }, []);

  if (loading) return <div className="p-4">Loading Coach Dashboard...</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">Coach Dashboard</h1>

      <div className="space-y-12">
        <section><InviteManagement teamId={teamId} userRole="coach" /></section>
        <section>
          <Link to="/coach/fundraisers/manage" className="hover:underline">Manage Fundraisers</Link>
        </section>

        <section>
          <AthleteManager />
        </section>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Link to="/coach/team-members" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-center">
          Manage Team Members
        </Link>
        <Link to="/coach/donations" className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 text-center">
          Track Donations
        </Link>
      </div>

    </div>
  );
};

export default CoachDashboard;
