import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivities = () => {
  const activities = [
    {
      id: 1,
      type: 'admission',
      title: 'New Admission Application',
      description: 'Sarah Johnson submitted application for Computer Science',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      icon: 'UserPlus',
      color: 'success',
      priority: 'high'
    },
    {
      id: 2,
      type: 'fee',
      title: 'Fee Payment Received',
      description: 'Michael Chen paid semester fees - $2,500',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'CreditCard',
      color: 'primary',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'exam',
      title: 'Exam Schedule Updated',
      description: 'Mathematics final exam rescheduled to Dec 15, 2024',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'Calendar',
      color: 'warning',
      priority: 'medium'
    },
    {
      id: 4,
      type: 'hostel',
      title: 'Room Allocation Request',
      description: 'Emma Wilson requested room change in Block C',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Building',
      color: 'accent',
      priority: 'low'
    },
    {
      id: 5,
      type: 'library',
      title: 'Book Return Overdue',
      description: 'David Kumar has 3 overdue books - Physics Textbook',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'BookOpen',
      color: 'error',
      priority: 'high'
    },
    {
      id: 6,
      type: 'staff',
      title: 'Staff Leave Request',
      description: 'Prof. Anderson requested leave for Dec 20-25',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'UserCheck',
      color: 'secondary',
      priority: 'medium'
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      warning: 'bg-warning/10 text-warning',
      error: 'bg-error/10 text-error',
      accent: 'bg-accent/10 text-accent',
      secondary: 'bg-secondary/10 text-secondary'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const getPriorityIndicator = (priority) => {
    const priorityMap = {
      high: 'w-2 h-2 bg-error rounded-full',
      medium: 'w-2 h-2 bg-warning rounded-full',
      low: 'w-2 h-2 bg-success rounded-full'
    };
    return priorityMap?.[priority] || priorityMap?.medium;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activities</h3>
          <p className="text-sm text-muted-foreground">Latest system activities and notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
          <Icon name="Bell" size={20} className="text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div 
            key={activity?.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 group"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(activity?.color)}`}>
              <Icon name={activity?.icon} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                      {activity?.title}
                    </h4>
                    <div className={getPriorityIndicator(activity?.priority)}></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activity?.description}
                  </p>
                </div>
                <div className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {getTimeAgo(activity?.timestamp)}
                </div>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button className="p-1 hover:bg-muted rounded">
                <Icon name="MoreHorizontal" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-error rounded-full"></div>
              <span className="text-xs text-muted-foreground">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Medium Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Low Priority</span>
            </div>
          </div>
          <button className="text-xs text-primary hover:text-primary/80 transition-colors">
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;