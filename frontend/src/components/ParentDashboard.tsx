import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, CreditCard, Calendar, Bell, User, Settings, 
  DollarSign, CheckCircle, AlertCircle, Clock, Trophy,
  Target, TrendingUp, Users, Mail, Phone, MapPin,
  Download, Receipt, Star, Award, Gift, Ticket,
  BarChart3, MessageSquare, Plus, Eye, MoreHorizontal, ArrowLeft
} from 'lucide-react';
import { useEvents } from './EventsContext';
import { useDonationPages } from './DonationPagesContext';

interface ParentDashboardProps {
  onClose?: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedChild, setSelectedChild] = useState('sarah');

  const { events, getTotalRaised } = useEvents();
  const { donationPages, getTotalRaisedFromPages } = useDonationPages();

  // Sample children data
  const children = [
    { 
      id: 'sarah', 
      name: 'Sarah Martinez', 
      position: 'Forward', 
      avatar: 'SM',
      fundraisingGoal: 1500,
      raised: 1250,
      duesStatus: 'paid',
      lastPayment: '2024-02-01'
    }
  ];

  const currentChild = children.find(child => child.id === selectedChild) || children[0];

  // Payment history
  const paymentHistory = [
    { id: '1', date: '2024-02-01', description: 'Monthly Dues - February', amount: 150, status: 'completed', method: 'Credit Card', receipt: 'REC-001' },
    { id: '2', date: '2024-01-15', description: 'Equipment Fund Donation', amount: 75, status: 'completed', method: 'Bank Transfer', receipt: 'REC-002' },
    { id: '3', date: '2024-01-01', description: 'Monthly Dues - January', amount: 150, status: 'completed', method: 'Credit Card', receipt: 'REC-003' },
    { id: '4', date: '2023-12-15', description: 'Tournament Registration', amount: 50, status: 'completed', method: 'Credit Card', receipt: 'REC-004' }
  ];

  // Upcoming payments
  const upcomingPayments = [
    { id: '1', description: 'Monthly Dues - March', amount: 150, dueDate: '2024-03-01', status: 'pending' },
    { id: '2', description: 'Spring Tournament Fee', amount: 75, dueDate: '2024-03-15', status: 'optional' }
  ];

  // Team events
  const upcomingEvents = events.filter(event => event.status === 'published').slice(0, 3);

  // Donation opportunities
  const activeDonationPages = donationPages.filter(page => page.status === 'published').slice(0, 2);

  // Quick stats
  const totalPaid = paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const totalRaised = getTotalRaised() + getTotalRaisedFromPages();

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Dashboard summary and child progress' },
    { id: 'payments', label: 'Payments', icon: CreditCard, description: 'Manage dues and payment history' },
    { id: 'donations', label: 'Donations', icon: Heart, description: 'Support team fundraising campaigns' },
    { id: 'events', label: 'Events', icon: Calendar, description: 'View team events and activities' },
    { id: 'communication', label: 'Messages', icon: MessageSquare, description: 'Team updates and notifications' },
    { id: 'profile', label: 'Profile', icon: User, description: 'Manage account and child information' }
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
              <h1 className="text-xl font-header text-gray-900">Parent Dashboard</h1>
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
            <h1 className="text-3xl font-title text-gray-900 mb-2">Supporting {currentChild.name}</h1>
            <p className="text-gray-600 font-body">Track progress and manage payments for your athlete</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Child Selector */}
            <div className="relative">
              <select 
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="bg-white border border-gray-200 rounded-lg px-4 py-2 font-body focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>

            <motion.button
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="h-4 w-4" />
              <span>Make Payment</span>
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-pink-500 to-rose-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart className="h-4 w-4" />
              <span>Donate</span>
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

            {/* Child Summary */}
            <div className="mt-8 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200">
              <h4 className="font-header text-gray-900 mb-3">{currentChild.name}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Position</span>
                  <span className="font-header text-purple-900">{currentChild.position}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Fundraising</span>
                  <span className="font-header text-pink-900">${currentChild.raised}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Dues Status</span>
                  <span className="font-header text-green-900 capitalize">{currentChild.duesStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Progress</span>
                  <span className="font-header text-blue-900">{Math.round((currentChild.raised / currentChild.fundraisingGoal) * 100)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-pink-200">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentChild.raised / currentChild.fundraisingGoal) * 100}%` }}
                    transition={{ duration: 2, delay: 0.5 }}
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
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Parent Overview</h2>
                  <p className="text-gray-600 font-body">Track your child's progress and team involvement</p>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Total Contributed', value: `$${totalPaid.toLocaleString()}`, change: 'This season', icon: DollarSign, color: 'green' },
                    { title: 'Child\'s Fundraising', value: `$${currentChild.raised}`, change: `${Math.round((currentChild.raised / currentChild.fundraisingGoal) * 100)}% of goal`, icon: Target, color: 'pink' },
                    { title: 'Team Total Raised', value: `$${totalRaised.toLocaleString()}`, change: 'All campaigns', icon: Trophy, color: 'blue' },
                    { title: 'Dues Status', value: 'Current', change: 'Paid through Feb', icon: CheckCircle, color: 'green' }
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
                      </div>
                      <h3 className="text-2xl font-title text-gray-900 mb-1">{stat.value}</h3>
                      <p className="text-gray-600 font-body text-sm">{stat.title}</p>
                      <p className="text-gray-500 font-body text-xs mt-1">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upcoming Payments */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-header text-gray-900 mb-4">Upcoming Payments</h3>
                    <div className="space-y-4">
                      {upcomingPayments.map((payment) => (
                        <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-header text-gray-900">{payment.description}</h4>
                            <p className="text-sm text-gray-600 font-body">Due: {payment.dueDate}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-header text-gray-900">${payment.amount}</p>
                            <span className={`text-xs px-2 py-1 rounded-full font-body ${
                              payment.status === 'pending' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-lg font-header text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-header text-gray-900">Payment processed</p>
                          <p className="text-sm text-gray-600 font-body">February dues - $150 • 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                        <Heart className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-header text-gray-900">Donation received</p>
                          <p className="text-sm text-gray-600 font-body">Equipment fund - $75 • 1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
                        <Trophy className="h-5 w-5 text-purple-600" />
                        <div>
                          <p className="font-header text-gray-900">Fundraising milestone</p>
                          <p className="text-sm text-gray-600 font-body">{currentChild.name} reached 80% of goal • 1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Payment Management</h2>
                    <p className="text-gray-600 font-body">Manage dues, fees, and payment history</p>
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-header hover:bg-green-700 transition-colors">
                    Make Payment
                  </button>
                </div>

                {/* Payment Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-title text-green-900">${totalPaid.toLocaleString()}</h3>
                    <p className="text-green-700 font-body">Total Paid This Season</p>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-title text-orange-900">${upcomingPayments.reduce((sum, p) => sum + p.amount, 0)}</h3>
                    <p className="text-orange-700 font-body">Upcoming Payments</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-title text-blue-900">Current</h3>
                    <p className="text-blue-700 font-body">Account Status</p>
                  </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Payment History</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Date</th>
                          <th className="text-left py-4 px-6 font-header text-gray-700">Description</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Amount</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Method</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Status</th>
                          <th className="text-center py-4 px-6 font-header text-gray-700">Receipt</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentHistory.map((payment) => (
                          <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <span className="font-body text-gray-900">{payment.date}</span>
                            </td>
                            <td className="py-4 px-6">
                              <span className="font-body text-gray-900">{payment.description}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="font-header text-gray-900">${payment.amount}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="font-body text-gray-600">{payment.method}</span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-header">
                                {payment.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button className="text-blue-600 hover:text-blue-700 font-body text-sm">
                                Download
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
                    <h2 className="text-2xl font-title text-gray-900 mb-2">Support Team Fundraising</h2>
                    <p className="text-gray-600 font-body">Contribute to active donation campaigns</p>
                  </div>
                </div>

                {/* Active Donation Campaigns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {activeDonationPages.map((page) => (
                    <div key={page.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-header text-gray-900">{page.title}</h3>
                        <Heart className="h-5 w-5 text-pink-600" />
                      </div>
                      
                      <p className="text-gray-600 font-body mb-4">{page.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-body text-gray-600">Progress</span>
                          <span className="text-sm font-header text-gray-900">
                            ${page.totalRaised} / ${page.fundraisingGoal.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full"
                            style={{ width: `${Math.min((page.totalRaised / page.fundraisingGoal) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600 font-body">
                          {page.donorCount} donors • {page.selectedPlayers.length} players
                        </div>
                        <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-header hover:bg-pink-700 transition-colors">
                          Donate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Child's Fundraising Progress */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">{currentChild.name}'s Fundraising</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-title text-purple-900 mb-2">${currentChild.raised}</div>
                      <div className="text-sm text-gray-600 font-body">Raised</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-title text-blue-900 mb-2">${currentChild.fundraisingGoal}</div>
                      <div className="text-sm text-gray-600 font-body">Goal</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-title text-green-900 mb-2">{Math.round((currentChild.raised / currentChild.fundraisingGoal) * 100)}%</div>
                      <div className="text-sm text-gray-600 font-body">Complete</div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full"
                        style={{ width: `${(currentChild.raised / currentChild.fundraisingGoal) * 100}%` }}
                      />
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
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Team Events</h2>
                  <p className="text-gray-600 font-body">Stay updated on team activities and events</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Upcoming Events</h3>
                  
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Calendar className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-header text-gray-900">{event.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 font-body">
                              <span>{event.date}</span>
                              <span>{event.location}</span>
                              {event.ticketSales.enabled && (
                                <span className="text-green-600">Tickets available</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {event.ticketSales.enabled && (
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-body hover:bg-blue-700 transition-colors">
                              Buy Tickets
                            </button>
                          )}
                          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Team Communication</h2>
                  <p className="text-gray-600 font-body">Messages and updates from coaches and team</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Recent Messages</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-blue-900">From: Coach Martinez</span>
                        <span className="text-sm text-blue-600 font-body">2 hours ago</span>
                      </div>
                      <p className="text-gray-700 font-body">Great job at practice today! Remember to bring your gear for tomorrow's scrimmage.</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-green-900">From: Team Admin</span>
                        <span className="text-sm text-green-600 font-body">1 day ago</span>
                      </div>
                      <p className="text-gray-700 font-body">Monthly dues reminder: March payments are now due. Please submit by the end of the week.</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-purple-900">From: Fundraising Committee</span>
                        <span className="text-sm text-purple-600 font-body">3 days ago</span>
                      </div>
                      <p className="text-gray-700 font-body">We're 75% to our equipment fund goal! Thank you for your continued support.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-title text-gray-900 mb-2">Profile Management</h2>
                <p className="text-gray-600 font-body">Manage account and child information</p>
                <p className="text-gray-500 font-body mt-4">Coming soon...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;