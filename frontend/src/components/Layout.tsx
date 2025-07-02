import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
  badge?: string | number;
}

interface LayoutProps {
  children: React.ReactNode;
  
  // Header props
  headerTitle?: string;
  headerSubtitle?: string;
  showBackButton?: boolean;
  showUserMenu?: boolean;
  headerTransparent?: boolean;
  
  // Footer props
  showFooter?: boolean;
  footerVariant?: 'default' | 'dark';
  
  // Sidebar props
  showSidebar?: boolean;
  sidebarItems?: SidebarItem[];
  activeSidebarItem?: string;
  onSidebarItemClick?: (itemId: string) => void;
  sidebarTitle?: string;
  sidebarSummaryData?: Record<string, any>;
  sidebarWidth?: 'narrow' | 'normal' | 'wide';
  
  // Layout props
  className?: string;
  contentClassName?: string;
  fullHeight?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  
  // Header props
  headerTitle,
  headerSubtitle,
  showBackButton = false,
  showUserMenu = false,
  headerTransparent = false,
  
  // Footer props
  showFooter = true,
  footerVariant = 'default',
  
  // Sidebar props
  showSidebar = false,
  sidebarItems = [],
  activeSidebarItem = '',
  onSidebarItemClick = () => {},
  sidebarTitle,
  sidebarSummaryData,
  sidebarWidth = 'normal',
  
  // Layout props
  className = "",
  contentClassName = "",
  fullHeight = false
}) => {
  const layoutClasses = fullHeight 
    ? "min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30" 
    : "bg-gradient-to-br from-gray-50 to-blue-50/30";

  return (
    <div className={`${layoutClasses} ${className}`}>
      {/* Header */}
      <Header
        title={headerTitle}
        subtitle={headerSubtitle}
        showBackButton={showBackButton}
        showUserMenu={showUserMenu}
        isTransparent={headerTransparent}
      />

      {/* Main Content Area */}
      <div className={`${showSidebar ? 'flex' : ''} ${fullHeight ? 'min-h-screen' : ''} pt-16`}>
        {/* Sidebar */}
        {showSidebar && (
          <Sidebar
            items={sidebarItems}
            activeItem={activeSidebarItem}
            onItemClick={onSidebarItemClick}
            title={sidebarTitle}
            summaryData={sidebarSummaryData}
            width={sidebarWidth}
          />
        )}

        {/* Main Content */}
        <main className={`${showSidebar ? 'flex-1' : 'w-full'} ${contentClassName}`}>
          {children}
        </main>
      </div>

      {/* Footer */}
      {showFooter && (
        <Footer variant={footerVariant} />
      )}
    </div>
  );
};

export default Layout;