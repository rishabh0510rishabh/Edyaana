import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExamStatistics = ({ statistics, onRefresh }) => {
  const stats = [
    {
      id: 'total-exams',
      title: 'Total Exams',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: 'FileText',
      color: 'primary',
      description: 'Scheduled this semester'
    },
    {
      id: 'completed-exams',
      title: 'Completed Exams',
      value: '89',
      change: '+8',
      changeType: 'increase',
      icon: 'CheckCircle',
      color: 'success',
      description: 'Successfully conducted'
    },
    {
      id: 'upcoming-exams',
      title: 'Upcoming Exams',
      value: '67',
      change: '+4',
      changeType: 'increase',
      icon: 'Clock',
      color: 'warning',
      description: 'Next 30 days'
    },
    {
      id: 'pass-rate',
      title: 'Overall Pass Rate',
      value: '87.5%',
      change: '+2.3%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'accent',
      description: 'Current semester'
    },
    {
      id: 'average-score',
      title: 'Average Score',
      value: '83.2',
      change: '+1.8',
      changeType: 'increase',
      icon: 'BarChart3',
      color: 'secondary',
      description: 'Out of 100'
    },
    {
      id: 'students-enrolled',
      title: 'Students Enrolled',
      value: '2,847',
      change: '+156',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary',
      description: 'Active students'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'text-primary'
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        icon: 'text-success'
      },
      warning: {
        bg: 'bg-warning/10',
        text: 'text-warning',
        icon: 'text-warning'
      },
      accent: {
        bg: 'bg-accent/10',
        text: 'text-accent',
        icon: 'text-accent'
      },
      secondary: {
        bg: 'bg-secondary/10',
        text: 'text-secondary',
        icon: 'text-secondary'
      }
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  const recentActivities = [
    {
      id: 1,
      type: 'exam_scheduled',
      title: 'Mathematics Final Exam Scheduled',
      description: 'Exam scheduled for December 15, 2024 at 10:00 AM',
      timestamp: '2 hours ago',
      icon: 'Calendar',
      color: 'primary'
    },
    {
      id: 2,
      type: 'results_published',
      title: 'Physics Midterm Results Published',
      description: 'Results for 120 students have been published',
      timestamp: '4 hours ago',
      icon: 'FileCheck',
      color: 'success'
    },
    {
      id: 3,
      type: 'exam_completed',
      title: 'Chemistry Lab Practical Completed',
      description: 'All 85 students successfully completed the practical',
      timestamp: '1 day ago',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 4,
      type: 'exam_rescheduled',
      title: 'Biology Exam Rescheduled',
      description: 'Moved from Dec 10 to Dec 12 due to venue conflict',
      timestamp: '2 days ago',
      icon: 'Clock',
      color: 'warning'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats?.map((stat) => {
          const colors = getColorClasses(stat?.color);
          return (
            <div
              key={stat?.id}
              className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${colors?.bg} flex items-center justify-center`}>
                  <Icon name={stat?.icon} size={24} className={colors?.icon} />
                </div>
                <div className={`
                  flex items-center space-x-1 text-sm font-medium
                  ${stat?.changeType === 'increase' ? 'text-success' : 'text-error'}
                `}>
                  <Icon 
                    name={stat?.changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                  />
                  <span>{stat?.change}</span>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">{stat?.title}</h3>
                <div className="text-2xl font-bold text-foreground">{stat?.value}</div>
                <p className="text-xs text-muted-foreground">{stat?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {/* Recent Activities */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Activities</h2>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              iconName="RefreshCw"
            >
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
            >
              View All
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {recentActivities?.map((activity) => {
            const colors = getColorClasses(activity?.color);
            return (
              <div
                key={activity?.id}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className={`w-10 h-10 rounded-lg ${colors?.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={activity?.icon} size={18} className={colors?.icon} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-foreground mb-1">
                    {activity?.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {activity?.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
              </div>
            );
          })}
        </div>

        {/* View More */}
        <div className="mt-6 pt-4 border-t border-border text-center">
          <Button variant="ghost" size="sm" iconName="ChevronDown">
            Load More Activities
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            iconName="Plus"
          >
            <span className="text-sm font-medium">Schedule Exam</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            iconName="Upload"
          >
            <span className="text-sm font-medium">Import Results</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            iconName="FileText"
          >
            <span className="text-sm font-medium">Generate Report</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2"
            iconName="Settings"
          >
            <span className="text-sm font-medium">Exam Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExamStatistics;