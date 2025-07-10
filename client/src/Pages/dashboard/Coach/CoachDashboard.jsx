import { useEffect, useState } from 'react';
import { supabase } from '../../../supabaseClient.js';
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
          <CoachFundraiserManager />
        </section>

        <section>
          <AthleteManager />
        </section>
      </div>
    </div>
  );
};

export default CoachDashboard;
