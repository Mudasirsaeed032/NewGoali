import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface FooterProps {
  className?: string;
  variant?: 'default' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ 
  className = "",
  variant = 'default'
}) => {
  const isDark = variant === 'dark';
  
  const footerClasses = isDark 
    ? "bg-gray-900 text-white" 
    : "bg-gray-50 border-t border-gray-200";

  const linkClasses = isDark
    ? "text-gray-300 hover:text-white"
    : "text-gray-600 hover:text-gray-900";

  return (
    <footer className={`${footerClasses} py-12 px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <span className={`text-xl font-title ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Goali
              </span>
            </div>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} font-body`}>
              Empowering sports clubs with powerful fundraising tools.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className={`font-header mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Product
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className={`${linkClasses} transition-colors font-body`}>
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className={`${linkClasses} transition-colors font-body`}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="#demo" className={`${linkClasses} transition-colors font-body`}>
                  Demo
                </a>
              </li>
              <li>
                <a href="#integrations" className={`${linkClasses} transition-colors font-body`}>
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className={`font-header mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="/resources" className={`${linkClasses} transition-colors font-body`}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className={`${linkClasses} transition-colors font-body`}>
                  Contact
                </a>
              </li>
              <li>
                <a href="/resources" className={`${linkClasses} transition-colors font-body`}>
                  Resources
                </a>
              </li>
              <li>
                <a href="#status" className={`${linkClasses} transition-colors font-body`}>
                  Status
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className={`font-header mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className={`${linkClasses} transition-colors font-body`}>
                  About
                </a>
              </li>
              <li>
                <a href="#blog" className={`${linkClasses} transition-colors font-body`}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className={`${linkClasses} transition-colors font-body`}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#press" className={`${linkClasses} transition-colors font-body`}>
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} font-body text-sm`}>
              &copy; 2024 Goali. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#privacy" className={`${linkClasses} transition-colors font-body text-sm`}>
                Privacy Policy
              </a>
              <a href="#terms" className={`${linkClasses} transition-colors font-body text-sm`}>
                Terms of Service
              </a>
              <a href="#cookies" className={`${linkClasses} transition-colors font-body text-sm`}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;