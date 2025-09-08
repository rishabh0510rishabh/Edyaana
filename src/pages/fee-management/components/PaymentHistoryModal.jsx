import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PaymentHistoryModal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;

  const paymentHistory = [
    {
      id: 1,
      date: '2024-09-01',
      amount: 2500,
      method: 'Credit Card',
      transactionId: 'TXN-2024-001',
      status: 'completed',
      notes: 'Tuition fee payment for Fall 2024'
    },
    {
      id: 2,
      date: '2024-08-15',
      amount: 1200,
      method: 'Bank Transfer',
      transactionId: 'TXN-2024-002',
      status: 'completed',
      notes: 'Lab fee payment'
    },
    {
      id: 3,
      date: '2024-07-20',
      amount: 800,
      method: 'Cash',
      transactionId: 'TXN-2024-003',
      status: 'completed',
      notes: 'Library fee and miscellaneous charges'
    },
    {
      id: 4,
      date: '2024-06-10',
      amount: 3000,
      method: 'Online Payment',
      transactionId: 'TXN-2024-004',
      status: 'completed',
      notes: 'Semester fee payment'
    },
    {
      id: 5,
      date: '2024-05-25',
      amount: 500,
      method: 'Check',
      transactionId: 'TXN-2024-005',
      status: 'pending',
      notes: 'Examination fee'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'completed': { color: 'bg-success text-success-foreground', label: 'Completed' },
      'pending': { color: 'bg-warning text-warning-foreground', label: 'Pending' },
      'failed': { color: 'bg-error text-error-foreground', label: 'Failed' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getMethodIcon = (method) => {
    const methodIcons = {
      'Credit Card': 'CreditCard',
      'Debit Card': 'CreditCard',
      'Bank Transfer': 'Building2',
      'Cash': 'Banknote',
      'Check': 'FileText',
      'Online Payment': 'Globe'
    };

    return methodIcons?.[method] || 'CreditCard';
  };

  const totalPaid = paymentHistory?.filter(payment => payment?.status === 'completed')?.reduce((sum, payment) => sum + payment?.amount, 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Payment History</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {student?.studentName} - {student?.studentId}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="p-6 border-b border-border bg-muted/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-foreground">₹{totalPaid?.toLocaleString('en-IN')}</div>
              <div className="text-sm text-muted-foreground">Total Paid</div>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-error">₹{student?.pendingAmount?.toLocaleString('en-IN')}</div>
              <div className="text-sm text-muted-foreground">Pending Amount</div>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-foreground">{paymentHistory?.length}</div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="text-2xl font-bold text-success">
                {Math.round((totalPaid / student?.totalFees) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Payment Progress</div>
            </div>
          </div>
        </div>

        {/* Payment History List */}
        <div className="flex-1 overflow-y-auto max-h-96">
          <div className="p-6">
            <div className="space-y-4">
              {paymentHistory?.map((payment) => (
                <div key={payment?.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={getMethodIcon(payment?.method)} size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">₹{payment?.amount?.toLocaleString('en-IN')}</div>
                        <div className="text-sm text-muted-foreground">{payment?.method}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {getStatusBadge(payment?.status)}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Download" size={14} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Date:</span>
                      <div className="font-medium text-foreground">
                        {new Date(payment.date)?.toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Transaction ID:</span>
                      <div className="font-medium text-foreground font-mono">{payment?.transactionId}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Status:</span>
                      <div className="font-medium text-foreground capitalize">{payment?.status}</div>
                    </div>
                  </div>
                  
                  {payment?.notes && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-muted-foreground text-sm">Notes:</span>
                      <div className="text-sm text-foreground mt-1">{payment?.notes}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {paymentHistory?.length} transactions
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export History
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;