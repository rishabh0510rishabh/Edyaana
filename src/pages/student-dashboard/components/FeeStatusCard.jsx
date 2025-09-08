import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeeStatusCard = () => {
  const feeData = {
    totalFee: 45000,
    paidAmount: 30000,
    pendingAmount: 15000,
    dueDate: "15-12-2024",
    lastPayment: {
      amount: 15000,
      date: "01-09-2024",
      method: "Online Banking"
    }
  };

  const paymentHistory = [
    { month: "Aug", amount: 15000, status: "paid" },
    { month: "Sep", amount: 15000, status: "paid" },
    { month: "Oct", amount: 0, status: "pending" },
    { month: "Nov", amount: 0, status: "pending" },
    { month: "Dec", amount: 0, status: "pending" }
  ];

  const pieData = [
    { name: 'Paid', value: feeData?.paidAmount, color: '#10B981' },
    { name: 'Pending', value: feeData?.pendingAmount, color: '#F59E0B' }
  ];

  const paymentPercentage = (feeData?.paidAmount / feeData?.totalFee) * 100;

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Fee Payment Status</h3>
        <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
          Receipt
        </Button>
      </div>
      {/* Fee Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Payment Progress</span>
            <span className="text-sm font-medium text-foreground">{paymentPercentage?.toFixed(0)}%</span>
          </div>
          
          <div className="w-full bg-muted rounded-full h-3">
            <div 
              className="bg-success h-3 rounded-full transition-all duration-500"
              style={{ width: `${paymentPercentage}%` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">₹{feeData?.totalFee?.toLocaleString('en-IN')}</div>
              <div className="text-xs text-muted-foreground">Total Fee</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-success">₹{feeData?.paidAmount?.toLocaleString('en-IN')}</div>
              <div className="text-xs text-muted-foreground">Paid</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-warning">₹{feeData?.pendingAmount?.toLocaleString('en-IN')}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>

          {/* Due Date Alert */}
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mt-4">
            <div className="flex items-center space-x-3">
              <Icon name="Clock" size={20} className="text-warning" />
              <div>
                <div className="text-sm font-medium text-foreground">Next Payment Due</div>
                <div className="text-sm text-muted-foreground">{feeData?.dueDate}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="flex items-center justify-center">
          <div className="w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value?.toLocaleString('en-IN')}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Payment History */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-4">Payment History</h4>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={paymentHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => [`₹${value?.toLocaleString('en-IN')}`, 'Amount']} />
              <Bar 
                dataKey="amount" 
                fill="#10B981"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Last Payment Info */}
      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Last Payment</div>
            <div className="text-sm text-muted-foreground">
              ₹{feeData?.lastPayment?.amount?.toLocaleString('en-IN')} • {feeData?.lastPayment?.date} • {feeData?.lastPayment?.method}
            </div>
          </div>
          <Button variant="default" size="sm">
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeeStatusCard;