import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, trend, trendValue, icon, color = 'primary', description }) => {
  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              color === 'primary' ? 'bg-primary/10' :
              color === 'success' ? 'bg-success/10' :
              color === 'warning' ? 'bg-warning/10' :
              color === 'accent'? 'bg-accent/10' : 'bg-secondary/10'
            }`}>
              <Icon 
                name={icon} 
                size={24} 
                className={
                  color === 'primary' ? 'text-primary' :
                  color === 'success' ? 'text-success' :
                  color === 'warning' ? 'text-warning' :
                  color === 'accent'? 'text-accent' : 'text-secondary'
                }
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <div className="text-2xl font-bold text-foreground mt-1">{value}</div>
            </div>
          </div>
          
          {description && (
            <p className="text-xs text-muted-foreground mb-3">{description}</p>
          )}
          
          {trendValue && (
            <div className="flex items-center space-x-2">
              <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                <Icon name={getTrendIcon()} size={16} />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;