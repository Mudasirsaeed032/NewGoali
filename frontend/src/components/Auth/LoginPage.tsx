import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Eye, EyeOff, ArrowLeft, Shield, Users, Target, Settings } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Coach');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      name: 'Admin',
      icon: Settings,
      subtitle: 'Log in to manage your organization',
      description: 'Access comprehensive analytics, user management, and system settings',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Coach',
      icon: Trophy,
      subtitle: 'Log in to manage your team',
      description: 'Track team progress, manage dues, and motivate your players',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Parent',
      icon: Shield,
      subtitle: 'Log in to support your athlete',
      description: 'Make payments, track donations, and stay connected',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Athlete',
      icon: Target,
      subtitle: 'Log in to track your fundraising progress',
      description: 'Share your links, view leaderboards, and compete with teammates',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  const currentRole = roles.find(role => role.name === selectedRole) || roles[1];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Navigate to role-specific dashboard
    navigate(`/dashboard/${selectedRole.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-blue-900/90" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120,119,198,0.4) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255,119,198,0.4) 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, rgba(120,219,255,0.3) 0%, transparent 50%)
            `,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-50 flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-body">Back to Home</span>
      </motion.button>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Branding & Role Selection */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Logo & Title */}
              <div className="text-center lg:text-left">
                <motion.div 
                  className="flex items-center justify-center lg:justify-start space-x-3 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Trophy className="h-7 w-7 text-white" />
                  </div>
                  <span className="text-3xl font-title text-white">Goali</span>
                </motion.div>

                <motion.h1 
                  className="text-4xl lg:text-5xl font-title text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Welcome to Goali
                </motion.h1>

                <AnimatePresence mode="wait">
                  <motion.p 
                    key={selectedRole}
                    className="text-xl text-gray-300 font-body"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {currentRole.subtitle}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Role Selection */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-lg font-header text-white mb-4 text-center lg:text-left">Select Your Role</h3>
                <div className="grid grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const IconComponent = role.icon;
                    return (
                      <motion.button
                        key={role.name}
                        onClick={() => setSelectedRole(role.name)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          selectedRole === role.name
                            ? `border-${role.color}-400 bg-${role.color}-500/20`
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <IconComponent className={`h-6 w-6 ${
                            selectedRole === role.name ? `text-${role.color}-400` : 'text-white/70'
                          }`} />
                          <span className={`text-sm font-header ${
                            selectedRole === role.name ? `text-${role.color}-300` : 'text-white/70'
                          }`}>
                            {role.name}
                          </span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Role Description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-10 h-10 bg-gradient-to-r ${currentRole.gradient} rounded-lg flex items-center justify-center`}>
                      <currentRole.icon className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="text-lg font-header text-white">{currentRole.name} Access</h4>
                  </div>
                  <p className="text-gray-300 font-body">{currentRole.description}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
            >
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-header text-white mb-2">
                    Email Address
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body"
                    placeholder="Enter your email"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-header text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <motion.input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-body pr-12"
                      placeholder="Enter your password"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded border-white/20 bg-white/10 text-blue-500 focus:ring-blue-500" />
                    <span className="ml-2 text-sm text-white/70 font-body">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors font-body">
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 rounded-xl font-header text-lg transition-all duration-200 ${
                    isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${currentRole.gradient} hover:shadow-lg hover:scale-[1.02]`
                  } text-white`}
                  whileHover={!isLoading ? { scale: 1.02 } : {}}
                  whileTap={!isLoading ? { scale: 0.98 } : {}}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    `Sign In as ${selectedRole}`
                  )}
                </motion.button>

                <div className="text-center">
                  <p className="text-white/70 font-body">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors font-header">
                      Sign up here
                    </a>
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;