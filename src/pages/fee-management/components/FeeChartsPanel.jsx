import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeeChartsPanel = () => {
  const [activeChart, setActiveChart] = useState('collection');

  const collectionData = [
    { month: 'Jan', collected: 45000, pending: 12000 },
    { month: 'Feb', collected: 52000, pending: 8000 },
    { month: 'Mar', collected: 48000, pending: 15000 },
    { month: 'Apr', collected: 61000, pending: 9000 },
    { month: 'May', collected: 55000, pending: 11000 },
    { month: 'Jun', collected: 67000, pending: 7000 },
    { month: 'Jul', collected: 59000, pending: 13000 },
    { month: 'Aug', collected: 71000, pending: 6000 },
    { month: 'Sep', collected: 63000, pending: 10000 }
  ];

  const statusData = [
    { name: 'Fully Paid', value: 65, color: '#10B981' },
    { name: 'Partially Paid', value: 20, color: '#F59E0B' },
    { name: 'Pending', value: 10, color: '#EF4444' },
    { name: 'Overdue', value: 5, color: '#8B5CF6' }
  ];

  const trendData = [
    { month: 'Jan', efficiency: 78 },
    { month: 'Feb', efficiency: 85 },
    { month: 'Mar', efficiency: 76 },
    { month: 'Apr', efficiency: 87 },
    { month: 'May', efficiency: 83 },
    { month: 'Jun', efficiency: 91 },
    { month: 'Jul', efficiency: 82 },
    { month: 'Aug', efficiency: 92 },
    { month: 'Sep', efficiency: 86 }
  ];

  const chartTabs = [
    { id: 'collection', label: 'Collection vs Pending', icon: 'BarChart3' },
    { id: 'status', label: 'Payment Status', icon: 'PieChart' },
    { id: 'trend', label: 'Collection Efficiency', icon: 'TrendingUp' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: ${entry?.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'collection':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={collectionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="collected" fill="#0D7377" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'status':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'trend':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#666666" />
              <YAxis stroke="#666666" />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Efficiency']}
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#0D7377" 
                strokeWidth={3}
                dot={{ fill: '#0D7377', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: '#0D7377', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Fee Analytics</h3>
        </div>
        
        <Button variant="ghost" size="sm">
          <Icon name="Download" size={16} className="mr-2" />
          Export
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {chartTabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveChart(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-t-lg border-b-2 transition-all duration-200
              ${activeChart === tab?.id
                ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="text-sm font-medium">{tab?.label}</span>
          </button>
        ))}
      </div>
      <div className="min-h-[300px]">
        {renderChart()}
      </div>
      {activeChart === 'status' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {statusData?.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item?.color }}
              />
              <div>
                <div className="text-sm font-medium text-foreground">{item?.value}%</div>
                <div className="text-xs text-muted-foreground">{item?.name}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeeChartsPanel;