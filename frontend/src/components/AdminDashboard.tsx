import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, Users, DollarSign, Calendar, Settings, Plus, Send, 
  TrendingUp, Target, Trophy, CheckCircle, AlertCircle, Clock,
  CreditCard, Heart, Star, Award, Bell, Filter, Search, 
  MoreHorizontal, X, Edit, Eye, Trash2, UserCheck, UserX,
  Mail, Phone, MapPin, Download, Upload, RefreshCw, ArrowLeft, UserPlus,
  BookOpen
} from 'lucide-react';
import EventCreationModal from './EventCreationModal';
import DonationPageModal from './DonationPageModal';
import InviteManagement from './InviteManagement';
import FundraisingPlaybook from './FundraisingPlaybook';
import { useEvents } from './EventsContext';
import { useDonationPages } from './DonationPagesContext';

interface AdminDashboardProps {
  onClose?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDonationPageModal, setShowDonationPageModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [duesFilter, setDuesFilter] = useState('all');

  const { 
    events, 
    addEvent, 
    getEventsByStatus, 
    getTotalRaised, 
    getActiveEventsCount,
    approveEvent,
    rejectEvent
  } = useEvents();

  const {
    donationPages,
    addDonationPage,
    getDonationPagesByStatus,
    getTotalRaisedFromPages,
    getActivePagesCount,
    approveDonationPage,
    rejectDonationPage
  } = useDonationPages();

  // Sample dues data
  const [duesData, setDuesData] = useState([
    { id: '1', name: 'Sarah Martinez', position: 'Forward', amount: 150, status: 'paid', datePaid: '2024-02-01', method: 'Credit Card', parentEmail: 'parent.martinez@email.com', parentPhone: '(555) 123-4567', avatar: 'SM' },
    { id: '2', name: 'Alex Rivera', position: 'Midfielder', amount: 150, status: 'paid', datePaid: '2024-02-03', method: 'Bank Transfer', parentEmail: 'rivera.family@email.com', parentPhone: '(555) 234-5678', avatar: 'AR' },
    { id: '3', name: 'Jordan Smith', position: 'Defender', amount: 150, status: 'overdue', datePaid: null, method: null, parentEmail: 'smith.parents@email.com', parentPhone: '(555) 345-6789', avatar: 'JS', daysOverdue: 5 },
    { id: '4', name: 'Casey Brown', position: 'Goalkeeper', amount: 150, status: 'paid', datePaid: '2024-01-28', method: 'Cash', parentEmail: 'brown.family@email.com', parentPhone: '(555) 456-7890', avatar: 'CB' },
    { id: '5', name: 'Taylor Davis', position: 'Forward', amount: 150, status: 'pending', datePaid: null, method: null, parentEmail: 'davis.household@email.com', parentPhone: '(555) 567-8901', avatar: 'TD' },
    { id: '6', name: 'Morgan Lee', position: 'Midfielder', amount: 150, status: 'overdue', datePaid: null, method: null, parentEmail: 'lee.parents@email.com', parentPhone: '(555) 678-9012', avatar: 'ML', daysOverdue: 12 },
    { id: '7', name: 'Riley Johnson', position: 'Defender', amount: 150, status: 'paid', datePaid: '2024-02-05', method: 'Credit Card', parentEmail: 'johnson.family@email.com', parentPhone: '(555) 789-0123', avatar: 'RJ' },
    { id: '8', name: 'Avery Wilson', position: 'Forward', amount: 150, status: 'pending', datePaid: null, method: null, parentEmail: 'wilson.parents@email.com', parentPhone: '(555) 890-1234', avatar: 'AW' }
  ]);

  // Calculate real-time stats
  const totalRaised = getTotalRaised() + getTotalRaisedFromPages();
  const activeEvents = getActiveEventsCount();
  const activePages = getActivePagesCount();
  const pendingEvents = getEventsByStatus('pending_approval');
  const pendingPages = getDonationPagesByStatus('pending_approval');

  // Dues calculations
  const paidDues = duesData.filter(d => d.status === 'paid');
  const overdueDues = duesData.filter(d => d.status === 'overdue');
  const pendingDues = duesData.filter(d => d.status === 'pending');
  const totalDuesCollected = paidDues.reduce((sum, d) => sum + d.amount, 0);
  const totalDuesOutstanding = (overdueDues.length + pendingDues.length) * 150;
  const collectionRate = Math.round((paidDues.length / duesData.length) * 100);

  const filteredDuesData = duesFilter === 'all' ? duesData : duesData.filter(d => d.status === duesFilter);

  const markDuesPaid = (playerId: string) => {
    setDuesData(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, status: 'paid', datePaid: new Date().toISOString().split('T')[0], method: 'Manual Entry' }
        : player
    ));
  };

  const handleEventCreated = (newEvent: any) => {
    addEvent(newEvent);
  };

  const handleDonationPageCreated = (newDonationPage: any) => {
    addDonationPage(newDonationPage);
  };

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Dashboard summary and key metrics' },
    { id: 'events', label: 'Events', icon: Calendar, description: 'Manage fundraising events and activities' },
    { id: 'donations', label: 'Donations', icon: Heart, description: 'Track donation campaigns and leaderboards' },
    { id: 'dues', label: 'Dues Tracker', icon: CreditCard, description: 'Monitor monthly dues payments' },
    { id: 'users', label: 'User Management', icon: Users, description: 'Manage team members and permissions' },
    { id: 'playbook', label: 'Fundraising Playbook', icon: BookOpen, description: 'Interactive guide to successful fundraising' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'Detailed reports and insights' },
    { id: 'settings', label: 'Settings', icon: Settings, description: 'System configuration and preferences' }
  ];

  const currentTab = navigationTabs.find(tab => tab.id === activeTab);

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
              onClick={() => navigate('/')}
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
            <h1 className="text-3xl font-title text-gray-900 mb-2">Complete Management Portal</h1>
            <p className="text-gray-600 font-body">Manage all aspects of your organization</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-body focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="season">This Season</option>
              </select>
            </div>

            <motion.button
              onClick={() => setShowInviteModal(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="h-4 w-4" />
              <span>Invite Members</span>
            </motion.button>

            <motion.button
              onClick={() => setShowEventModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </motion.button>

            <motion.button
              onClick={() => setShowDonationPageModal(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="h-4 w-4" />
              <span>Create Donation Page</span>
            </motion.button>
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
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                        : 'hover:bg-gray-50 border-2 border-transparent text-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className={`h-5 w-5 ${
                        activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <span className="font-header">{tab.label}</span>
                    </div>
                    <p className={`text-sm font-body ${
                      activeTab === tab.id ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Stats Summary */}
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
              <h4 className="font-header text-gray-900 mb-3">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Total Raised</span>
                  <span className="font-header text-blue-900">${totalRaised.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Active Campaigns</span>
                  <span className="font-header text-purple-900">{activeEvents + activePages}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Dues Collection</span>
                  <span className="font-header text-green-900">{collectionRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Pending Approvals</span>
                  <span className="font-header text-orange-900">{pendingEvents.length + pendingPages.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
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

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Total Revenue', value: `$${(totalRaised + totalDuesCollected).toLocaleString()}`, change: '+12%', icon: DollarSign, color: 'green' },
                    { title: 'Active Campaigns', value: (activeEvents + activePages).toString(), change: '+8%', icon: Target, color: 'blue' },
                    { title: 'Team Members', value: '24', change: '+2', icon: Users, color: 'purple' },
                    { title: 'Collection Rate', value: `${collectionRate}%`, change: '+5%', icon: TrendingUp, color: 'orange' }
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
                        <span className={`text-sm font-header text-${stat.color}-600 bg-${stat.color}-50 px-2 py-1 rounded-full`}>
                          {stat.change}
                        </span>
                      </div>
                      <h3 className="text-2xl font-title text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-gray-600 font-body">{stat.title}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-header text-gray-900">New donation received</p>
                        <p className="text-sm text-gray-600 font-body">$250 from Sarah Martinez • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-header text-gray-900">Event approved</p>
                        <p className="text-sm text-gray-600 font-body">Spring Training Camp • 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-header text-gray-900">Pending approval</p>
                        <p className="text-sm text-gray-600 font-body">Equipment Fundraiser • 6 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Events Tab */}
            {activeTab === 'events' && (
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
                  <motion.button
                    onClick={() => setShowEventModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-header hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create Event
                  </motion.button>
                </div>

                {/* Pending Approvals */}
                {pendingEvents.length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                    <h3 className="text-lg font-header text-orange-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Pending Approvals ({pendingEvents.length})
                    </h3>
                    <div className="space-y-4">
                      {pendingEvents.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div>
                            <h4 className="font-header text-gray-900">{event.title}</h4>
                            <p className="text-sm text-gray-600 font-body">{event.date} • {event.location}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => approveEvent(event.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg font-body hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectEvent(event.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg font-body hover:bg-red-700 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Published Events */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Published Events</h3>
                  <div className="space-y-4">
                    {getEventsByStatus('published').map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-header text-gray-900">{event.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                            <span>{event.date}</span>
                            <span>{event.location}</span>
                            <span className="text-green-600">${event.totalRaised} raised</span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <motion.div
                key="donations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Donation Management</h2>
                    <p className="text-gray-600 font-body">Track donation campaigns and player leaderboards</p>
                  </div>
                  <motion.button
                    onClick={() => setShowDonationPageModal(true)}
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg font-header hover:bg-pink-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create Donation Page
                  </motion.button>
                </div>

                {/* Pending Donation Pages */}
                {getDonationPagesByStatus('pending_approval').length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                    <h3 className="text-lg font-header text-orange-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Pending Donation Pages ({getDonationPagesByStatus('pending_approval').length})
                    </h3>
                    <div className="space-y-4">
                      {getDonationPagesByStatus('pending_approval').map((page) => (
                        <div key={page.id} className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div>
                            <h4 className="font-header text-gray-900">{page.title}</h4>
                            <p className="text-sm text-gray-600 font-body">Goal: ${page.fundraisingGoal.toLocaleString()} • {page.selectedPlayers.length} players</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => approveDonationPage(page.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg font-body hover:bg-green-700 transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectDonationPage(page.id)}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg font-body hover:bg-red-700 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Published Donation Pages */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Active Donation Campaigns</h3>
                  <div className="space-y-4">
                    {getDonationPagesByStatus('published').map((page) => (
                      <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-header text-gray-900">{page.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                            <span>Goal: ${page.fundraisingGoal.toLocaleString()}</span>
                            <span>{page.selectedPlayers.length} players</span>
                            <span className="text-green-600">${page.totalRaised} raised</span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Dues Tracker Tab */}
            {activeTab === 'dues' && (
              <motion.div
                key="dues"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Dues Tracker</h2>
                    <p className="text-gray-600 font-body">Monitor monthly dues payments and collection status</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select
                      value={duesFilter}
                      onChange={(e) => setDuesFilter(e.target.value)}
                      className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-body focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Players</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>

                {/* Dues Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <span className="text-sm font-header text-green-600">+{paidDues.length}</span>
                    </div>
                    <h3 className="text-2xl font-title text-green-900">${totalDuesCollected.toLocaleString()}</h3>
                    <p className="text-green-700 font-body">Collected ({paidDues.length} players)</p>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <span className="text-sm font-header text-red-600">{overdueDues.length + pendingDues.length}</span>
                    </div>
                    <h3 className="text-2xl font-title text-red-900">${totalDuesOutstanding.toLocaleString()}</h3>
                    <p className="text-red-700 font-body">Outstanding</p>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Clock className="h-8 w-8 text-orange-600" />
                      <span className="text-sm font-header text-orange-600">{overdueDues.length}</span>
                    </div>
                    <h3 className="text-2xl font-title text-orange-900">{overdueDues.length}</h3>
                    <p className="text-orange-700 font-body">Overdue</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp className="h-8 w-8 text-blue-600" />
                      <span className="text-sm font-header text-blue-600">+5%</span>
                    </div>
                    <h3 className="text-2xl font-title text-blue-900">{collectionRate}%</h3>
                    <p className="text-blue-700 font-body">Collection Rate</p>
                  </div>
                </div>

                {/* Dues Table */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Player Dues Status</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Player</th>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Position</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Amount</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Status</th>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Payment Info</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDuesData.map((player) => (
                          <tr key={player.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-header text-sm">{player.avatar}</span>
                                </div>
                                <div>
                                  <p className="font-header text-gray-900">{player.name}</p>
                                  <p className="text-sm text-gray-600 font-body">{player.parentEmail}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-body text-gray-700">{player.position}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="font-header text-gray-900">${player.amount}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              {player.status === 'paid' && (
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-header flex items-center justify-center space-x-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>Paid</span>
                                </span>
                              )}
                              {player.status === 'pending' && (
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-header flex items-center justify-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Pending</span>
                                </span>
                              )}
                              {player.status === 'overdue' && (
                                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-header flex items-center justify-center space-x-1">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Overdue ({player.daysOverdue}d)</span>
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              {player.datePaid ? (
                                <div>
                                  <p className="font-body text-gray-900">{player.datePaid}</p>
                                  <p className="text-sm text-gray-600 font-body">{player.method}</p>
                                </div>
                              ) : (
                                <span className="text-gray-400 font-body">Not paid</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center space-x-2">
                                {player.status !== 'paid' && (
                                  <button
                                    onClick={() => markDuesPaid(player.id)}
                                    className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-body hover:bg-green-700 transition-colors"
                                  >
                                    Mark Paid
                                  </button>
                                )}
                                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                  <MoreHorizontal className="h-4 w-4 text-gray-600" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Fundraising Playbook Tab */}
            {activeTab === 'playbook' && (
              <motion.div
                key="playbook"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FundraisingPlaybook />
              </motion.div>
            )}

            {/* Placeholder tabs for other sections */}
            {['users', 'analytics', 'settings'].includes(activeTab) && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <currentTab.icon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-title text-gray-900 mb-2">{currentTab?.label}</h2>
                <p className="text-gray-600 font-body">{currentTab?.description}</p>
                <p className="text-gray-500 font-body mt-4">Coming soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <EventCreationModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        userRole="admin"
        onEventCreated={handleEventCreated}
      />

      <DonationPageModal
        isOpen={showDonationPageModal}
        onClose={() => setShowDonationPageModal(false)}
        userRole="admin"
        onDonationPageCreated={handleDonationPageCreated}
      />

      <InviteManagement
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        userRole="admin"
      />
    </div>
  );
};

export default AdminDashboard;