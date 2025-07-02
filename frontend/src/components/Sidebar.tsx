import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  badge?: string | number;
}

interface SidebarProps {
  items: SidebarItem[];
  activeItem: string;
  onItemClick: (itemId: string) => void;
  title?: string;
  summaryData?: Record<string, any>;
  className?: string;
  width?: 'narrow' | 'normal' | 'wide';
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  activeItem,
  onItemClick,
  title = "Navigation",
  summaryData,
  className = "",
  width = 'normal'
}) => {
  const widthClasses = {
    narrow: 'w-64',
    normal: 'w-80',
    wide: 'w-96'
  };

  return (
    <div className={`${widthClasses[width]} bg-white border-r border-gray-200 min-h-screen ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-header text-gray-900 mb-4">{title}</h3>
        
        <div className="space-y-2">
          {items.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <motion.button
                key={item.id}
                onClick={() => onItemClick(item.id)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                    : 'hover:bg-gray-50 border-2 border-transparent text-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <IconComponent className={`h-5 w-5 ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  <span className="font-header flex-1">{item.label}</span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-1 rounded-full font-header ${
                      isActive 
                        ? 'bg-blue-200 text-blue-800' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <p className={`text-sm font-body ${
                  isActive ? 'text-blue-700' : 'text-gray-500'
                }`}>
                  {item.description}
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* Summary Section */}
        {summaryData && (
          <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h4 className="font-header text-gray-900 mb-3">
              {summaryData.title || 'Quick Stats'}
            </h4>
            <div className="space-y-3">
              {Object.entries(summaryData.stats || {}).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm font-body text-gray-600 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-header text-blue-900">{value}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar (if progress data exists) */}
            {summaryData.progress && (
              <div className="mt-4 pt-3 border-t border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-header text-gray-900">
                    {summaryData.progress.label || 'Progress'}
                  </span>
                  <span className="text-lg font-title text-blue-600">
                    {summaryData.progress.goal || '$40,000'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${summaryData.progress.percentage || 0}%` }}
                    transition={{ duration: 2, delay: 0.5 }}
                  />
                </div>
                {summaryData.progress.message && (
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-xs text-blue-600 font-body bg-blue-100 px-2 py-1 rounded-full">
                      {summaryData.progress.message}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Additional Content Slot */}
        {summaryData?.additionalContent && (
          <div className="mt-6">
            {summaryData.additionalContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;