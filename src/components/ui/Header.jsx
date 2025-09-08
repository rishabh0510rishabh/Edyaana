import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, userRole = 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: `/${userRole}-dashboard`, 
      icon: 'LayoutDashboard',
      roles: ['admin', 'staff', 'student']
    },
    { 
      label: 'Fee Management', 
      path: '/fee-management', 
      icon: 'CreditCard',
      roles: ['admin', 'staff']
    },
    { 
      label: 'Examinations', 
      path: '/examination-management', 
      icon: 'FileText',
      roles: ['admin', 'staff']
    },
    { 
      label: 'Reports', 
      path: '/reports', 
      icon: 'BarChart3',
      roles: ['admin', 'staff']
    }
  ];

  const moreItems = [
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help & Support', path: '/help', icon: 'HelpCircle' },
    { label: 'Admin Panel', path: '/admin', icon: 'Shield', roles: ['admin'] }
  ];
  
  const notifications = [
    {
        icon: 'CreditCard',
        title: 'Fee Payment Received',
        description: 'Michael Chen paid semester fees.',
        time: '15m ago',
        color: 'text-success'
    },
    {
        icon: 'UserPlus',
        title: 'New Admission Application',
        description: 'Sarah Johnson submitted an application.',
        time: '1h ago',
        color: 'text-primary'
    },
    {
        icon: 'Calendar',
        title: 'Exam Rescheduled',
        description: 'Mathematics final exam has been moved.',
        time: '3h ago',
        color: 'text-warning'
    },
    {
        icon: 'BookOpen',
        title: 'Library Book Overdue',
        description: 'David Kumar has 3 overdue books.',
        time: '1d ago',
        color: 'text-error'
    }
  ];


  const visibleItems = navigationItems?.filter(item => 
    item?.roles?.includes(userRole)
  )?.slice(0, 4);

  const handleNavigation = (path) => {
    navigate(path);
    setShowMoreMenu(false);
    setShowUserMenu(false);
    setShowNotifications(false);
  };

  const handleMenuToggle = (menu) => {
    setShowUserMenu(menu === 'user' ? !showUserMenu : false);
    setShowMoreMenu(menu === 'more' ? !showMoreMenu : false);
    setShowNotifications(menu === 'notifications' ? !showNotifications : false);
  };

  const handleLogout = () => {
    // Clear user authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    
    // Redirect to the login page
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center space-x-4 md:space-x-8">
          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name="Menu" size={20} />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-lg sm:text-xl font-semibold text-foreground">Edyaana</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {visibleItems?.map((item) => (
              <Button
                key={item?.path}
                variant={location?.pathname === item?.path ? "default" : "ghost"}
                size="sm"
                className="h-10 px-4"
                onClick={() => handleNavigation(item?.path)}
              >
                <Icon name={item?.icon} size={16} className="mr-2" />
                {item?.label}
              </Button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="h-10 px-4"
                onClick={() => handleMenuToggle('more')}
              >
                <Icon name="MoreHorizontal" size={16} className="mr-2" />
                More
              </Button>
              
              {showMoreMenu && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-1100">
                  {moreItems?.filter(item => !item?.roles || item?.roles?.includes(userRole))?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="w-full flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} className="mr-3" />
                      {item?.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Section - User Profile */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative h-10 w-10" onClick={() => handleMenuToggle('notifications')}>
              <Icon name="Bell" size={22} />
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-card"></span>
            </Button>
            {showNotifications && (
                <div className="absolute top-full right-0 mt-1 w-80 sm:w-96 bg-popover border border-border rounded-lg shadow-lg z-1100">
                    <div className="p-4 border-b border-border">
                        <h3 className="font-semibold text-popover-foreground">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification, index) => (
                            <div key={index} className="flex items-start p-4 space-x-3 hover:bg-muted transition-smooth">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${notification.color}/10`}>
                                    <Icon name={notification.icon} size={16} className={notification.color} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-popover-foreground">{notification.title}</p>
                                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-2 border-t border-border text-center">
                        <Button variant="link" size="sm" onClick={() => console.log('View all notifications')}>
                            View All Notifications
                        </Button>
                    </div>
                </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              className="flex items-center space-x-2 h-10 px-2 sm:px-3"
              onClick={() => handleMenuToggle('user')}
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground">
                  {userRole === 'admin' ? 'Admin User' : 
                   userRole === 'staff' ? 'Staff Member' : 'Student'}
                </div>
                <div className="text-xs text-muted-foreground capitalize">{userRole}</div>
              </div>
              <Icon name="ChevronDown" size={16} className="hidden md:block" />
            </Button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-1 w-56 bg-popover border border-border rounded-lg shadow-lg py-1 z-1100">
                <div className="px-3 py-2 border-b border-border">
                  <div className="text-sm font-medium text-popover-foreground">
                    {userRole === 'admin' ? 'Administrator' : 
                     userRole === 'staff' ? 'Staff Member' : 'Student'}
                  </div>
                  <div className="text-xs text-muted-foreground">user@edyaana.com</div>
                </div>
                
                <button 
                  onClick={() => handleNavigation('/profile')}
                  className="w-full flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="User" size={16} className="mr-3" />
                  Profile Settings
                </button>
                
                <button 
                  onClick={() => handleNavigation('/settings')}
                  className="w-full flex items-center px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name="Settings" size={16} className="mr-3" />
                  Preferences
                </button>
                
                <div className="border-t border-border mt-1 pt-1">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-3 py-2 text-sm text-error hover:bg-muted transition-smooth"
                  >
                    <Icon name="LogOut" size={16} className="mr-3" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;