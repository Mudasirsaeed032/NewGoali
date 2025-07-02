import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Trophy, Target, Users, TrendingUp, Share2, Star, 
  Award, DollarSign, Heart, Calendar, MessageSquare,
  BarChart3, User, Settings, Copy, ExternalLink,
  CheckCircle, AlertCircle, Clock, Gift, Zap,
  Medal, Crown, Flame, ThumbsUp, Eye, MoreHorizontal, ArrowLeft,
  ChevronUp, Sparkles, TrendingDown
} from 'lucide-react';
import { useEvents } from './EventsContext';
import { useDonationPages } from './DonationPagesContext';

interface PlayerDashboardProps {
  onClose?: () => void;
}

const PlayerDashboard: React.FC<PlayerDashboardProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [shareLink, setShareLink] = useState('https://goali.app/donate/sarah-martinez');
  const [linkCopied, setLinkCopied] = useState(false);

  const { events, getTotalRaised } = useEvents();
  const { donationPages, getTotalRaisedFromPages } = useDonationPages();

  // Player data
  const playerData = {
    name: 'Sarah Martinez',
    position: 'Forward',
    avatar: 'SM',
    fundraisingGoal: 1500,
    raised: 1250,
    rank: 3,
    totalDonors: 15,
    shareCount: 45,
    personalBest: 1250,
    streak: 7,
    weeklyGrowth: 15, // percentage growth this week
    monthlyGrowth: 35 // percentage growth this month
  };

  // Enhanced leaderboard data with positive framing
  const fullLeaderboard = [
    { rank: 1, name: 'Alex Rivera', avatar: 'AR', raised: 1450, goal: 1500, progress: 97, trend: '+12%', weeklyGrowth: 8 },
    { rank: 2, name: 'Jordan Smith', avatar: 'JS', raised: 1380, goal: 1400, progress: 99, trend: '+8%', weeklyGrowth: 12 },
    { rank: 3, name: 'Sarah Martinez', avatar: 'SM', raised: 1250, goal: 1500, progress: 83, trend: '+15%', isCurrentPlayer: true, weeklyGrowth: 15 },
    { rank: 4, name: 'Casey Brown', avatar: 'CB', raised: 1100, goal: 1200, progress: 92, trend: '+22%', weeklyGrowth: 22 },
    { rank: 5, name: 'Taylor Davis', avatar: 'TD', raised: 980, goal: 1000, progress: 98, trend: '+5%', weeklyGrowth: 5 },
    { rank: 6, name: 'Morgan Lee', avatar: 'ML', raised: 850, goal: 1000, progress: 85, trend: '+18%', weeklyGrowth: 18 },
    { rank: 7, name: 'Riley Johnson', avatar: 'RJ', raised: 720, goal: 800, progress: 90, trend: '+10%', weeklyGrowth: 10 },
    { rank: 8, name: 'Avery Wilson', avatar: 'AW', raised: 650, goal: 900, progress: 72, trend: '+7%', weeklyGrowth: 7 },
    { rank: 9, name: 'Quinn Parker', avatar: 'QP', raised: 580, goal: 800, progress: 73, trend: '+25%', weeklyGrowth: 25 },
    { rank: 10, name: 'Blake Chen', avatar: 'BC', raised: 520, goal: 700, progress: 74, trend: '+30%', weeklyGrowth: 30 },
    { rank: 11, name: 'Sam Rodriguez', avatar: 'SR', raised: 450, goal: 600, progress: 75, trend: '+20%', weeklyGrowth: 20 },
    { rank: 12, name: 'Drew Kim', avatar: 'DK', raised: 380, goal: 500, progress: 76, trend: '+15%', weeklyGrowth: 15 }
  ];

  // Show top 10 + current player if not in top 10
  const currentPlayerIndex = fullLeaderboard.findIndex(p => p.isCurrentPlayer);
  const displayLeaderboard = currentPlayerIndex < 10 
    ? fullLeaderboard.slice(0, 10)
    : [
        ...fullLeaderboard.slice(0, 10),
        { ...fullLeaderboard[currentPlayerIndex], showSeparator: true }
      ];

  // Recent donations
  const recentDonations = [
    { id: '1', donor: 'Mike Rodriguez', amount: 50, message: 'Go Sarah! Proud to support you!', timestamp: '2 hours ago', isAnonymous: false },
    { id: '2', donor: 'Anonymous', amount: 25, message: '', timestamp: '1 day ago', isAnonymous: true },
    { id: '3', donor: 'Emma Johnson', amount: 75, message: 'Keep up the great work!', timestamp: '2 days ago', isAnonymous: false },
    { id: '4', donor: 'David Chen', amount: 100, message: 'Rooting for the team!', timestamp: '3 days ago', isAnonymous: false }
  ];

  // Achievements with positive framing
  const achievements = [
    { id: '1', title: 'First Steps', description: 'Started your fundraising journey', icon: Target, earned: true, date: '2024-01-15' },
    { id: '2', title: 'Community Builder', description: 'Shared your story with others', icon: Share2, earned: true, date: '2024-01-20' },
    { id: '3', title: 'Rising Star', description: 'Making great progress this month', icon: TrendingUp, earned: true, date: '2024-02-01' },
    { id: '4', title: 'Team Spirit', description: 'Contributing to team success', icon: Users, earned: true, date: '2024-02-05' },
    { id: '5', title: 'Goal Getter', description: 'Reach 90% of your personal goal', icon: Star, earned: false, progress: 83 },
    { id: '6', title: 'Champion', description: 'Exceed your fundraising goal', icon: Crown, earned: false, progress: 83 }
  ];

  // Motivational milestones
  const milestones = [
    { amount: 500, title: 'Great Start!', achieved: true, icon: Sparkles },
    { amount: 1000, title: 'Momentum Building!', achieved: true, icon: TrendingUp },
    { amount: 1250, title: 'You Are Here!', achieved: true, icon: Trophy, current: true },
    { amount: 1500, title: 'Goal Achievement!', achieved: false, icon: Crown },
    { amount: 2000, title: 'Superstar Status!', achieved: false, icon: Star }
  ];

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const navigationTabs = [
    { id: 'overview', label: 'My Progress', icon: BarChart3, description: 'Your personal fundraising journey' },
    { id: 'leaderboard', label: 'Team Champions', icon: Trophy, description: 'Celebrate team achievements together' },
    { id: 'donations', label: 'My Supporters', icon: Heart, description: 'Thank your amazing supporters' },
    { id: 'sharing', label: 'Share & Grow', icon: Share2, description: 'Spread your story and impact' },
    { id: 'achievements', label: 'Milestones', icon: Award, description: 'Celebrate your accomplishments' },
    { id: 'team', label: 'Team Updates', icon: MessageSquare, description: 'Stay connected with your team' }
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
              <h1 className="text-xl font-header text-gray-900">Player Dashboard</h1>
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
            <h1 className="text-3xl font-title text-gray-900 mb-2">{playerData.name} • {playerData.position}</h1>
            <p className="text-gray-600 font-body">Your fundraising journey is making a real difference!</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={copyShareLink}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {linkCopied ? <CheckCircle className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              <span>{linkCopied ? 'Copied!' : 'Share My Story'}</span>
            </motion.button>

            <motion.button
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2 hover:shadow-lg transition-all duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="h-4 w-4" />
              <span>View My Page</span>
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

            {/* Player Stats Summary with Positive Framing */}
            <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-header text-lg">{playerData.avatar}</span>
                </div>
                <div>
                  <h4 className="font-header text-gray-900">{playerData.name}</h4>
                  <p className="text-sm text-gray-600 font-body">{playerData.position}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Raised So Far</span>
                  <span className="font-header text-purple-900">${playerData.raised}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Team Position</span>
                  <span className="font-header text-pink-900">#{playerData.rank}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Supporters</span>
                  <span className="font-header text-blue-900">{playerData.totalDonors}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600">Goal Progress</span>
                  <span className="font-header text-green-900">{Math.round((playerData.raised / playerData.fundraisingGoal) * 100)}%</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-200">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(playerData.raised / playerData.fundraisingGoal) * 100}%` }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-xs text-purple-600 font-body bg-purple-100 px-2 py-1 rounded-full">
                    Growing {playerData.weeklyGrowth}% this week! 🚀
                  </span>
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
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Your Amazing Progress</h2>
                  <p className="text-gray-600 font-body">Every contribution you make helps our team reach new heights!</p>
                </div>

                {/* Key Metrics Grid with Positive Language */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: 'Total Impact', value: `$${playerData.raised}`, change: `$${playerData.fundraisingGoal - playerData.raised} to goal`, icon: DollarSign, color: 'green' },
                    { title: 'Team Position', value: `#${playerData.rank}`, change: 'Climbing strong!', icon: Trophy, color: 'yellow' },
                    { title: 'Amazing Supporters', value: playerData.totalDonors.toString(), change: '+3 this week', icon: Heart, color: 'pink' },
                    { title: 'Story Shares', value: playerData.shareCount.toString(), change: '+12 this week', icon: Share2, color: 'blue' }
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
                      <p className="text-green-600 font-body text-xs mt-1">{stat.change}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Progress Journey */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-6">Your Fundraising Journey</h3>
                  
                  <div className="relative">
                    {/* Progress Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div 
                      className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-green-500 to-blue-500 transition-all duration-1000"
                      style={{ height: `${(milestones.filter(m => m.achieved).length / milestones.length) * 100}%` }}
                    ></div>

                    <div className="space-y-6">
                      {milestones.map((milestone, index) => (
                        <motion.div
                          key={milestone.amount}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`flex items-center space-x-4 relative ${
                            milestone.current ? 'bg-blue-50 p-4 rounded-lg border-2 border-blue-200' : ''
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 ${
                            milestone.achieved 
                              ? 'bg-green-500 text-white' 
                              : milestone.current
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            <milestone.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-header ${
                              milestone.current ? 'text-blue-900' : 'text-gray-900'
                            }`}>
                              ${milestone.amount.toLocaleString()} - {milestone.title}
                            </h4>
                            {milestone.current && (
                              <p className="text-blue-700 font-body text-sm">
                                You're here! Amazing progress - keep going! 🎉
                              </p>
                            )}
                          </div>
                          {milestone.achieved && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Recent Support */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Recent Support</h3>
                  
                  <div className="space-y-4">
                    {recentDonations.slice(0, 4).map((donation) => (
                      <div key={donation.id} className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="font-header text-gray-900">
                            {donation.isAnonymous ? 'A kind supporter' : donation.donor} contributed ${donation.amount}
                          </p>
                          <p className="text-sm text-gray-600 font-body">{donation.timestamp}</p>
                          {donation.message && (
                            <p className="text-sm text-green-700 font-body italic mt-1">"{donation.message}"</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Champions Tab (Positive Leaderboard) */}
            {activeTab === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Team Champions</h2>
                  <p className="text-gray-600 font-body">Celebrating everyone's amazing contributions to our shared success!</p>
                </div>

                {/* Top 3 Celebration */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-6 text-center">This Month's Champions</h3>
                  
                  <div className="flex items-end justify-center space-x-8">
                    {/* 2nd Place */}
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-header text-lg">{displayLeaderboard[1].avatar}</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4 h-24 flex flex-col justify-center">
                        <div className="text-2xl font-title text-gray-700 mb-1">🥈</div>
                        <div className="font-header text-gray-900">{displayLeaderboard[1].name}</div>
                        <div className="text-sm text-gray-600 font-body">${displayLeaderboard[1].raised}</div>
                      </div>
                    </div>

                    {/* 1st Place */}
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-3">
                        <span className="text-white font-header text-xl">{displayLeaderboard[0].avatar}</span>
                      </div>
                      <div className="bg-yellow-100 rounded-lg p-4 h-32 flex flex-col justify-center">
                        <div className="text-3xl font-title text-yellow-700 mb-1">🏆</div>
                        <div className="font-header text-gray-900">{displayLeaderboard[0].name}</div>
                        <div className="text-sm text-gray-600 font-body">${displayLeaderboard[0].raised}</div>
                      </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                        displayLeaderboard[2].isCurrentPlayer 
                          ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                          : 'bg-gradient-to-br from-orange-400 to-orange-500'
                      }`}>
                        <span className="text-white font-header text-lg">{displayLeaderboard[2].avatar}</span>
                      </div>
                      <div className={`rounded-lg p-4 h-24 flex flex-col justify-center ${
                        displayLeaderboard[2].isCurrentPlayer ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        <div className={`text-2xl font-title mb-1 ${
                          displayLeaderboard[2].isCurrentPlayer ? 'text-purple-700' : 'text-orange-700'
                        }`}>🥉</div>
                        <div className="font-header text-gray-900">{displayLeaderboard[2].name}</div>
                        <div className="text-sm text-gray-600 font-body">${displayLeaderboard[2].raised}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Growth Champions */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">This Week's Growth Champions</h3>
                  <p className="text-gray-600 font-body mb-6">Celebrating the teammates making the biggest strides!</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {displayLeaderboard
                      .sort((a, b) => (b.weeklyGrowth || 0) - (a.weeklyGrowth || 0))
                      .slice(0, 3)
                      .map((player, index) => (
                        <div key={player.rank} className={`p-4 rounded-lg border-2 ${
                          player.isCurrentPlayer 
                            ? 'bg-purple-50 border-purple-200' 
                            : 'bg-green-50 border-green-200'
                        }`}>
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              player.isCurrentPlayer 
                                ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                                : 'bg-gradient-to-br from-green-500 to-emerald-600'
                            }`}>
                              <span className="text-white font-header text-sm">{player.avatar}</span>
                            </div>
                            <div>
                              <h4 className="font-header text-gray-900">
                                {player.name} {player.isCurrentPlayer && '(You!)'}
                              </h4>
                              <p className="text-sm text-gray-600 font-body">+{player.weeklyGrowth}% this week</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <span className="text-green-600 font-header text-sm">Rising fast!</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Team Progress */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Team Progress</h3>
                    <p className="text-gray-600 font-body">Everyone's contributions matter - we're stronger together!</p>
                  </div>
                  
                  <div className="space-y-2 p-6">
                    {displayLeaderboard.map((player, index) => (
                      <div key={player.rank}>
                        {player.showSeparator && (
                          <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-4 text-sm text-gray-500 font-body">Your position</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                          </div>
                        )}
                        <div 
                          className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                            player.isCurrentPlayer 
                              ? 'bg-purple-50 border-2 border-purple-200' 
                              : 'bg-gray-50 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-header text-sm ${
                              player.rank === 1 ? 'bg-yellow-500' : 
                              player.rank === 2 ? 'bg-gray-400' : 
                              player.rank === 3 ? 'bg-orange-500' : 
                              'bg-blue-500'
                            }`}>
                              {player.rank}
                            </div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              player.isCurrentPlayer 
                                ? 'bg-gradient-to-br from-purple-500 to-pink-600' 
                                : 'bg-gradient-to-br from-blue-500 to-purple-600'
                            }`}>
                              <span className="text-white font-header text-sm">{player.avatar}</span>
                            </div>
                            <div>
                              <h4 className={`font-header ${player.isCurrentPlayer ? 'text-purple-900' : 'text-gray-900'}`}>
                                {player.name} {player.isCurrentPlayer && '(You!)'}
                              </h4>
                              <p className="text-sm text-gray-600 font-body">${player.raised} raised • {player.progress}% of goal</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <ChevronUp className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-header text-green-600">{player.trend}</span>
                            </div>
                            <div className="text-xs text-gray-500 font-body">Growing strong!</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* My Supporters Tab */}
            {activeTab === 'donations' && (
              <motion.div
                key="donations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">My Amazing Supporters</h2>
                  <p className="text-gray-600 font-body">The wonderful people who believe in you and your team's mission</p>
                </div>

                {/* Support Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Heart className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-title text-green-900">{playerData.totalDonors}</h3>
                    <p className="text-green-700 font-body">Amazing Supporters</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-title text-blue-900">${Math.round(playerData.raised / playerData.totalDonors)}</h3>
                    <p className="text-blue-700 font-body">Average Support</p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Star className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-title text-purple-900">$100</h3>
                    <p className="text-purple-700 font-body">Biggest Support</p>
                  </div>
                </div>

                {/* Recent Support */}
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-header text-gray-900">Recent Support</h3>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    {recentDonations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-header text-gray-900">
                              {donation.isAnonymous ? 'A Kind Supporter' : donation.donor}
                            </h4>
                            <p className="text-sm text-gray-600 font-body">{donation.timestamp}</p>
                            {donation.message && (
                              <p className="text-sm text-gray-700 font-body italic mt-1">"{donation.message}"</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-header text-green-600">${donation.amount}</div>
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-body">
                            Send Thanks
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Share & Grow Tab */}
            {activeTab === 'sharing' && (
              <motion.div
                key="sharing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Share Your Story</h2>
                  <p className="text-gray-600 font-body">Help others discover your mission and grow your impact</p>
                </div>

                {/* Share Link */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Your Personal Story Link</h3>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
                      <span className="font-body text-gray-700">{shareLink}</span>
                    </div>
                    <button
                      onClick={copyShareLink}
                      className={`px-6 py-3 rounded-lg font-header transition-all duration-200 ${
                        linkCopied 
                          ? 'bg-green-600 text-white' 
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {linkCopied ? 'Copied!' : 'Copy Link'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg font-header hover:bg-blue-700 transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span>Share Story</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg font-header hover:bg-green-700 transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      <span>Send Message</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-3 rounded-lg font-header hover:bg-purple-700 transition-colors">
                      <ExternalLink className="h-4 w-4" />
                      <span>View Page</span>
                    </button>
                  </div>
                </div>

                {/* Sharing Impact */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Your Sharing Impact</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-title text-blue-900 mb-2">{playerData.shareCount}</div>
                      <div className="text-gray-600 font-body">Times Shared</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-title text-green-900 mb-2">{Math.round(playerData.totalDonors / playerData.shareCount * 100)}%</div>
                      <div className="text-gray-600 font-body">Connection Rate</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Milestones Tab */}
            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Your Milestones</h2>
                  <p className="text-gray-600 font-body">Celebrating every step of your fundraising journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div 
                        key={achievement.id} 
                        className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-200 ${
                          achievement.earned 
                            ? 'border-green-200 hover:shadow-xl' 
                            : 'border-gray-200 opacity-75'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            achievement.earned 
                              ? 'bg-green-100' 
                              : 'bg-gray-100'
                          }`}>
                            <IconComponent className={`h-6 w-6 ${
                              achievement.earned ? 'text-green-600' : 'text-gray-400'
                            }`} />
                          </div>
                          {achievement.earned && (
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          )}
                        </div>
                        
                        <h3 className={`text-lg font-header mb-2 ${
                          achievement.earned ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {achievement.title}
                        </h3>
                        
                        <p className={`text-sm font-body mb-3 ${
                          achievement.earned ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>

                        {achievement.earned ? (
                          <div className="text-xs text-green-600 font-body">
                            Achieved on {achievement.date} 🎉
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="text-xs text-blue-600 font-body">
                              You're {achievement.progress}% there - keep going!
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${achievement.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Team Updates Tab */}
            {activeTab === 'team' && (
              <motion.div
                key="team"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-title text-gray-900 mb-2">Team Updates</h2>
                  <p className="text-gray-600 font-body">Stay connected with your team and coaches</p>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Recent Messages</h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-blue-900">From: Coach Martinez</span>
                        <span className="text-sm text-blue-600 font-body">2 hours ago</span>
                      </div>
                      <p className="text-gray-700 font-body">Sarah, your fundraising efforts are inspiring the whole team! Keep up the amazing work!</p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-green-900">From: Team Admin</span>
                        <span className="text-sm text-green-600 font-body">1 day ago</span>
                      </div>
                      <p className="text-gray-700 font-body">Congratulations on your fantastic progress! You're making a real difference for our team!</p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-header text-purple-900">Team Celebration</span>
                        <span className="text-sm text-purple-600 font-body">3 days ago</span>
                      </div>
                      <p className="text-gray-700 font-body">We're 75% to our team goal! Every contribution counts and we're so grateful for your efforts!</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;