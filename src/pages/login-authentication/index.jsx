import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import ForgotPasswordLink from './components/ForgotPasswordLink';
import TrustSignals from './components/TrustSignals';
import BrandingSection from './components/BrandingSection';
import CredentialsHelper from './components/CredentialsHelper';

const LoginAuthentication = () => {
  const navigate = useNavigate();

  // This useEffect hook was causing the automatic redirection. It has been removed.
  /*
  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole) {
      navigate(`/${userRole}-dashboard`);
    }
  }, [navigate]);
  */

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      {/* Main Container */}
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          {/* Branding Section */}
          <BrandingSection />

          {/* Login Form */}
          <LoginForm />

          {/* Forgot Password Link */}
          <div className="mt-6">
            <ForgotPasswordLink />
          </div>

          {/* Demo Credentials Helper */}
          <CredentialsHelper />

          {/* Trust Signals */}
          <TrustSignals />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} Edyaana. All rights reserved.
          </p>
          <div className="flex justify-center items-center space-x-4 mt-2">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <span className="text-xs text-muted-foreground">•</span>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <span className="text-xs text-muted-foreground">•</span>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAuthentication;