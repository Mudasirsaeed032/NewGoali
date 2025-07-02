import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Target, Users, Share2, TrendingUp, DollarSign, 
  CheckCircle, ArrowRight, Calendar, MessageSquare, BarChart3,
  Zap, Star, Award, Heart, Clock, Sparkles, ChevronRight,
  ChevronDown, Play, Download, Copy, ExternalLink, Lightbulb,
  AlertCircle, Gift, Megaphone, Smartphone, QrCode, Mail
} from 'lucide-react';

interface PlaybookStep {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
  content: {
    overview: string;
    tips: string[];
    examples?: {
      bad?: string;
      good?: string;
    };
    actionItems?: string[];
    tools?: string[];
  };
  color: string;
  estimatedTime: string;
}

const FundraisingPlaybook: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const playbookSteps: PlaybookStep[] = [
    {
      id: 1,
      title: 'Set a Clear Goal',
      icon: Target,
      description: 'Define exactly what you\'re raising money for',
      estimatedTime: '15 minutes',
      color: 'blue',
      content: {
        overview: 'The foundation of any successful fundraiser is a crystal-clear, specific goal that resonates with your supporters.',
        tips: [
          'Pick a single, specific target rather than general fundraising',
          'Include the exact dollar amount needed',
          'Explain what the money will accomplish',
          'Set a realistic but ambitious goal',
          'Make it emotionally compelling'
        ],
        examples: {
          bad: '"We\'re raising money for the team."',
          good: '"We\'re raising $3,000 for our out-of-state playoff trip to compete for the championship."'
        },
        actionItems: [
          'Write down your specific fundraising purpose',
          'Calculate the exact amount needed',
          'Create a one-sentence goal statement',
          'Test your goal with 3 team members for clarity'
        ]
      }
    },
    {
      id: 2,
      title: 'Onboard Your Team',
      icon: Users,
      description: 'Get everyone set up and ready to participate',
      estimatedTime: '30 minutes',
      color: 'green',
      content: {
        overview: 'Success depends on having your entire team properly set up and engaged from day one.',
        tips: [
          'Invite all players, parents, and coaches to Goali',
          'Assign appropriate roles to each team member',
          'Add your team logo, colors, and compelling story',
          'Ensure every player profile is complete and active',
          'Hold a brief team meeting to explain the process'
        ],
        actionItems: [
          'Send invitations to all team members',
          'Upload team logo and customize colors',
          'Write your team story (2-3 paragraphs)',
          'Verify all player accounts are active',
          'Schedule team kickoff meeting'
        ],
        tools: ['Goali invitation system', 'Team customization tools', 'Role management']
      }
    },
    {
      id: 3,
      title: 'Launch the Campaign',
      icon: Zap,
      description: 'Set up your fundraising campaign with the right settings',
      estimatedTime: '20 minutes',
      color: 'purple',
      content: {
        overview: 'Configure your campaign settings to maximize participation and track progress effectively.',
        tips: [
          'Choose the right campaign type for your goal',
          'Set a realistic but urgent deadline',
          'Enable team leaderboard for friendly competition',
          'Turn on donor email/text alerts for updates',
          'Create compelling campaign description'
        ],
        actionItems: [
          'Select campaign type (dues, donations, tickets, etc.)',
          'Set campaign deadline (2-3 weeks recommended)',
          'Enable leaderboard and competition features',
          'Write campaign description and story',
          'Configure notification settings'
        ]
      }
    },
    {
      id: 4,
      title: 'Share, Share, Share',
      icon: Share2,
      description: 'Get your unique links out to potential supporters',
      estimatedTime: '45 minutes',
      color: 'pink',
      content: {
        overview: 'The key to fundraising success is getting your story in front of as many people as possible through multiple channels.',
        tips: [
          'Every player and parent gets their unique shareable link',
          'Use multiple sharing channels for maximum reach',
          'Create QR code posters for in-person events',
          'Send personalized messages, not generic blasts',
          'Share consistently throughout the campaign'
        ],
        actionItems: [
          'Distribute unique links to all participants',
          'Create social media posts for each platform',
          'Generate QR codes for game day posters',
          'Draft email templates for different audiences',
          'Plan sharing schedule for campaign duration'
        ],
        examples: {
          good: '"Hey! [Name] is raising money for their team trip to nationals! Every dollar helps 🏆 Check it out here: [custom Goali link]"'
        }
      }
    },
    {
      id: 5,
      title: 'Drive Engagement (Gamify It)',
      icon: Trophy,
      description: 'Use competition and recognition to boost participation',
      estimatedTime: '30 minutes',
      color: 'yellow',
      content: {
        overview: 'Turn fundraising into a fun, competitive experience that motivates everyone to participate actively.',
        tips: [
          'Enable team leaderboard to show top fundraisers',
          'Give weekly shoutouts to top performers',
          'Reward top 3 with team merch or gift cards',
          'Post regular progress updates on social media',
          'Create class or position-based competitions'
        ],
        actionItems: [
          'Set up weekly recognition system',
          'Plan rewards for top fundraisers',
          'Create social media update schedule',
          'Organize mini-competitions within the team',
          'Design progress celebration posts'
        ]
      }
    },
    {
      id: 6,
      title: 'Track Progress',
      icon: BarChart3,
      description: 'Monitor your campaign and keep momentum high',
      estimatedTime: 'Ongoing',
      color: 'indigo',
      content: {
        overview: 'Use real-time data to understand what\'s working and keep your team motivated throughout the campaign.',
        tips: [
          'Check your Goali dashboard daily for real-time updates',
          'Monitor who\'s sharing links and who needs encouragement',
          'Use auto-reminders to maintain consistent outreach',
          'Track which sharing methods are most effective',
          'Celebrate milestones as you reach them'
        ],
        actionItems: [
          'Set daily dashboard check routine',
          'Create weekly progress reports for team',
          'Set up automated reminder sequences',
          'Track sharing activity by player',
          'Plan milestone celebration posts'
        ]
      }
    },
    {
      id: 7,
      title: 'Collect & Celebrate',
      icon: Gift,
      description: 'Wrap up your campaign and thank supporters',
      estimatedTime: '60 minutes',
      color: 'emerald',
      content: {
        overview: 'End your campaign on a high note by properly thanking supporters and celebrating your success.',
        tips: [
          'Funds are automatically disbursed via Stripe',
          'Export detailed reports for transparency',
          'Send thank-you messages to all supporters',
          'Celebrate your success with the team',
          'Share final results and impact with community'
        ],
        actionItems: [
          'Download final campaign report',
          'Send personalized thank-you messages',
          'Create celebration post with final numbers',
          'Plan team celebration event',
          'Document lessons learned for next campaign'
        ]
      }
    }
  ];

  const finalTips = [
    {
      title: 'Fundraisers work best when parents & players BOTH share',
      icon: Users,
      description: 'Double your reach by having both generations actively participating'
    },
    {
      title: 'Use a mix of social and in-person promotion',
      icon: Megaphone,
      description: 'Combine digital sharing with face-to-face conversations for maximum impact'
    },
    {
      title: 'Keep the campaign short and urgent (2–3 weeks max)',
      icon: Clock,
      description: 'Create urgency to drive action - longer campaigns lose momentum'
    }
  ];

  const markStepComplete = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const currentStep = playbookSteps.find(step => step.id === activeStep);
  const progressPercentage = (completedSteps.length / playbookSteps.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-3 rounded-full mb-6"
        >
          <Trophy className="h-6 w-6 text-blue-600" />
          <span className="font-header text-blue-900">GOALI FUNDRAISING PLAYBOOK</span>
        </motion.div>
        
        <h2 className="text-3xl lg:text-4xl font-title text-gray-900 mb-4">
          How to Launch a Winning Fundraiser in 7 Days
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <h3 className="font-header text-blue-900 mb-3">📘 This playbook is for:</h3>
            <p className="text-blue-800 font-body mb-4">
              Coaches, Admins, Team Parents, Captains, and Boosters
            </p>
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-header text-gray-900 mb-2">🥅 Goal:</h4>
              <p className="text-gray-700 font-body">
                Help teams raise money fast, with little confusion, zero spreadsheets, and high participation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-header text-gray-900">Your Progress</h3>
          <span className="text-sm font-body text-gray-600">
            {completedSteps.length} of {playbookSteps.length} steps completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600 font-body">
          <span>Just getting started</span>
          <span>Fundraising expert! 🎉</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Step Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-8">
            <h3 className="font-header text-gray-900 mb-4">Playbook Steps</h3>
            
            <div className="space-y-2">
              {playbookSteps.map((step) => {
                const IconComponent = step.icon;
                const isActive = activeStep === step.id;
                const isCompleted = completedSteps.includes(step.id);
                
                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `bg-${step.color}-50 border-2 border-${step.color}-200`
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? `bg-${step.color}-500 text-white`
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <IconComponent className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-header ${
                          isActive ? `text-${step.color}-900` : 'text-gray-900'
                        }`}>
                          Step {step.id}: {step.title}
                        </div>
                        <div className={`text-xs font-body ${
                          isActive ? `text-${step.color}-700` : 'text-gray-500'
                        }`}>
                          {step.estimatedTime}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-header text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-blue-600 hover:text-blue-700 font-body flex items-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
                <button className="w-full text-left text-sm text-green-600 hover:text-green-700 font-body flex items-center space-x-2">
                  <Copy className="h-4 w-4" />
                  <span>Copy Checklist</span>
                </button>
                <button className="w-full text-left text-sm text-purple-600 hover:text-purple-700 font-body flex items-center space-x-2">
                  <ExternalLink className="h-4 w-4" />
                  <span>Share Playbook</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {currentStep && (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Step Header */}
                <div className={`bg-gradient-to-r from-${currentStep.color}-500 to-${currentStep.color}-600 p-6 text-white`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <currentStep.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm opacity-90 mb-1">Step {currentStep.id} of {playbookSteps.length}</div>
                      <h3 className="text-2xl font-title">{currentStep.title}</h3>
                      <p className="opacity-90 font-body">{currentStep.description}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex items-center space-x-4 text-sm opacity-90">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Estimated time: {currentStep.estimatedTime}</span>
                    </div>
                    {completedSteps.includes(currentStep.id) && (
                      <div className="flex items-center space-x-1 bg-green-500/20 px-2 py-1 rounded-full">
                        <CheckCircle className="h-4 w-4" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="p-6 space-y-6">
                  {/* Overview */}
                  <div>
                    <h4 className="font-header text-gray-900 mb-3 flex items-center space-x-2">
                      <Lightbulb className="h-5 w-5 text-yellow-500" />
                      <span>Overview</span>
                    </h4>
                    <p className="text-gray-700 font-body leading-relaxed">
                      {currentStep.content.overview}
                    </p>
                  </div>

                  {/* Pro Tips */}
                  <div>
                    <h4 className="font-header text-gray-900 mb-4 flex items-center space-x-2">
                      <Star className="h-5 w-5 text-blue-500" />
                      <span>🎯 Pro Tips</span>
                    </h4>
                    <div className="space-y-3">
                      {currentStep.content.tips.map((tip, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-header text-blue-600">{index + 1}</span>
                          </div>
                          <span className="text-gray-700 font-body">{tip}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Examples */}
                  {currentStep.content.examples && (
                    <div>
                      <h4 className="font-header text-gray-900 mb-4 flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-green-500" />
                        <span>Examples</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentStep.content.examples.bad && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <AlertCircle className="h-4 w-4 text-red-600" />
                              <span className="font-header text-red-900">❌ Don't do this:</span>
                            </div>
                            <p className="text-red-800 font-body italic">"{currentStep.content.examples.bad}"</p>
                          </div>
                        )}
                        {currentStep.content.examples.good && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="font-header text-green-900">✅ Do this instead:</span>
                            </div>
                            <p className="text-green-800 font-body italic">"{currentStep.content.examples.good}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Items */}
                  {currentStep.content.actionItems && (
                    <div>
                      <h4 className="font-header text-gray-900 mb-4 flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-purple-500" />
                        <span>Action Checklist</span>
                      </h4>
                      <div className="space-y-2">
                        {currentStep.content.actionItems.map((item, index) => (
                          <label key={index} className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors">
                            <input type="checkbox" className="mt-1 rounded border-purple-300 text-purple-600 focus:ring-purple-500" />
                            <span className="text-purple-800 font-body">{item}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tools */}
                  {currentStep.content.tools && (
                    <div>
                      <h4 className="font-header text-gray-900 mb-4 flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        <span>Recommended Tools</span>
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {currentStep.content.tools.map((tool, index) => (
                          <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-body">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step Actions */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      {activeStep > 1 && (
                        <button
                          onClick={() => setActiveStep(activeStep - 1)}
                          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-body"
                        >
                          <ChevronRight className="h-4 w-4 rotate-180" />
                          <span>Previous Step</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-4">
                      {!completedSteps.includes(currentStep.id) && (
                        <motion.button
                          onClick={() => markStepComplete(currentStep.id)}
                          className={`bg-${currentStep.color}-600 hover:bg-${currentStep.color}-700 text-white px-6 py-2 rounded-lg font-header flex items-center space-x-2`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Mark Complete</span>
                        </motion.button>
                      )}

                      {activeStep < playbookSteps.length && (
                        <button
                          onClick={() => setActiveStep(activeStep + 1)}
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-header"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Tips */}
          {activeStep === playbookSteps.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200"
            >
              <h3 className="text-xl font-header text-green-900 mb-4 flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>✅ Final Tips for Success</span>
              </h3>
              
              <div className="space-y-4">
                {finalTips.map((tip, index) => {
                  const IconComponent = tip.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-green-200"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-header text-green-900 mb-1">{tip.title}</h4>
                        <p className="text-green-800 font-body text-sm">{tip.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {completedSteps.length === playbookSteps.length && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-center p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white"
                >
                  <Trophy className="h-12 w-12 mx-auto mb-3" />
                  <h3 className="text-xl font-title mb-2">Congratulations! 🎉</h3>
                  <p className="font-body mb-4">
                    You've completed the Goali Fundraising Playbook! You're now ready to launch a winning campaign.
                  </p>
                  <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-header hover:bg-gray-100 transition-colors">
                    Start Your Campaign
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundraisingPlaybook;