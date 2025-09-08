import React from 'react';
import Icon from '../../../components/AppIcon';

const UpdatesFeed = ({ updates }) => {
  const getUpdateIcon = (type) => {
    switch (type) {
      case 'announcement':
        return 'Megaphone';
      case 'student-status':
        return 'UserCheck';
      case 'system':
        return 'Settings';
      case 'fee':
        return 'CreditCard';
      case 'exam':
        return 'FileText';
      default:
        return 'Bell';
    }
  };

  const getUpdateColor = (type) => {
    switch (type) {
      case 'announcement':
        return 'text-primary bg-primary/10';
      case 'student-status':
        return 'text-success bg-success/10';
      case 'system':
        return 'text-warning bg-warning/10';
      case 'fee':
        return 'text-accent bg-accent/10';
      case 'exam':
        return 'text-secondary bg-secondary/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const updateTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - updateTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Updates</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{updates?.length} updates</span>
            <Icon name="RefreshCw" size={16} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {updates?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No recent updates</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {updates?.map((update) => (
              <div key={update?.id} className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0
                    ${getUpdateColor(update?.type)}
                  `}>
                    <Icon name={getUpdateIcon(update?.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground line-clamp-1">
                        {update?.title}
                      </h4>
                      <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                        {formatTimeAgo(update?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {update?.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {update?.author && (
                          <div className="flex items-center space-x-1">
                            <Icon name="User" size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{update?.author}</span>
                          </div>
                        )}
                        
                        {update?.category && (
                          <div className="flex items-center space-x-1">
                            <Icon name="Tag" size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{update?.category}</span>
                          </div>
                        )}
                      </div>
                      
                      {update?.isNew && (
                        <span className="px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 transition-colors font-medium">
          View All Updates
        </button>
      </div>
    </div>
  );
};

export default UpdatesFeed;