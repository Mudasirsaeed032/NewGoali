import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Users, Target, TrendingUp, Calendar, Plus, Send, 
  MoreHorizontal, Bell, Edit, Star, Award, DollarSign, 
  MapPin, Ticket, Clock, CheckCircle, AlertCircle, X,
  MessageSquare, Filter, Search, ChevronDown, ChevronRight,
  Heart, Share2, BarChart3, Settings, CreditCard, ArrowLeft, UserPlus,
  BookOpen
} from 'lucide-react';
import EventCreationModal from './EventCreationModal';
import DonationPageModal from './DonationPageModal';
import InviteManagement from './InviteManagement';
import FundraisingPlaybook from './FundraisingPlaybook';
import { useEvents } from './EventsContext';
import { useDonationPages } from './DonationPagesContext';

interface CoachDashboardProps {
  onClose?: () => void;
}

const CoachDashboard: React.FC<CoachDashboardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDonationPageModal, setShowDonationPageModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [messageRecipient, setMessageRecipient] = useState('all');
  const [messageContent, setMessageContent] = useState('');
  const [isSubmittingMessage, setIsSubmittingMessage] = useState(false);

  const { 
    events, 
    addEvent, 
    getEventsByStatus, 
    getEventsByCreator, 
    getTotalRaised, 
    getActiveEventsCount 
  } = useEvents();

  const {
    donationPages,
    addDonationPage,
    getDonationPagesByStatus,
    getDonationPagesByCreator,
    getTotalRaisedFromPages,
    getActivePagesCount
  } = useDonationPages();

  // Real-time team stats from events and donation pages
  const [teamStats, setTeamStats] = useState({
    totalRaised: 0,
    goalProgress: 0,
    activePlayers: 0,
    duesPaid: 0
  });

  useEffect(() => {
    // Calculate real stats from events and donation pages
    const totalRaised = getTotalRaised() + getTotalRaisedFromPages();
    const goalProgress = Math.round((totalRaised / 40000) * 100); // Assuming $40k goal
    
    setTeamStats({
      totalRaised,
      goalProgress: Math.min(goalProgress, 100),
      activePlayers: 24,
      duesPaid: 89
    });
  }, [events, donationPages, getTotalRaised, getTotalRaisedFromPages]);

  const topPlayers = [
    { name: 'Sarah Martinez', raised: 1250, goal: 1500, progress: 83, avatar: 'SM', trend: '+15%' },
    { name: 'Alex Rivera', raised: 1100, goal: 1500, progress: 73, avatar: 'AR', trend: '+12%' },
    { name: 'Jordan Smith', raised: 980, goal: 1200, progress: 82, avatar: 'JS', trend: '+8%' },
    { name: 'Casey Brown', raised: 850, goal: 1000, progress: 85, avatar: 'CB', trend: '+22%' },
    { name: 'Taylor Davis', raised: 720, goal: 1000, progress: 72, avatar: 'TD', trend: '+5%' }
  ];

  const rosterData = [
    { name: 'Sarah Martinez', duesPaid: true, fundraisingProgress: 83, position: 'Forward', avatar: 'SM' },
    { name: 'Alex Rivera', duesPaid: true, fundraisingProgress: 73, position: 'Midfielder', avatar: 'AR' },
    { name: 'Jordan Smith', duesPaid: false, fundraisingProgress: 82, position: 'Defender', avatar: 'JS' },
    { name: 'Casey Brown', duesPaid: true, fundraisingProgress: 85, position: 'Goalkeeper', avatar: 'CB' },
    { name: 'Taylor Davis', duesPaid: true, fundraisingProgress: 72, position: 'Forward', avatar: 'TD' },
    { name: 'Morgan Lee', duesPaid: false, fundraisingProgress: 45, position: 'Midfielder', avatar: 'ML' },
    { name: 'Riley Johnson', duesPaid: true, fundraisingProgress: 91, position: 'Defender', avatar: 'RJ' },
    { name: 'Avery Wilson', duesPaid: true, fundraisingProgress: 67, position: 'Forward', avatar: 'AW' }
  ];

  const upcomingPractices = [
    { date: '2024-02-15', time: '16:00', type: 'Regular Practice', location: 'Field A' },
    { date: '2024-02-17', time: '10:00', type: 'Scrimmage', location: 'Field B' },
    { date: '2024-02-20', time: '16:00', type: 'Conditioning', location: 'Gym' },
    { date: '2024-02-22', time: '16:00', type: 'Team Meeting', location: 'Conference Room' }
  ];

  const handleEventCreated = (newEvent: any) => {
    addEvent(newEvent);
  };

  const handleDonationPageCreated = (newDonationPage: any) => {
    addDonationPage(newDonationPage);
  };

  const handleSendMessage = async () => {
    setIsSubmittingMessage(true);
    
    // Simulate sending message
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmittingMessage(false);
    setShowMessageModal(false);
    setMessageContent('');
    setMessageRecipient('all');
  };

  const coachEvents = getEventsByCreator('coach');
  const publishedEvents = getEventsByStatus('published');
  const pendingEvents = getEventsByStatus('pending_approval');
  const coachDonationPages = getDonationPagesByCreator('coach');
  const publishedDonationPages = getDonationPagesByStatus('published');
  const pendingDonationPages = getDonationPagesByStatus('pending_approval');
  const activeEventsCount = getActiveEventsCount();
  const activePagesCount = getActivePagesCount();

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Team summary and key metrics' },
    { id: 'events', label: 'Events', icon: Calendar, description: 'Manage team events and activities' },
    { id: 'donations', label: 'Donations', icon: Heart, description: 'Track donation campaigns and leaderboards' },
    { id: 'roster', label: 'Team Roster', icon: Users, description: 'Manage players and track progress' },
    { id: 'practices', label: 'Practices', icon: Trophy, description: 'Schedule and manage team practices' },
    { id: 'playbook', label: 'Fundraising Playbook', icon: BookOpen, description: 'Interactive guide to successful fundraising' },
    { id: 'communication', label: 'Communication', icon: MessageSquare, description: 'Send messages to team members' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, description: 'Detailed team performance reports' }
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
              <h1 className="text-xl font-header text-gray-900">Coach Dashboard</h1>
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
            <h1 className="text-3xl font-title text-gray-900 mb-2">Team Management Portal</h1>
            <p className="text-gray-600 font-body">Season 2024 • Manage your team's success</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Timeframe Selector */}
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

            {/* Invite Members Button */}
            <motion.button
              onClick={() => setShowInviteModal(true)}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <UserPlus className="h-4 w-4" />
              <span>Invite Members</span>
            </motion.button>

            {/* Add Event Button */}
            <motion.button
              onClick={() => setShowEventModal(true)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4" />
              <span>Add Event</span>
            </motion.button>

            {/* Create Donation Page Button */}
            <motion.button
              onClick={() => setShowDonationPageModal(true)}
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="h-4 w-4" />
              <span>Create Donation Page</span>
            </motion.button>

            {/* Send Message Button */}
            <motion.button
              onClick={() => setShowMessageModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:bg-blue-700 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
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
              <h4 className="font-header text-gray-900 mb-3">Team Overview</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Total Raised</span>
                  <span className="font-header text-blue-900">${teamStats.totalRaised.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Goal Progress</span>
                  <span className="font-header text-purple-900">{teamStats.goalProgress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Active Players</span>
                  <span className="font-header text-green-900">{teamStats.activePlayers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Dues Paid</span>
                  <span className="font-header text-orange-900">{teamStats.duesPaid}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-header text-gray-900">Season Goal</span>
                  <span className="text-lg font-title text-blue-600">$40,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${teamStats.goalProgress}%` }}
                    transition={{ duration: 2, delay: 0.8 }}
                  />
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
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Team Overview</h2>
                  <p className="text-gray-600 font-body">Complete summary of your team's performance and progress</p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Team Total', value: `$${teamStats.totalRaised.toLocaleString()}`, change: '+12%', icon: DollarSign, color: 'green' },
                    { title: 'Active Campaigns', value: (activeEventsCount + activePagesCount).toString(), change: '+8%', icon: Target, color: 'blue' },
                    { title: 'Avg. per Player', value: '$1,024', change: '+8%', icon: Users, color: 'purple' },
                    { title: 'Goal Progress', value: `${teamStats.goalProgress}%`, change: '+5%', icon: TrendingUp, color: 'orange' }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.title}
                      initial={{ opacity: 0, y: 20, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.1, type: "spring" }}
                      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
                      whileHover={{ y: -5 }}
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
                      <DollarSign className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-header text-gray-900">New donation received</p>
                        <p className="text-sm text-gray-600 font-body">$250 from Sarah M. • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                      <Trophy className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-header text-gray-900">Goal reached!</p>
                        <p className="text-sm text-gray-600 font-body">Equipment fund milestone • 4 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <p className="font-header text-gray-900">Event pending approval</p>
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
                    <p className="text-gray-600 font-body">Create and manage team events and activities</p>
                  </div>
                  <motion.button
                    onClick={() => setShowEventModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-header hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create Event
                  </motion.button>
                </div>

                {/* Pending Events Section */}
                {pendingEvents.filter(e => e.createdBy === 'coach').length > 0 && (
                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                    <h3 className="text-lg font-header text-orange-900 mb-4 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" />
                      Pending Approval ({pendingEvents.filter(e => e.createdBy === 'coach').length})
                    </h3>
                    
                    <div className="space-y-4">
                      {pendingEvents.filter(e => e.createdBy === 'coach').map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 bg-white rounded-lg">
                          <div>
                            <h4 className="font-header text-gray-900">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                              <span>{event.date}</span>
                              <span>{event.location}</span>
                              <span className="text-orange-600">Awaiting admin approval</span>
                            </div>
                          </div>
                          <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                            <MoreHorizontal className="h-4 w-4 text-orange-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Published Events */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                    Published Events ({publishedEvents.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {publishedEvents.slice(0, 5).map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                        <div className="flex items-center space-x-3">
                          <Calendar className="h-4 w-4 text-green-600" />
                          <div>
                            <h4 className="font-header text-gray-900">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                              <span>{event.date}</span>
                              <span>{event.location}</span>
                              <span className="flex items-center space-x-1 text-green-600">
                                <DollarSign className="h-3 w-3" />
                                <span>${event.totalRaised}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg transition-all">
                          <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    ))}

                    {(publishedEvents.length === 0 && pendingEvents.filter(e => e.createdBy === 'coach').length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="font-body">No events scheduled. Create your first event!</p>
                      </div>
                    )}
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
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Donations & Leaderboard</h2>
                    <p className="text-gray-600 font-body">Track donation campaigns and player fundraising performance</p>
                  </div>
                  <motion.button
                    onClick={() => setShowDonationPageModal(true)}
                    className="bg-pink-600 text-white px-6 py-2 rounded-lg font-header hover:bg-pink-700 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Create Donation Page
                  </motion.button>
                </div>

                {/* My Donation Campaigns */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">My Donation Campaigns</h3>
                  
                  {/* Pending Donation Pages */}
                  {pendingDonationPages.filter(p => p.createdBy === 'coach').length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-header text-orange-600 mb-3 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Pending Approval ({pendingDonationPages.filter(p => p.createdBy === 'coach').length})
                      </h4>
                      
                      <div className="space-y-3">
                        {pendingDonationPages.filter(p => p.createdBy === 'coach').map((page) => (
                          <div key={page.id} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Heart className="h-4 w-4 text-orange-600" />
                              <div>
                                <h4 className="font-header text-gray-900">{page.title}</h4>
                                <div className="flex items-center space-x-3 text-sm text-gray-600 font-body">
                                  <span>Goal: ${page.fundraisingGoal.toLocaleString()}</span>
                                  <span>{page.selectedPlayers.length} players</span>
                                </div>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                              <MoreHorizontal className="h-4 w-4 text-orange-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Published Donation Pages */}
                  {publishedDonationPages.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-header text-green-600 mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Published ({publishedDonationPages.length})
                      </h4>
                      
                      <div className="space-y-3">
                        {publishedDonationPages.slice(0, 3).map((page) => (
                          <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                            <div className="flex items-center space-x-3">
                              <Heart className="h-4 w-4 text-pink-600" />
                              <div>
                                <h4 className="font-header text-gray-900">{page.title}</h4>
                                <div className="flex items-center space-x-3 text-sm text-gray-600 font-body">
                                  <span>Goal: ${page.fundraisingGoal.toLocaleString()}</span>
                                  <span>{page.selectedPlayers.length} players</span>
                                  <span className="flex items-center space-x-1 text-green-600">
                                    <DollarSign className="h-3 w-3" />
                                    <span>${page.totalRaised}</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <button className="opacity-0 group-hover:opacity-100 p-2 hover:bg-white rounded-lg transition-all">
                              <MoreHorizontal className="h-4 w-4 text-gray-600" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(publishedDonationPages.length === 0 && pendingDonationPages.filter(p => p.createdBy === 'coach').length === 0) && (
                    <div className="text-center py-8 text-gray-500">
                      <Heart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="font-body">No donation campaigns yet. Create your first one!</p>
                    </div>
                  )}
                </div>

                {/* Player Leaderboard */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Player Leaderboard</h3>
                  
                  <div className="space-y-4">
                    {topPlayers.slice(0, 8).map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-header text-sm ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-header text-sm">{player.avatar}</span>
                          </div>
                          <div>
                            <h4 className="font-header text-gray-900">{player.name}</h4>
                            <p className="text-sm text-gray-600 font-body">${player.raised} / ${player.goal}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-header text-green-600">{player.trend}</span>
                          <div className="text-sm text-gray-500 font-body">{player.progress}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Roster Tab */}
            {activeTab === 'roster' && (
              <motion.div
                key="roster"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Team Roster</h2>
                    <p className="text-gray-600 font-body">Manage players and track their progress</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Filter className="h-4 w-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Search className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Player</th>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Position</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Dues</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Fundraising</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rosterData.map((player, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-header text-sm">{player.avatar}</span>
                                </div>
                                <span className="font-body text-gray-900">{player.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-body text-gray-600">{player.position}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              {player.duesPaid ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-red-500 mx-auto" />
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center space-x-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                                    style={{ width: `${player.fundraisingProgress}%` }}
                                  />
                                </div>
                                <span className="text-sm font-body text-gray-600 w-10">{player.fundraisingProgress}%</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <MoreHorizontal className="h-4 w-4 text-gray-600" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Practices Tab */}
            {activeTab === 'practices' && (
              <motion.div
                key="practices"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Practice Schedule</h2>
                    <p className="text-gray-600 font-body">Manage team practices and training sessions</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-header hover:bg-blue-700 transition-colors">
                    Schedule Practice
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Upcoming Practices</h3>
                  
                  <div className="space-y-4">
                    {upcomingPractices.map((practice, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-header text-gray-900">{practice.type}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                              <span className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{practice.date}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{practice.time}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <MapPin className="h-3 w-3" />
                                <span>{practice.location}</span>
                              </span>
                            </div>
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

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <motion.div
                key="communication"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Team Communication</h2>
                    <p className="text-gray-600 font-body">Send messages and updates to team members</p>
                  </div>
                  <button
                    onClick={() => setShowMessageModal(true)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-header hover:bg-blue-700 transition-colors"
                  >
                    Send Message
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Recent Messages</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-blue-900">To: All Team Members</span>
                        <span className="text-sm text-blue-600 font-body">2 hours ago</span>
                      </div>
                      <p className="text-gray-700 font-body">Great job at practice today! Remember to bring your gear for tomorrow's scrimmage.</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-green-900">To: Parents Only</span>
                        <span className="text-sm text-green-600 font-body">1 day ago</span>
                      </div>
                      <p className="text-gray-700 font-body">Monthly dues reminder: Please submit February payments by the end of the week.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-title text-gray-900 mb-2">Analytics</h2>
                <p className="text-gray-600 font-body">Detailed team performance reports</p>
                <p className="text-gray-500 font-body mt-4">Coming soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Event Creation Modal */}
      <EventCreationModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        userRole="coach"
        onEventCreated={handleEventCreated}
      />

      {/* Donation Page Creation Modal */}
      <DonationPageModal
        isOpen={showDonationPageModal}
        onClose={() => setShowDonationPageModal(false)}
        userRole="coach"
        onDonationPageCreated={handleDonationPageCreated}
      />

      {/* Invite Management Modal */}
      <InviteManagement
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        userRole="coach"
      />

      {/* Send Message Modal */}
      <AnimatePresence>
        {showMessageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowMessageModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-header text-gray-900">Send Message</h3>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-header text-gray-700 mb-2">Send to</label>
                  <select
                    value={messageRecipient}
                    onChange={(e) => setMessageRecipient(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Team Members</option>
                    <option value="players">Players Only</option>
                    <option value="parents">Parents Only</option>
                    <option value="individual">Individual Player</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-header text-gray-700 mb-2">Message</label>
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Enter your message..."
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 font-body focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!messageContent.trim() || isSubmittingMessage}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-header hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmittingMessage ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setShowMessageModal(false)}
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg font-header hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoachDashboard;