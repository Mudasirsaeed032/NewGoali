import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ChevronDown, ChevronRight, Search, Filter,
  HelpCircle, BookOpen, Users, FileText, Headphones,
  Trophy, DollarSign, TrendingUp, Calendar, Star,
  CheckCircle, ArrowRight, ExternalLink, Clock,
  Target, Award, Heart, Zap, Shield, BarChart3
} from 'lucide-react';
import FundraisingPlaybook from './FundraisingPlaybook';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('faq');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>('cost');
  const [searchQuery, setSearchQuery] = useState('');

  const navigationSections = [
    { id: 'faq', label: 'FAQ', icon: HelpCircle, description: 'Get answers to common questions' },
    { id: 'blog', label: 'Blog', icon: BookOpen, description: 'Latest fundraising insights and tips' },
    { id: 'case-studies', label: 'Case Studies', icon: Users, description: 'Real success stories from teams' },
    { id: 'playbook', label: 'Fundraising Playbook', icon: FileText, description: 'Complete guide to successful fundraising' },
    { id: 'support', label: 'Support', icon: Headphones, description: 'Get help when you need it' }
  ];

  const faqData = [
    {
      id: 'cost',
      question: 'What does it cost to use Goali?',
      answer: 'Goali is completely free to get started. We only charge a small platform fee on successful transactions—meaning, you only pay when you raise money. There are no monthly fees unless your team chooses to upgrade to a premium plan for more advanced features like branded pages or school-wide reporting. Stripe\'s secure payment processing fee (2.9% + 30¢) also applies to each transaction.'
    },
    {
      id: 'funds',
      question: 'How do teams receive their funds?',
      answer: 'Funds are paid directly to your team or booster club\'s linked bank account using Stripe Connect, our secure payment provider. You can track payouts in real-time from your team dashboard. Most payouts take 2–3 business days to process once donations are received.'
    },
    {
      id: 'customize',
      question: 'Can we customize our fundraising page?',
      answer: 'Yes! Every team gets a personalized fundraising page. With our Pro and Elite plans, you can add your logo, school colors, and even create a custom URL (like goali.io/yourteamname) to boost recognition and trust with donors.'
    },
    {
      id: 'roles',
      question: 'What roles can we assign to users?',
      answer: 'Goali supports multiple user roles with different access levels:\n\n• Admin: Full control over dashboard, finances, users, and event creation\n• Coach: Can manage team events, invite players, monitor participation\n• Parents & Athletes: Can view calendars, send fundraising links, track leaderboards and progress\n\nThis role-based access ensures the right people see the right tools—nothing more, nothing less.'
    },
    {
      id: 'fees',
      question: 'Who pays the platform and Stripe fees?',
      answer: 'You decide. By default, donors are given the option to cover all fees during checkout (and most do!). You can also choose to absorb the platform fee if you\'d rather offer donors a zero-fee experience. Stripe\'s payment processing fee applies on every transaction, regardless of who pays.'
    },
    {
      id: 'merchandise',
      question: 'Can I use Goali for merchandise or ticket sales?',
      answer: 'Absolutely. Goali isn\'t just for donations—we\'re a full fundraising hub. You can:\n\n• Sell tickets to games and events\n• Collect team dues or participation fees\n• Offer team merch (shirts, gear, etc.) with automatic checkout\n• Accept one-time or recurring donations\n\nEverything is trackable in your dashboard.'
    },
    {
      id: 'teams',
      question: 'Is Goali only for school teams?',
      answer: 'Nope! Goali works for:\n\n• High school athletic programs\n• College club teams\n• Youth select/travel teams\n• Booster clubs\n• Greek life organizations\n• Any group that needs to raise money, track dues, or manage events\n\nIf your team has goals, Goali was built to help you reach them.'
    },
    {
      id: 'security',
      question: 'How secure is Goali?',
      answer: 'Extremely. We use Stripe, a PCI-compliant global leader in online payments. All transactions are encrypted end-to-end, and no sensitive financial data is ever stored on Goali\'s servers. Plus, your admin dashboard is protected with secure logins and role-based access.'
    },
    {
      id: 'setup',
      question: 'How fast can we get started?',
      answer: 'In minutes. Simply create an account, set up your team page, and start sharing your unique donation or ticketing links. No complicated approvals, no long setup forms—just plug in and play.'
    },
    {
      id: 'campaigns',
      question: 'Can we run multiple campaigns at once?',
      answer: 'Yes! Whether you\'re raising for equipment, travel, uniforms, or dues—you can launch as many active campaigns or events as you need. Track each one separately and manage everything in your admin dashboard.'
    },
    {
      id: 'help',
      question: 'What if we need help getting started?',
      answer: 'We\'ve got your back. Our Fundraising Playbook, in-app tutorials, and support team are all ready to help you get off the ground. You can also book a free onboarding call with one of our team success coaches to walk you through everything.'
    },
    {
      id: 'tax',
      question: 'Can donors get tax-deductible receipts?',
      answer: 'That depends on your organization. If your team or booster club is a registered 501(c)(3) nonprofit, you can issue tax-deductible receipts. Goali will facilitate the transaction, but the tax-exempt status is managed by your team, not Goali. We\'ll help you display the correct info on your fundraising pages.'
    }
  ];

  const blogPosts = [
    {
      id: '1',
      title: '10 Fundraising Ideas That Actually Work in 2025 (And 3 That Don\'t)',
      excerpt: 'Let\'s be honest—selling cookie dough and discount cards isn\'t cutting it anymore. Parents are tired, players are bored, and your goal still isn\'t met. It\'s time to try smarter ideas that raise more money in less time.',
      readTime: '8 min read',
      publishDate: '2024-02-01',
      category: 'Strategy',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: {
        intro: 'Let\'s be honest—selling cookie dough and discount cards isn\'t cutting it anymore. Parents are tired, players are bored, and your goal still isn\'t met. It\'s time to try smarter ideas that raise more money in less time.',
        worksSection: {
          title: '✅ What Works:',
          items: [
            'Online donation campaigns with player leaderboards',
            'QR code posters at games and events',
            'Raffle ticket campaigns with custom prizes',
            'Team merch drops (limited edition hoodies/jerseys)',
            'Digital ticket sales for events',
            'Monthly supporter subscriptions for boosters',
            'Text-to-give campaigns',
            '"Sponsor-a-player" drives',
            'Restaurant or brand partnerships',
            'Silent auctions with custom donations'
          ]
        },
        doesntWorkSection: {
          title: '❌ What Doesn\'t Work Anymore:',
          items: [
            'Cold-door knocking',
            'Endless bake sales',
            'Paper signup sheets'
          ]
        },
        cta: 'Want to run a modern fundraiser that works? Get Started with Goali today →'
      }
    },
    {
      id: '2',
      title: 'How One Small Texas Team Raised $12,000 in 3 Weeks With Goali',
      excerpt: 'Meet the Anna High School varsity soccer team. A month ago, they had no fundraising plan, low parent turnout, and barely enough gear. Today, they\'ve raised $12,463—all tracked through Goali.',
      readTime: '6 min read',
      publishDate: '2024-01-28',
      category: 'Case Study',
      image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=800',
      content: {
        intro: 'Meet the Anna High School varsity soccer team. A month ago, they had no fundraising plan, low parent turnout, and barely enough gear. Today, they\'ve raised $12,463—all tracked through Goali.',
        strategy: {
          title: 'What They Did Differently:',
          items: [
            'Used Goali\'s dashboard to track every player\'s donations',
            'Enabled parents and athletes to share personal donation links',
            'Set a clear goal: new uniforms + travel budget',
            'Leveraged the built-in leaderboard to drive friendly team competition',
            'Sent weekly reminders and updates through the platform'
          ]
        },
        quote: '"Goali made it insanely easy. I didn\'t have to chase checks or run spreadsheets—we could actually focus on the season."',
        results: {
          title: 'Outcome:',
          items: [
            '✅ 86% player participation',
            '✅ 93 donors',
            '✅ Fully funded travel + gear'
          ]
        },
        cta: 'Want results like this? Book a free setup call →'
      }
    }
  ];

  const caseStudies = [
    {
      id: '1',
      title: 'Texas State Hockey – $15,367 Raised for Nationals in 21 Days',
      teamType: 'College Club',
      useCase: 'National travel costs',
      location: 'San Marcos, TX',
      icon: Trophy,
      color: 'blue',
      challenge: 'Texas State\'s hockey club needed over $15K to fund their trip to nationals. They were tired of spreadsheets and low-impact social posts that didn\'t convert into donations.',
      solution: [
        'Every player got a unique donation link',
        'Live leaderboard drove friendly team competition',
        'Auto-reminders kept families and friends engaged',
        'Admin dashboard tracked funds and payouts in real-time'
      ],
      results: [
        { metric: '$15,367', label: 'raised in 3 weeks' },
        { metric: '92%', label: 'player participation' },
        { metric: '100%', label: 'trip fully funded without third-party campaigns' }
      ],
      quote: 'We\'ve never raised money this fast. Goali made it feel like a real campaign, not a chore.',
      quotee: 'Team Captain'
    },
    {
      id: '2',
      title: 'Anna High School Football – Unified Dues + Fundraising Hub',
      teamType: 'High School Football',
      useCase: 'Dues collection + fundraising',
      location: 'Anna, TX',
      icon: Users,
      color: 'green',
      challenge: 'Coaches at Anna were collecting dues manually through Venmo, while trying to run fundraisers with paper forms and low turnout.',
      solution: [
        'Set up a dues collection campaign with due dates',
        'Linked QR posters at parent meetings',
        'Used in-app reminders and payment tracking',
        'Admin could instantly view which players had paid and who hadn\'t'
      ],
      results: [
        { metric: '$8,980', label: 'collected in dues' },
        { metric: '100%', label: 'of players onboarded within 24 hours' },
        { metric: '0', label: 'hours spent chasing down payments' }
      ],
      quote: 'Goali replaced our spreadsheets and group texts. It saved hours every week.',
      quotee: 'Anna Coach'
    },
    {
      id: '3',
      title: 'Sigma Chi – Fraternity Philanthropy & Member Dues, Simplified',
      teamType: 'Greek Life – Fraternity',
      useCase: 'Charity event + recurring member dues',
      location: 'Texas State University',
      icon: Heart,
      color: 'purple',
      challenge: 'Sigma Chi needed to run a philanthropy drive while also getting members to pay semester dues on time. Neither was organized.',
      solution: [
        'Custom member dues campaign with recurring payments',
        'Set up a 1-week donation drive with a charity goal',
        'Dashboard access for the Treasurer to see all payment activity'
      ],
      results: [
        { metric: '$6,230', label: 'raised for charity' },
        { metric: '91%', label: 'dues compliance within 14 days' },
        { metric: '1-click', label: 'reporting sent to the executive board' }
      ],
      quote: 'It\'s like Venmo, Google Sheets, and a donation page all in one.',
      quotee: 'Treasurer'
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm border-b border-gray-200 px-8 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-body">Back to Home</span>
            </motion.button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-title text-gray-900">Goali</span>
            </div>
          </div>
          
          <div className="text-right">
            <h1 className="text-xl font-header text-gray-900">Resources</h1>
            <p className="text-sm text-gray-600 font-body">Everything you need to succeed</p>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-16 px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-title mb-6">
            Got Questions? We've Got Answers.
          </h1>
          <p className="text-xl text-blue-100 font-body max-w-2xl mx-auto">
            Whether you're a coach, parent, or player, we're here to make fundraising with Goali easy, transparent, and stress-free.
          </p>
        </div>
      </motion.div>

      <div className="flex max-w-7xl mx-auto">
        {/* Left Sidebar - Navigation */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h3 className="text-lg font-header text-gray-900 mb-4">Browse Resources</h3>
            
            <div className="space-y-2">
              {navigationSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                        : 'hover:bg-gray-50 border-2 border-transparent text-gray-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className={`h-5 w-5 ${
                        activeSection === section.id ? 'text-blue-600' : 'text-gray-500'
                      }`} />
                      <span className="font-header">{section.label}</span>
                    </div>
                    <p className={`text-sm font-body ${
                      activeSection === section.id ? 'text-blue-700' : 'text-gray-500'
                    }`}>
                      {section.description}
                    </p>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Links */}
            <div className="mt-8 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <h4 className="font-header text-gray-900 mb-3">Quick Start</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-green-700 hover:text-green-900 font-body">
                  → Getting Started Guide
                </button>
                <button className="w-full text-left text-sm text-green-700 hover:text-green-900 font-body">
                  → Video Tutorials
                </button>
                <button className="w-full text-left text-sm text-green-700 hover:text-green-900 font-body">
                  → Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {/* FAQ Section */}
            {activeSection === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-title text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <p className="text-gray-600 font-body">Find answers to the most common questions about Goali</p>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-body"
                    placeholder="Search FAQs..."
                  />
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <h3 className="font-header text-gray-900">{faq.question}</h3>
                        <motion.div
                          animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {expandedFAQ === faq.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-gray-600 font-body whitespace-pre-line">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <HelpCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="font-body">No FAQs found matching your search.</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Blog Section */}
            {activeSection === 'blog' && (
              <motion.div
                key="blog"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-title text-gray-900 mb-4">Fundraising Insights</h2>
                  <p className="text-gray-600 font-body">Latest tips, strategies, and success stories to help your team thrive</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {blogPosts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
                    >
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center space-x-4 mb-3">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-header">
                            {post.category}
                          </span>
                          <span className="text-gray-500 text-sm font-body">{post.readTime}</span>
                          <span className="text-gray-500 text-sm font-body">
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-header text-gray-900 mb-3">{post.title}</h3>
                        <p className="text-gray-600 font-body mb-4">{post.excerpt}</p>
                        
                        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-header">
                          <span>Read More</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Case Studies Section */}
            {activeSection === 'case-studies' && (
              <motion.div
                key="case-studies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-title text-gray-900 mb-4">Success Stories</h2>
                  <p className="text-gray-600 font-body">Real teams, real results. See how organizations like yours are achieving their fundraising goals</p>
                </div>

                <div className="space-y-8">
                  {caseStudies.map((study, index) => {
                    const IconComponent = study.icon;
                    return (
                      <motion.div
                        key={study.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                      >
                        <div className={`bg-gradient-to-r from-${study.color}-500 to-${study.color}-600 p-6 text-white`}>
                          <div className="flex items-center space-x-4 mb-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                              <IconComponent className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="text-2xl font-title">{study.title}</h3>
                              <div className="flex items-center space-x-4 text-sm opacity-90">
                                <span>{study.teamType}</span>
                                <span>•</span>
                                <span>{study.useCase}</span>
                                <span>•</span>
                                <span>{study.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                              <div>
                                <h4 className="font-header text-gray-900 mb-3">The Challenge</h4>
                                <p className="text-gray-600 font-body">{study.challenge}</p>
                              </div>

                              <div>
                                <h4 className="font-header text-gray-900 mb-3">The Goali Difference</h4>
                                <ul className="space-y-2">
                                  {study.solution.map((item, idx) => (
                                    <li key={idx} className="flex items-start space-x-2">
                                      <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                                      <span className="text-gray-600 font-body">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <h4 className="font-header text-gray-900 mb-4">Results</h4>
                                <div className="grid grid-cols-1 gap-4">
                                  {study.results.map((result, idx) => (
                                    <div key={idx} className={`bg-${study.color}-50 border border-${study.color}-200 rounded-lg p-4`}>
                                      <div className={`text-2xl font-title text-${study.color}-900 mb-1`}>
                                        {result.metric}
                                      </div>
                                      <div className={`text-sm text-${study.color}-700 font-body`}>
                                        {result.label}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4`}>
                                <blockquote className="text-gray-700 font-body italic mb-2">
                                  "{study.quote}"
                                </blockquote>
                                <cite className="text-gray-500 font-header text-sm">– {study.quotee}</cite>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Fundraising Playbook Section */}
            {activeSection === 'playbook' && (
              <motion.div
                key="playbook"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FundraisingPlaybook />
              </motion.div>
            )}

            {/* Support Section */}
            {activeSection === 'support' && (
              <motion.div
                key="support"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-3xl font-title text-gray-900 mb-4">Get Support</h2>
                  <p className="text-gray-600 font-body">We're here to help you succeed. Choose the support option that works best for you</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Help Center',
                      description: 'Browse our comprehensive knowledge base and tutorials',
                      icon: BookOpen,
                      color: 'blue',
                      action: 'Browse Articles'
                    },
                    {
                      title: 'Live Chat',
                      description: 'Get instant help from our support team during business hours',
                      icon: Headphones,
                      color: 'green',
                      action: 'Start Chat'
                    },
                    {
                      title: 'Schedule a Call',
                      description: 'Book a free onboarding session with our team success coaches',
                      icon: Calendar,
                      color: 'purple',
                      action: 'Book Call'
                    }
                  ].map((option, index) => {
                    const IconComponent = option.icon;
                    return (
                      <motion.div
                        key={option.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 cursor-pointer"
                      >
                        <div className={`w-12 h-12 bg-${option.color}-100 rounded-xl flex items-center justify-center mb-4`}>
                          <IconComponent className={`h-6 w-6 text-${option.color}-600`} />
                        </div>
                        <h3 className="text-lg font-header text-gray-900 mb-2">{option.title}</h3>
                        <p className="text-gray-600 font-body mb-4">{option.description}</p>
                        <button className={`text-${option.color}-600 hover:text-${option.color}-700 font-header flex items-center space-x-2`}>
                          <span>{option.action}</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-lg font-header text-gray-900 mb-4">Other Ways to Reach Us</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-header text-gray-900 mb-2">Email Support</h4>
                      <p className="text-gray-600 font-body mb-2">support@goali.app</p>
                      <p className="text-sm text-gray-500 font-body">We typically respond within 24 hours</p>
                    </div>
                    <div>
                      <h4 className="font-header text-gray-900 mb-2">Business Hours</h4>
                      <p className="text-gray-600 font-body mb-1">Monday - Friday: 9 AM - 6 PM CST</p>
                      <p className="text-gray-600 font-body">Saturday: 10 AM - 2 PM CST</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-16 px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-title mb-6">
            Ready to Start Your Fundraising Journey?
          </h2>
          <p className="text-xl text-gray-300 font-body mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using Goali to achieve their fundraising goals with ease and transparency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button 
              onClick={() => navigate('/signup')}
              className="bg-white text-gray-900 px-8 py-4 rounded-xl font-header text-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
            </motion.button>
            <motion.button 
              className="border-2 border-white/20 text-white px-8 py-4 rounded-xl font-header text-lg hover:bg-white/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Schedule a Demo
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourcesPage;