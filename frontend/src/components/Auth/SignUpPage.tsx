import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Trophy, ArrowLeft, User, Mail, Building, MessageSquare, CheckCircle, ArrowRight, Users, Target, Calendar, DollarSign, Shield, AlertCircle, Key, Send } from 'lucide-react';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inviteToken = searchParams.get('invite');
  const inviteRole = searchParams.get('role');
  
  const [signUpType, setSignUpType] = useState<'organization' | 'invited' | null>(
    inviteToken ? 'invited' : null
  );
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    organization: '',
    description: '',
    phone: '',
    playerName: '', // For parent signup
    position: '', // For player signup
    teamCode: '' // For joining existing team
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [inviteData, setInviteData] = useState<any>(null);

  // Simulate invite validation
  React.useEffect(() => {
    if (inviteToken && inviteRole) {
      // In real app, validate invite token with backend
      setInviteData({
        organizationName: 'Thunder Soccer Club',
        inviterName: 'Coach Martinez',
        role: inviteRole,
        valid: true
      });
    }
  }, [inviteToken, inviteRole]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Auto-redirect after success
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStep1Valid = () => {
    if (signUpType === 'organization') {
      return formData.name && formData.email && formData.organization;
    } else if (signUpType === 'invited') {
      return formData.name && formData.email;
    }
    return false;
  };

  const isStep2Valid = () => {
    return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
  };

  const isFormValid = isStep1Valid() && isStep2Valid();

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-title text-gray-900 mb-4"
          >
            {signUpType === 'organization' ? 'Organization Created!' : 'Account Created!'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 font-body mb-6"
          >
            {signUpType === 'organization' 
              ? 'Your organization has been set up! You can now invite team members and start fundraising.'
              : 'Welcome to the team! You can now access your dashboard and start participating.'
            }
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-sm text-gray-500 font-body"
          >
            Redirecting to login page...
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Initial sign-up type selection
  if (!signUpType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background elements */}
        <motion.div 
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: [`0px 0px`, `100px 100px`],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />
        </motion.div>

        {/* Back Button */}
        <motion.button
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 z-50 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-body">Back to Home</span>
        </motion.button>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl w-full text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-title text-gray-900">Goali</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-title text-gray-900 mb-4 leading-tight">
                How would you like to
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  get started?
                </span>
              </h1>

              <p className="text-xl text-gray-600 font-body mb-12 max-w-2xl mx-auto">
                Choose the option that best describes your situation
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Organization Sign-up */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 cursor-pointer"
                  onClick={() => setSignUpType('organization')}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-header text-gray-900 mb-4">Start a New Organization</h3>
                  <p className="text-gray-600 font-body mb-6">
                    Set up a new team, club, or organization. You'll become the admin and can invite coaches, players, and parents.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 font-body">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Full admin access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Invite team members</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Manage all fundraising</span>
                    </div>
                  </div>
                </motion.div>

                {/* Join Existing Team */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 cursor-pointer"
                  onClick={() => setSignUpType('invited')}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-header text-gray-900 mb-4">Join Existing Team</h3>
                  <p className="text-gray-600 font-body mb-6">
                    Join a team that's already using Goali. You'll need an invitation or team code from your admin or coach.
                  </p>
                  <div className="space-y-2 text-sm text-gray-500 font-body">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Role-based access</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Instant team connection</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>Start participating immediately</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-600 font-body text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-header"
                  >
                    Sign in here
                  </button>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background elements */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02]"
        animate={{
          backgroundPosition: [`0px 0px`, `100px 100px`],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0,0,0) 1px, transparent 0)`,
          backgroundSize: '24px 24px',
        }} />
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={() => signUpType ? setSignUpType(null) : navigate('/')}
        className="absolute top-6 left-6 z-50 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-body">Back</span>
      </motion.button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Trophy className="h-7 w-7 text-white" />
                </div>
                <span className="text-3xl font-title text-gray-900">Goali</span>
              </div>

              {signUpType === 'organization' ? (
                <div>
                  <h1 className="text-4xl lg:text-5xl font-title text-gray-900 mb-4 leading-tight">
                    Create Your
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Organization
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 font-body leading-relaxed">
                    Set up your team or organization and start inviting members to join your fundraising efforts.
                  </p>
                </div>
              ) : (
                <div>
                  {inviteData ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <Shield className="h-6 w-6 text-blue-600" />
                        <h3 className="font-header text-blue-900">You're Invited!</h3>
                      </div>
                      <p className="text-blue-800 font-body">
                        <strong>{inviteData.inviterName}</strong> has invited you to join{' '}
                        <strong>{inviteData.organizationName}</strong> as a <strong>{inviteData.role}</strong>.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                        <h3 className="font-header text-orange-900">No Invitation Found</h3>
                      </div>
                      <p className="text-orange-800 font-body">
                        You'll need an invitation link or team code to join an existing organization.
                      </p>
                    </div>
                  )}
                  
                  <h1 className="text-4xl lg:text-5xl font-title text-gray-900 mb-4 leading-tight">
                    Join Your
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                      Team
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 font-body leading-relaxed">
                    Complete your registration to start participating in your team's fundraising activities.
                  </p>
                </div>
              )}

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-4"
              >
                {(signUpType === 'organization' ? [
                  { icon: Users, title: 'Invite Team Members', description: 'Send secure invitations to coaches, players, and parents' },
                  { icon: Target, title: 'Set Fundraising Goals', description: 'Create and track multiple fundraising campaigns' },
                  { icon: Calendar, title: 'Manage Events', description: 'Organize fundraising events and activities' },
                  { icon: DollarSign, title: 'Track All Donations', description: 'Monitor progress with real-time analytics' }
                ] : [
                  { icon: Target, title: 'Personal Goals', description: 'Set and track your individual fundraising targets' },
                  { icon: Users, title: 'Team Collaboration', description: 'Work together with your teammates' },
                  { icon: Calendar, title: 'Event Participation', description: 'Join team events and activities' },
                  { icon: DollarSign, title: 'Secure Payments', description: 'Safe and easy donation processing' }
                ]).map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-header text-gray-900">{benefit.title}</h3>
                      <p className="text-gray-600 font-body text-sm">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Sign Up Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 relative overflow-hidden"
            >
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-header transition-all duration-300 ${
                        currentStep >= step 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-12 h-1 mx-2 rounded-full transition-all duration-300 ${
                          currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-500 font-body">Step {currentStep} of 3</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Step 1: Basic Information */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-title text-gray-900 mb-2">
                          {signUpType === 'organization' ? 'Organization Details' : 'Personal Information'}
                        </h2>
                        <p className="text-gray-600 font-body">
                          {signUpType === 'organization' 
                            ? 'Tell us about your organization' 
                            : 'Let us know who you are'
                          }
                        </p>
                      </div>

                      <div>
                        <label htmlFor="name" className="block text-sm font-header text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-header text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                            placeholder="Enter your email address"
                            required
                          />
                        </div>
                      </div>

                      {signUpType === 'organization' && (
                        <div>
                          <label htmlFor="organization" className="block text-sm font-header text-gray-700 mb-2">
                            Organization Name *
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              id="organization"
                              name="organization"
                              value={formData.organization}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                              placeholder="e.g., Thunder Soccer Club"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {signUpType === 'invited' && !inviteData && (
                        <div>
                          <label htmlFor="teamCode" className="block text-sm font-header text-gray-700 mb-2">
                            Team Code or Invitation Link
                          </label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              id="teamCode"
                              name="teamCode"
                              value={formData.teamCode}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                              placeholder="Enter team code or paste invitation link"
                            />
                          </div>
                        </div>
                      )}

                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStep1Valid()}
                        className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-header text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                        whileHover={isStep1Valid() ? { scale: 1.02 } : {}}
                        whileTap={isStep1Valid() ? { scale: 0.98 } : {}}
                      >
                        <span>Continue</span>
                        <ArrowRight className="h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Step 2: Security */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-title text-gray-900 mb-2">Secure Your Account</h2>
                        <p className="text-gray-600 font-body">Create a strong password to protect your account</p>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-header text-gray-700 mb-2">
                          Password *
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-header text-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                          placeholder="Confirm your password"
                          required
                        />
                        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                          <p className="text-red-500 text-sm mt-1 font-body">Passwords do not match</p>
                        )}
                      </div>

                      <div className="flex items-center space-x-4">
                        <motion.button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-header hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Back
                        </motion.button>

                        <motion.button
                          type="button"
                          onClick={nextStep}
                          disabled={!isStep2Valid()}
                          className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-header transition-all duration-200 flex items-center justify-center space-x-2"
                          whileHover={isStep2Valid() ? { scale: 1.02 } : {}}
                          whileTap={isStep2Valid() ? { scale: 0.98 } : {}}
                        >
                          <span>Continue</span>
                          <ArrowRight className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Additional Details */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-title text-gray-900 mb-2">Final Details</h2>
                        <p className="text-gray-600 font-body">
                          {signUpType === 'organization' 
                            ? 'Tell us about your fundraising goals' 
                            : 'Complete your profile'
                          }
                        </p>
                      </div>

                      {signUpType === 'organization' ? (
                        <div>
                          <label htmlFor="description" className="block text-sm font-header text-gray-700 mb-2">
                            Describe your fundraising needs *
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <textarea
                              id="description"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body resize-none"
                              placeholder="Tell us about your team, fundraising goals, or any specific questions you have..."
                              required
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-header text-gray-700 mb-2">
                              Phone Number (Optional)
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                              placeholder="Your phone number"
                            />
                          </div>

                          {inviteRole === 'parent' && (
                            <div>
                              <label htmlFor="playerName" className="block text-sm font-header text-gray-700 mb-2">
                                Player Name
                              </label>
                              <input
                                type="text"
                                id="playerName"
                                name="playerName"
                                value={formData.playerName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                                placeholder="Your child's name"
                              />
                            </div>
                          )}

                          {inviteRole === 'player' && (
                            <div>
                              <label htmlFor="position" className="block text-sm font-header text-gray-700 mb-2">
                                Position
                              </label>
                              <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                                placeholder="e.g., Forward, Midfielder, Defender"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex items-center space-x-4">
                        <motion.button
                          type="button"
                          onClick={prevStep}
                          className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-header hover:bg-gray-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Back
                        </motion.button>

                        <motion.button
                          type="submit"
                          disabled={!isFormValid || isSubmitting}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-header text-lg transition-all duration-200 flex items-center justify-center space-x-2"
                          whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                          whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              <span>Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <span>
                                {signUpType === 'organization' ? 'Create Organization' : 'Join Team'}
                              </span>
                              <CheckCircle className="h-5 w-5" />
                            </>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <motion.div 
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gray-600 font-body text-sm">
                  Already have an account?{' '}
                  <button
                    onClick={() => navigate('/login')}
                    className="text-blue-600 hover:text-blue-700 transition-colors font-header"
                  >
                    Sign in here
                  </button>
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;