"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../../supabaseClient.js"
import { Link } from "react-router-dom"
import {
  BarChart3,
  Users,
  DollarSign,
  Calendar,
  Settings,
  Plus,
  TrendingUp,
  Target,
  Trophy,
  CheckCircle,
  CreditCard,
  Heart,
  ArrowLeft,
  UserPlus,
  Shield,
} from "lucide-react"
import UserTable from "./UserTable.jsx"
import InviteTable from "./InviteTable.jsx"
import AdminEventList from "./AdminEventList.jsx"
import AdminFundraiserList from "./AdminFundraiserList.jsx"
import AdminPaymentsTable from "./AdminPaymentstTable.jsx"

const AdminDashboard = () => {
  const navigate = useNavigate()
  const [metrics, setMetrics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [invites, setInvites] = useState([])
  const [logs, setLogs] = useState([])
  const [payments, setPayments] = useState([])
  const [isStripeConnected, setIsStripeConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [currentUser, setCurrentUser] = useState(null)


  // Toggle state for sections
  const [showUsers, setShowUsers] = useState(true)
  const [showInvites, setShowInvites] = useState(true)
  const [showActivity, setShowActivity] = useState(false)

  useEffect(() => {
    const fetchMetricsAndUsers = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()
        if (!user || userError) return

        const [metricsRes, usersRes, invitesRes, paymentsRes] = await Promise.all([
          fetch(`http://localhost:5000/api/admin/metrics?user_id=${user.id}`),
          fetch(`http://localhost:5000/api/admin/users?user_id=${user.id}`),
          fetch(`http://localhost:5000/api/admin/invites?user_id=${user.id}`),
          fetch(`http://localhost:5000/api/admin/payments?user_id=${user.id}`),
        ])

        const metricsData = await metricsRes.json()
        const usersData = await usersRes.json()
        const invitesData = await invitesRes.json()
        const paymentsData = await paymentsRes.json()

        const { data: userRow } = await supabase
          .from("users")
          .select("team_id, organization_name")
          .eq("id", user.id)
          .single()

        setCurrentUser(userRow)


        const { data: team } = await supabase
          .from("teams")
          .select("stripe_connect_id")
          .eq("id", userRow.team_id)
          .single()

        setIsStripeConnected(!!team?.stripe_connect_id)
        setMetrics(metricsData)
        setUsers(usersData.users)
        setInvites(invitesData.invites)
        setPayments(paymentsData.payments)
        setLoading(false)
      } catch (err) {
        console.error("Error in fetchMetricsAndUsers:", err)
      }
    }

    fetchMetricsAndUsers()
  }, [])

  const handleStripeConnect = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const res = await fetch(`http://localhost:5000/api/stripe/connect?user_id=${user.id}`)
    const { url } = await res.json()
    if (url) window.location.href = url
  }

  const navigationTabs = [
    { id: "overview", label: "Overview", icon: BarChart3, description: "Dashboard summary and key metrics" },
    { id: "users", label: "Team Members", icon: Users, description: "Manage team members and permissions" },
    { id: "invites", label: "Invitations", icon: UserPlus, description: "Manage sent invitations" },
    { id: "events", label: "Events", icon: Calendar, description: "Manage fundraising events and activities" },
    { id: "fundraisers", label: "Fundraisers", icon: Heart, description: "Track fundraising campaigns" },
    { id: "payments", label: "Payments", icon: CreditCard, description: "Monitor payment transactions" },
    { id: "activity", label: "Activity", icon: TrendingUp, description: "View recent activity logs" },
    { id: "settings", label: "Settings", icon: Settings, description: "System configuration and preferences" },
  ]

  const currentTab = navigationTabs.find((tab) => tab.id === activeTab)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
        >
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
            <span className="text-lg font-header text-gray-900">Loading dashboard...</span>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Back to Home Button */}
            <motion.button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body">Back to Home</span>
            </motion.button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-title text-gray-900">Goali</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <h1 className="text-xl font-header text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 font-body">Thunder Soccer Club</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-title text-gray-900 mb-2">{currentUser?.organization_name || 'My Organization'}</h1>
            <p className="text-gray-600 font-body">Manage all aspects of your organization</p>
          </div>

          <div className="flex items-center space-x-4">
            {!isStripeConnected && (
              <motion.button
                onClick={handleStripeConnect}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield className="h-4 w-4" />
                <span>Connect Stripe</span>
              </motion.button>
            )}
            <Link
              to="/events/create"
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200 no-underline"
            >
              <Plus className="h-4 w-4 text-white" />
              <span className="text-white">Create Event</span>
            </Link>
            <Link
              to="/fundraisers/create"
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200 no-underline"
            >
              <Heart className="h-4 w-4 text-white" />
              <span className="text-white">Create Fundraiser</span>
            </Link>
            <Link
              to="/admin/send-invite"
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200 no-underline"
            >
              <UserPlus className="h-4 w-4 text-white" />
              <span className="text-white">Send Invite</span>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="flex">
        {/* Left Sidebar - Navigation */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h3 className="text-lg font-header text-gray-900 mb-4">Navigation</h3>

            <div className="space-y-2">
              {navigationTabs.map((tab) => {
                const IconComponent = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${activeTab === tab.id
                      ? "bg-blue-50 border-2 border-blue-200 text-blue-900"
                      : "hover:bg-gray-50 border-2 border-transparent text-gray-700"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent
                        className={`h-5 w-5 ${activeTab === tab.id ? "text-blue-600" : "text-gray-500"}`}
                      />
                      <span className="font-header">{tab.label}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Quick Stats Summary */}
            {metrics && (
              <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h4 className="font-header text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-gray-600">Total Revenue</span>
                    <span className="font-header text-blue-900">${metrics.totalRevenue}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-gray-600">Active Campaigns</span>
                    <span className="font-header text-purple-900">{metrics.activeCampaigns}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-gray-600">Team Members</span>
                    <span className="font-header text-green-900">{metrics.teamMembers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body text-gray-600">Collection Rate</span>
                    <span className="font-header text-orange-900">{metrics.collectionRate}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Dashboard Overview</h2>
                  <p className="text-gray-600 font-body">Complete summary of your organization's performance</p>
                </div>

                {/* KPI Grid */}
                {metrics && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        title: "Total Revenue",
                        value: `$${metrics.totalRevenue}`,
                        change: "+12%",
                        icon: DollarSign,
                        color: "green",
                      },
                      {
                        title: "Active Campaigns",
                        value: metrics.activeCampaigns.toString(),
                        change: "+8%",
                        icon: Target,
                        color: "blue",
                      },
                      {
                        title: "Team Members",
                        value: metrics.teamMembers.toString(),
                        change: "+2",
                        icon: Users,
                        color: "purple",
                      },
                      {
                        title: "Collection Rate",
                        value: `${metrics.collectionRate}%`,
                        change: "+5%",
                        icon: TrendingUp,
                        color: "orange",
                      },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 bg-${stat.color}-100 rounded-xl flex items-center justify-center`}>
                            <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                          </div>
                          <span
                            className={`text-sm font-header text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-full`}
                          >
                            {stat.change}
                          </span>
                        </div>
                        <h3 className="text-2xl font-title text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-gray-600 font-body">{stat.title}</p>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {logs.length === 0 ? (
                      <p className="text-gray-400 font-body">No recent activity.</p>
                    ) : (
                      logs.map((log, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-header text-gray-900">{log.message}</p>
                            <p className="text-sm text-gray-600 font-body">
                              {new Date(log.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Team Members</h2>
                  <p className="text-gray-600 font-body">Manage your team members and their permissions</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Team Members ({users.length})</h3>
                  </div>
                  <div className="p-6">
                    <UserTable users={users} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invites Tab */}
            {activeTab === "invites" && (
              <motion.div
                key="invites"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Sent Invitations</h2>
                  <p className="text-gray-600 font-body">Track and manage sent invitations</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Pending Invitations ({invites.length})</h3>
                  </div>
                  <div className="p-6">
                    <InviteTable invites={invites} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Events Tab */}
            {activeTab === "events" && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Event Management</h2>
                    <p className="text-gray-600 font-body">Manage all fundraising events and activities</p>
                  </div>
                  <Link
                    to="/events/create"
                    className=" text-white px-6 py-2 rounded-lg font-header hover:bg-blue-700 transition-colors no-underline"
                  >
                    Create Event
                  </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <AdminEventList />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Fundraisers Tab */}
            {activeTab === "fundraisers" && (
              <motion.div
                key="fundraisers"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Fundraiser Management</h2>
                    <p className="text-gray-600 font-body">Track and manage fundraising campaigns</p>
                  </div>
                  <Link
                    to="/fundraisers/create"
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg font-header hover:bg-pink-700 transition-colors no-underline"
                  >
                    Create Fundraiser
                  </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <AdminFundraiserList />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Payment Transactions</h2>
                  <p className="text-gray-600 font-body">Monitor all payment transactions and revenue</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Recent Payments</h3>
                  </div>
                  <div className="p-6">
                    <AdminPaymentsTable payments={payments} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <motion.div
                key="activity"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Activity Feed</h2>
                  <p className="text-gray-600 font-body">View recent system activity and logs</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="p-6 space-y-2 text-sm">
                    {logs.length === 0 ? (
                      <p className="text-gray-400 font-body">No recent activity.</p>
                    ) : (
                      logs.map((log, index) => (
                        <div key={index} className="border-b pb-2 text-gray-700">
                          <p className="font-body">{log.message}</p>
                          <p className="text-xs text-gray-500 font-body">{new Date(log.created_at).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-title text-gray-900 mb-2">Settings</h2>
                <p className="text-gray-600 font-body">System configuration and preferences</p>
                <p className="text-gray-500 font-body mt-4">Coming soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
