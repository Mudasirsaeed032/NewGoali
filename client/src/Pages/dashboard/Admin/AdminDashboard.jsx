import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient.js'
import { Link } from 'react-router-dom'

import KPIBox from './KPIBox'
import UserTable from './UserTable.jsx'
import InviteTable from './InviteTable.jsx'
import AdminEventList from './AdminEventList.jsx';
import AdminFundraiserList from './AdminFundraiserList.jsx';
import AdminPaymentsTable from './AdminPaymentstTable.jsx'
import AthleteManager from './AthleteManager.jsx'

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [logs, setLogs] = useState([])
  const [payments, setPayments] = useState([])


  // Toggle state for sections
  const [showUsers, setShowUsers] = useState(true)
  const [showInvites, setShowInvites] = useState(true)
  const [showActivity, setShowActivity] = useState(false)

  useEffect(() => {
    const fetchMetricsAndUsers = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser()
        if (!user || userError) return

        const [metricsRes, usersRes, invitesRes, paymentsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/admin/metrics?user_id=${user.id}`),
          fetch(`http://localhost:5000/api/admin/users?user_id=${user.id}`),
          fetch(`http://localhost:5000/api/admin/invites?user_id=${user.id}`),
          fetch(`http://localhost:5000/api/admin/payments?user_id=${user.id}`)
        ])

        const metricsData = await metricsRes.json()
        const usersData = await usersRes.json()
        const invitesData = await invitesRes.json()
        const paymentsData = await paymentsRes.json()

        setMetrics(metricsData)
        setUsers(usersData.users)
        setInvites(invitesData.invites)
        setPayments(paymentsData.payments)  // ✅ add this
        setLoading(false)
      } catch (err) {
        console.error('Error in fetchMetricsAndUsers:', err)
      }
    }

    fetchMetricsAndUsers()
  }, [])


  if (loading) return <div className="p-6">Loading dashboard...</div>

  return (
    <div className="p-6 space-y-8">
      {/* Header & Invite Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <Link
            to="/events/create"
            className="bg-blue-600 text-white mx-2 px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Create Event
          </Link>
          <Link
            to="/fundraisers/create"
            className="bg-blue-600 text-white mx-2 px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Create Fundraisers
          </Link>
          <Link
            to="/admin/send-invite"
            className="bg-blue-600 text-white mx-2 px-4 py-2 rounded hover:bg-blue-700 text-sm">
            + Send Invite
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIBox title="Total Revenue" value={`$${metrics.totalRevenue}`} />
        <KPIBox title="Active Campaigns" value={metrics.activeCampaigns} />
        <KPIBox title="Team Members" value={metrics.teamMembers} />
        <KPIBox title="Collection Rate" value={`${metrics.collectionRate}%`} />
      </div>

      {/* Team Members Section */}
      <div className="border bg-white rounded mb-4">
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <span className="font-medium text-white-800">Team Members</span>
          <span>{showUsers ? '▾' : '▸'}</span>
        </button>
        {showUsers && <div className="p-4"><UserTable users={users} /></div>}
      </div>

      {/* Sent Invites Section */}
      <div className="border rounded mb-4">
        <button
          onClick={() => setShowInvites(!showInvites)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <span className="font-medium text-white-800">Sent Invites</span>
          <span>{showInvites ? '▾' : '▸'}</span>
        </button>
        {showInvites && <div className="p-4"><InviteTable invites={invites} /></div>}
      </div>

      {/* Activity Feed (placeholder for now) */}
      <div className="border rounded mb-4">
        <button
          onClick={() => setShowActivity(!showActivity)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <span className="font-medium text-white-800">Activity Feed</span>
          <span>{showActivity ? '▾' : '▸'}</span>
        </button>
        {showActivity && (
          <div className="p-4 space-y-2 text-sm">
            {logs.length === 0 && <p className="text-gray-400">No recent activity.</p>}
            {logs.map((log, index) => (
              <div key={index} className="border-b pb-2 text-gray-700">
                <p>{log.message}</p>
                <p className="text-xs text-gray-500">{new Date(log.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <AdminEventList />
      <AdminFundraiserList />
      <AdminPaymentsTable payments={payments} />
      <AthleteManager />

    </div>
  )
}

export default AdminDashboard
