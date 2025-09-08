import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickNavigationTiles = () => {
  const navigate = useNavigate();

  const navigationTiles = [
    {
      title: 'Fee Management',
      description: 'Manage student fees, payments, and financial records',
      icon: 'CreditCard',
      color: 'primary',
      path: '/fee-management',
      stats: '1,245 Active'
    },
    {
      title: 'Examination Management',
      description: 'Schedule exams, manage results, and academic records',
      icon: 'FileText',
      color: 'success',
      path: '/examination-management',
      stats: '45 Upcoming'
    },
    {
      title: 'Student Dashboard',
      description: 'View student portal and academic information',
      icon: 'Users',
      color: 'accent',
      path: '/student-dashboard',
      stats: '2,340 Students'
    },
    {
      title: 'Staff Dashboard',
      description: 'Access staff portal and administrative tools',
      icon: 'UserCheck',
      color: 'warning',
      path: '/staff-dashboard',
      stats: '156 Staff'
    },
    {
      title: 'Admissions',
      description: 'Manage new admissions and application process',
      icon: 'UserPlus',
      color: 'secondary',
      path: '/admissions',
      stats: '89 Pending'
    },
    {
      title: 'Library Management',
      description: 'Manage books, issues, and library operations',
      icon: 'BookOpen',
      color: 'primary',
      path: '/library',
      stats: '12,450 Books'
    },
    {
      title: 'Hostel Management',
      description: 'Room allocation and hostel administration',
      icon: 'Building',
      color: 'success',
      path: '/hostel',
      stats: '85% Occupied'
    },
    {
      title: 'Reports & Analytics',
      description: 'Generate reports and view institutional analytics',
      icon: 'BarChart3',
      color: 'accent',
      path: '/reports',
      stats: '24 Reports'
    }
  ];

  const handleTileClick = (path) => {
    navigate(path);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10 hover:bg-primary/20',
        icon: 'text-primary',
        border: 'border-primary/20 hover:border-primary/30'
      },
      success: {
        bg: 'bg-success/10 hover:bg-success/20',
        icon: 'text-success',
        border: 'border-success/20 hover:border-success/30'
      },
      accent: {
        bg: 'bg-accent/10 hover:bg-accent/20',
        icon: 'text-accent',
        border: 'border-accent/20 hover:border-accent/30'
      },
      warning: {
        bg: 'bg-warning/10 hover:bg-warning/20',
        icon: 'text-warning',
        border: 'border-warning/20 hover:border-warning/30'
      },
      secondary: {
        bg: 'bg-secondary/10 hover:bg-secondary/20',
        icon: 'text-secondary',
        border: 'border-secondary/20 hover:border-secondary/30'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Quick Navigation</h3>
          <p className="text-sm text-muted-foreground">Access all system modules and features</p>
        </div>
        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <Icon name="Grid3X3" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {navigationTiles?.map((tile, index) => {
          const colorClasses = getColorClasses(tile?.color);
          
          return (
            <div
              key={index}
              onClick={() => handleTileClick(tile?.path)}
              className={`
                relative p-4 rounded-lg border cursor-pointer
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${colorClasses?.bg} ${colorClasses?.border}
                group
              `}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClasses?.bg}`}>
                  <Icon 
                    name={tile?.icon} 
                    size={20} 
                    className={`${colorClasses?.icon} group-hover:scale-110 transition-transform duration-200`}
                  />
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">{tile?.stats}</div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground group-hover:text-foreground transition-colors">
                  {tile?.title}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {tile?.description}
                </p>
              </div>
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Icon name="ArrowRight" size={16} className={colorClasses?.icon} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
            Last updated: {new Date()?.toLocaleString()}
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            Customize Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickNavigationTiles;