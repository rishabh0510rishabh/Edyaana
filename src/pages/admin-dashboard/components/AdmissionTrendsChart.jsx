import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const AdmissionTrendsChart = () => {
  const admissionData = [
    { month: "Jan", admissions: 45, applications: 120 },
    { month: "Feb", admissions: 52, applications: 135 },
    { month: "Mar", admissions: 78, applications: 180 },
    { month: "Apr", admissions: 65, applications: 160 },
    { month: "May", admissions: 89, applications: 210 },
    { month: "Jun", admissions: 95, applications: 225 },
    { month: "Jul", admissions: 110, applications: 280 },
    { month: "Aug", admissions: 125, applications: 320 },
    { month: "Sep", admissions: 98, applications: 250 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{`Month: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey === 'admissions' ? 'Admissions' : 'Applications'}: ${entry?.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Admission Trends</h3>
          <p className="text-sm text-muted-foreground">Monthly admissions vs applications</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Admissions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-xs text-muted-foreground">Applications</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={admissionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="admissionsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="applicationsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="applications"
              stroke="var(--color-accent)"
              fillOpacity={1}
              fill="url(#applicationsGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="admissions"
              stroke="var(--color-primary)"
              fillOpacity={1}
              fill="url(#admissionsGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdmissionTrendsChart;