import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient.js'
import KPIBox from './KPIBox'
import UserTable from './UserTable.jsx'

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const res = await fetch(`http://localhost:5000/api/admin/metrics?user_id=${user.id}`)
      const data = await res.json()

      setMetrics(data)
      setLoading(false)
    }

    fetchMetrics()
  }, [])

  useEffect(() => {
    const fetchMetricsAndUsers = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [metricsRes, usersRes] = await Promise.all([
        fetch(`http://localhost:5000/api/admin/metrics?user_id=${user.id}`),
        fetch(`http://localhost:5000/api/admin/users?user_id=${user.id}`)
      ])

      const metricsData = await metricsRes.json()
      const usersData = await usersRes.json()

      setMetrics(metricsData)
      setUsers(usersData.users)
      setLoading(false)
    }

    fetchMetricsAndUsers()
  }, [])

  if (loading) {
    return <div className="p-6">Loading dashboard...</div>
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <KPIBox title="Total Revenue" value={`$${metrics.totalRevenue}`} />
        <KPIBox title="Active Campaigns" value={metrics.activeCampaigns} />
        <KPIBox title="Team Members" value={metrics.teamMembers} />
        <KPIBox title="Collection Rate" value={`${metrics.collectionRate}%`} />
      </div>
      <UserTable className='bg-grey txt-black' users={users}/>

      {/* Future: invites, members, activity feed */}
    </div>
  )
}

export default AdminDashboard
