import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, ArrowLeft, Bell, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBackButton?: boolean;
  showUserMenu?: boolean;
  isTransparent?: boolean;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title = "Goali",
  subtitle,
  showBackButton = false,
  showUserMenu = false,
  isTransparent = false,
  className = ""
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } 
      // Hide header when scrolling down and past the initial threshold
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const headerClasses = isTransparent 
    ? "bg-white/90 backdrop-blur-sm" 
    : "bg-white/90 backdrop-blur-sm";

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: 1, 
        y: isVisible ? 0 : -100 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`${headerClasses} border-b border-gray-200 fixed w-full z-50 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            {showBackButton && (
              <motion.button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-body">Back to Home</span>
              </motion.button>
            )}
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-title text-gray-900">{title}</span>
            </div>
          </div>

          {/* Navigation Links (for landing page) */}
          {!showUserMenu && location.pathname === '/' && (
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-body">How It Works</a>
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-body">Features</a>
              <button 
                onClick={() => navigate('/resources')}
                className="text-gray-600 hover:text-gray-900 transition-colors font-body"
              >
                Resources
              </button>
            </div>
          )}

          {/* User Menu or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {showUserMenu ? (
              <>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                {subtitle && (
                  <div className="text-right">
                    <h1 className="text-xl font-header text-gray-900">{subtitle}</h1>
                  </div>
                )}
                {location.pathname === '/' && (
                  <>
                    <button 
                      onClick={() => navigate('/login')}
                      className="text-gray-600 hover:text-gray-900 transition-colors font-body"
                    >
                      Log In
                    </button>
                    <button 
                      onClick={() => navigate('/signup')}
                      className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-header transition-all duration-200"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;