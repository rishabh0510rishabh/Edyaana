import React from 'react';
import Icon from '../../../components/AppIcon';

const BrandingSection = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
      </div>

      {/* Brand Name and Tagline */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Edyaana
        </h1>
        <p className="text-lg text-muted-foreground">
          Education Management System
        </p>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Streamline your institution's operations with our comprehensive student management platform
        </p>
      </div>
    </div>
  );
};

export default BrandingSection;