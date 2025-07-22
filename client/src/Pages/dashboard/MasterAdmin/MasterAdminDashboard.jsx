import { useEffect, useState } from 'react'
import { supabase } from '../../../supabaseClient.js'
import KPIBox from '../Admin/KPIBox'
import UserTable from '../Admin/UserTable'
import InviteTable from '../Admin/InviteTable'
import AdminEventList from '../Admin/AdminEventList'
import AdminFundraiserList from '../Admin/AdminFundraiserList'
import AdminPaymentsTable from '../Admin/AdminPaymentstTable'
import { Link } from 'react-router-dom'

const MasterAdminDashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [payments, setPayments] = useState([])
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)

  const [showUsers, setShowUsers] = useState(true)
  const [showInvites, setShowInvites] = useState(true)
  const [showActivity, setShowActivity] = useState(false)

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [
          metricsRes,
          usersRes,
          invitesRes,
          paymentsRes,
          logsRes
        ] = await Promise.all([
          fetch('http://localhost:5000/api/master/metrics'),
          fetch('http://localhost:5000/api/master/users'),
          fetch('http://localhost:5000/api/master/invites'),
          fetch('http://localhost:5000/api/master/payments'),
          fetch('http://localhost:5000/api/master/logs'),
        ])

        const metricsData = await metricsRes.json()
        const usersData = await usersRes.json()
        const invitesData = await invitesRes.json()
        const paymentsData = await paymentsRes.json()
        const logsData = await logsRes.json()

        setMetrics(metricsData)
        setUsers(usersData.users)
        setInvites(invitesData.invites)
        setPayments(paymentsData.payments)
        setLogs(logsData.logs)
        setLoading(false)
      } catch (err) {
        console.error('Error loading master admin dashboard:', err)
      }
    }

    fetchGlobalData()
  }, [])

  if (loading) return <div className="p-6">Loading Master Admin Dashboard...</div>

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Master Admin Dashboard</h1>
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
            Create Fundraiser
          </Link>
        </div>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPIBox title="Total Revenue" value={`$${metrics.totalRevenue}`} />
        <KPIBox title="Active Campaigns" value={metrics.activeCampaigns} />
        <KPIBox title="Total Users" value={metrics.totalUsers} />
        <KPIBox title="Team Count" value={metrics.totalTeams} />
      </div>

      {/* Users Table */}
      <div className="border bg-white rounded mb-4">
        <button
          onClick={() => setShowUsers(!showUsers)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <span className="font-medium text-gray-800">All Users</span>
          <span>{showUsers ? '▾' : '▸'}</span>
        </button>
        {showUsers && <div className="p-4"><UserTable users={users} /></div>}
      </div>

      {/* Invite Table */}
      <div className="border rounded mb-4">
        <button
          onClick={() => setShowInvites(!showInvites)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <span className="font-medium text-gray-800">Sent Invites</span>
          <span>{showInvites ? '▾' : '▸'}</span>
        </button>
        {showInvites && <div className="p-4"><InviteTable invites={invites} /></div>}
      </div>

      {/* Logs */}
      <div className="border rounded mb-4">
        <button
          onClick={() => setShowActivity(!showActivity)}
          className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-left"
        >
          <span className="font-medium text-gray-800">Activity Feed</span>
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

      {/* Global Lists */}
      <AdminEventList /> {/* Should render events across all teams */}
      <AdminFundraiserList /> {/* Should render fundraisers across all teams */}
      <AdminPaymentsTable payments={payments} /> {/* Global payments list */}
    </div>
  )
}

export default MasterAdminDashboard
