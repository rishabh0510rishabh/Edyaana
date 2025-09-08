import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FeeCollectionChart = () => {
  const feeData = [
    { month: "Jan", collected: 85000, pending: 15000, total: 100000 },
    { month: "Feb", collected: 92000, pending: 18000, total: 110000 },
    { month: "Mar", collected: 78000, pending: 22000, total: 100000 },
    { month: "Apr", collected: 105000, pending: 12000, total: 117000 },
    { month: "May", collected: 98000, pending: 25000, total: 123000 },
    { month: "Jun", collected: 115000, pending: 8000, total: 123000 },
    { month: "Jul", collected: 125000, pending: 15000, total: 140000 },
    { month: "Aug", collected: 132000, pending: 18000, total: 150000 },
    { month: "Sep", collected: 128000, pending: 22000, total: 150000 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{`${label} 2024`}</p>
          <div className="space-y-1">
            <p className="text-sm text-success">
              Collected: ₹{data?.collected?.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-warning">
              Pending: ₹{data?.pending?.toLocaleString('en-IN')}
            </p>
            <p className="text-sm text-foreground font-medium">
              Total: ₹{data?.total?.toLocaleString('en-IN')}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Collection Rate: {((data?.collected / data?.total) * 100)?.toFixed(1)}%
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Fee Collection Analysis</h3>
          <p className="text-sm text-muted-foreground">Monthly collected vs pending fees</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-xs text-muted-foreground">Collected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground">Pending</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={feeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="collected" 
              fill="var(--color-success)" 
              radius={[0, 0, 4, 4]}
              name="Collected"
            />
            <Bar 
              dataKey="pending" 
              fill="var(--color-warning)" 
              radius={[4, 4, 0, 0]}
              name="Pending"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeeCollectionChart;