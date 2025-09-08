import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      label: 'SSL Secured',
      description: '256-bit encryption'
    },
    {
      icon: 'Award',
      label: 'Certified',
      description: 'ISO 27001 Compliant'
    },
    {
      icon: 'Lock',
      label: 'Privacy Protected',
      description: 'GDPR Compliant'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground font-medium">
          Trusted by 500+ Educational Institutions
        </p>
      </div>
      <div className="flex justify-center items-center space-x-6">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="flex flex-col items-center group">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
              <Icon 
                name={badge?.icon} 
                size={20} 
                className="text-primary"
              />
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-foreground">
                {badge?.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {badge?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Security Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Your data is protected with enterprise-grade security measures
        </p>
      </div>
    </div>
  );
};

export default TrustSignals;