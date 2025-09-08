import React from 'react';
import Icon from '../../../components/AppIcon';

const StaffMetrics = ({ metrics }) => {
  const getMetricIcon = (type) => {
    switch (type) {
      case 'completed':
        return 'CheckCircle2';
      case 'pending':
        return 'Clock';
      case 'activity':
        return 'Activity';
      case 'students':
        return 'Users';
      default:
        return 'BarChart3';
    }
  };

  const getMetricColor = (type) => {
    switch (type) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'activity':
        return 'text-primary bg-primary/10';
      case 'students':
        return 'text-accent bg-accent/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Today's Overview</h3>
      </div>
      <div className="p-4 space-y-4">
        {metrics?.map((metric) => (
          <div key={metric?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${getMetricColor(metric?.type)}
              `}>
                <Icon name={getMetricIcon(metric?.type)} size={20} />
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-foreground">{metric?.label}</h4>
                <p className="text-xs text-muted-foreground">{metric?.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-foreground">{metric?.value}</div>
              {metric?.change && (
                <div className={`
                  text-xs flex items-center space-x-1
                  ${metric?.change?.type === 'increase' ? 'text-success' : 'text-error'}
                `}>
                  <Icon 
                    name={metric?.change?.type === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span>{metric?.change?.value}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default StaffMetrics;