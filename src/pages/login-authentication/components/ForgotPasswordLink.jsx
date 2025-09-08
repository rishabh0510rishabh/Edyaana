import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordLink = () => {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleForgotPassword = () => {
    setShowModal(true);
    setIsSuccess(false);
    setEmail('');
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate password reset email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    setEmail('');
    setIsSuccess(false);
  };

  return (
    <>
      {/* Forgot Password Link */}
      <div className="text-center">
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
        >
          Forgot your password?
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Reset Password
                </h3>
                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {!isSuccess ? (
                <>
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6">
                    Enter your email address and we'll send you a link to reset your password.
                  </p>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e?.target?.value)}
                      required
                      disabled={isLoading}
                    />

                    <div className="flex space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={closeModal}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="default"
                        loading={isLoading}
                        disabled={isLoading || !email}
                        iconName="Send"
                        iconPosition="right"
                        className="flex-1"
                      >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  {/* Success Message */}
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="CheckCircle" size={32} className="text-success" />
                    </div>
                    <h4 className="text-lg font-medium text-foreground mb-2">
                      Reset Link Sent!
                    </h4>
                    <p className="text-sm text-muted-foreground mb-6">
                      We've sent a password reset link to <strong>{email}</strong>. 
                      Please check your inbox and follow the instructions.
                    </p>
                    <Button
                      variant="default"
                      onClick={closeModal}
                      fullWidth
                    >
                      Got it
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPasswordLink;