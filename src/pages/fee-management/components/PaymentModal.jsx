import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PaymentModal = ({ isOpen, onClose, student, onPaymentSubmit }) => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    paymentMethod: '',
    transactionId: '',
    paymentDate: new Date()?.toISOString()?.split('T')?.[0],
    notes: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { value: 'cash', label: 'Cash' },
    { value: 'check', label: 'Check' },
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'bank-transfer', label: 'Bank Transfer' },
    { value: 'online', label: 'Online Payment' }
  ];

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      onPaymentSubmit({
        ...paymentData,
        studentId: student?.id,
        studentName: student?.studentName
      });
      setIsProcessing(false);
      onClose();
      
      // Reset form
      setPaymentData({
        amount: '',
        paymentMethod: '',
        transactionId: '',
        paymentDate: new Date()?.toISOString()?.split('T')?.[0],
        notes: ''
      });
    }, 2000);
  };

  if (!isOpen || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Record Payment</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {student?.studentName} - {student?.studentId}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Student Info */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Program:</span>
              <div className="font-medium text-foreground">{student?.program}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Semester:</span>
              <div className="font-medium text-foreground">{student?.semester}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Total Fees:</span>
              <div className="font-medium text-foreground">₹{student?.totalFees?.toLocaleString('en-IN')}</div>
            </div>
            <div>
              <span className="text-muted-foreground">Pending:</span>
              <div className="font-medium text-error">₹{student?.pendingAmount?.toLocaleString('en-IN')}</div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <Input
            label="Payment Amount"
            type="number"
            placeholder="Enter amount"
            value={paymentData?.amount}
            onChange={(e) => handleInputChange('amount', e?.target?.value)}
            required
            min="0"
            max={student?.pendingAmount}
            description={`Maximum: ₹${student?.pendingAmount?.toLocaleString('en-IN')}`}
          />

          <Select
            label="Payment Method"
            placeholder="Select payment method"
            options={paymentMethods}
            value={paymentData?.paymentMethod}
            onChange={(value) => handleInputChange('paymentMethod', value)}
            required
          />

          <Input
            label="Transaction ID"
            type="text"
            placeholder="Enter transaction reference"
            value={paymentData?.transactionId}
            onChange={(e) => handleInputChange('transactionId', e?.target?.value)}
            description="Optional reference number"
          />

          <Input
            label="Payment Date"
            type="date"
            value={paymentData?.paymentDate}
            onChange={(e) => handleInputChange('paymentDate', e?.target?.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Notes (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="Add any additional notes..."
              value={paymentData?.notes}
              onChange={(e) => handleInputChange('notes', e?.target?.value)}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isProcessing}
              disabled={!paymentData?.amount || !paymentData?.paymentMethod}
            >
              {isProcessing ? 'Processing...' : 'Record Payment'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;