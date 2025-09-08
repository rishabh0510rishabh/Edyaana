import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CredentialsHelper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const credentials = [
    {
      role: 'Administrator',
      email: 'admin@eduflow.com',
      password: 'admin123',
      icon: 'Shield',
      color: 'text-primary'
    },
    {
      role: 'Staff Member',
      email: 'staff@eduflow.com',
      password: 'staff123',
      icon: 'Users',
      color: 'text-secondary'
    },
    {
      role: 'Student',
      email: 'student@eduflow.com',
      password: 'student123',
      icon: 'User',
      color: 'text-accent'
    }
  ];

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsExpanded(!isExpanded)}
        iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
        iconPosition="right"
        className="w-full text-muted-foreground hover:text-foreground"
      >
        Demo Credentials
      </Button>
      {isExpanded && (
        <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-3 text-center">
            Use these credentials to explore different user roles
          </p>
          
          <div className="space-y-3">
            {credentials?.map((cred, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-card rounded border border-border/50">
                <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${cred?.color}`}>
                  <Icon name={cred?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground">{cred?.role}</p>
                  <p className="text-xs text-muted-foreground font-mono">{cred?.email}</p>
                  <p className="text-xs text-muted-foreground font-mono">{cred?.password}</p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`${cred?.email}\n${cred?.password}`);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  title="Copy credentials"
                >
                  <Icon name="Copy" size={14} />
                </button>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Click copy icon to copy credentials to clipboard
          </p>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;