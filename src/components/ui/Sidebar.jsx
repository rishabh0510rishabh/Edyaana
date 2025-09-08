import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = true, onClose, userRole = 'admin' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({});

  const navigationItems = [
    {
      section: 'Main',
      items: [
        { 
          label: 'Dashboard', 
          path: `/${userRole}-dashboard`, 
          icon: 'LayoutDashboard',
          roles: ['admin', 'staff', 'student']
        }
      ]
    },
    {
      section: 'Academic Management',
      items: [
        { 
          label: 'Fee Management', 
          path: '/fee-management', 
          icon: 'CreditCard',
          roles: ['admin', 'staff'],
          description: 'Manage student fees and payments'
        },
        { 
          label: 'Examination Management', 
          path: '/examination-management', 
          icon: 'FileText',
          roles: ['admin', 'staff'],
          description: 'Schedule exams and manage results'
        }
      ]
    },
    {
      section: 'System',
      items: [
        { 
          label: 'Settings', 
          path: '/settings', 
          icon: 'Settings',
          roles: ['admin', 'staff']
        },
        { 
          label: 'Help & Support', 
          path: '/help', 
          icon: 'HelpCircle',
          roles: ['admin', 'staff', 'student']
        }
      ]
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      onClose?.();
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/login-authentication');
  };

  const filteredSections = navigationItems?.map(section => ({
    ...section,
    items: section?.items?.filter(item => item?.roles?.includes(userRole))
  }))?.filter(section => section?.items?.length > 0);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-1050 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-60 bg-card border-r border-border z-1100
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:fixed
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <div>
                <div className="text-lg font-semibold text-foreground">Edyaana</div>
                <div className="text-xs text-muted-foreground">Education Management</div>
              </div>
            </div>
            
            {/* Close button for mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {userRole === 'admin' ? 'Administrator' : 
                   userRole === 'staff' ? 'Staff Member' : 'Student User'}
                </div>
                <div className="text-xs text-muted-foreground capitalize">{userRole} Account</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {filteredSections?.map((section) => (
              <div key={section?.section}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section?.section}
                  </h3>
                  {section?.items?.length > 3 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-4 h-4"
                      onClick={() => toggleSection(section?.section)}
                    >
                      <Icon 
                        name={expandedSections?.[section?.section] ? "ChevronUp" : "ChevronDown"} 
                        size={12} 
                      />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-1">
                  {section?.items?.slice(0, expandedSections?.[section?.section] ? undefined : 3)?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left
                        transition-all duration-150 ease-out group
                        ${location?.pathname === item?.path
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                        }
                      `}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`
                          ${location?.pathname === item?.path 
                            ? 'text-primary-foreground' 
                            : 'text-muted-foreground group-hover:text-foreground'
                          }
                        `}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item?.label}</div>
                        {item?.description && (
                          <div className={`
                            text-xs truncate
                            ${location?.pathname === item?.path
                              ? 'text-primary-foreground/80'
                              : 'text-muted-foreground'
                            }
                          `}>
                            {item?.description}
                          </div>
                        )}
                      </div>
                      
                      {location?.pathname === item?.path && (
                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start h-10"
              onClick={() => handleNavigation('/settings')}
            >
              <Icon name="Settings" size={18} className="mr-3" />
              Settings
            </Button>
            
            <Button
              variant="ghost"
              className="w-full justify-start h-10 text-error hover:text-error hover:bg-error/10"
              onClick={handleLogout}
            >
              <Icon name="LogOut" size={18} className="mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;