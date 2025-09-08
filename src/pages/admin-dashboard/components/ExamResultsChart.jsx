import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const ExamResultsChart = () => {
  const examData = [
    { name: 'Distinction (90-100%)', value: 125, percentage: 15.6, color: '#10B981' },
    { name: 'First Class (75-89%)', value: 285, percentage: 35.6, color: '#0D7377' },
    { name: 'Second Class (60-74%)', value: 245, percentage: 30.6, color: '#14FFEC' },
    { name: 'Pass (50-59%)', value: 115, percentage: 14.4, color: '#F59E0B' },
    { name: 'Fail (Below 50%)', value: 30, percentage: 3.8, color: '#EF4444' }
  ];

  const subjectWiseData = [
    { subject: 'Mathematics', passRate: 92, students: 800 },
    { subject: 'Physics', passRate: 88, students: 750 },
    { subject: 'Chemistry', passRate: 85, students: 720 },
    { subject: 'Biology', passRate: 94, students: 680 },
    { subject: 'English', passRate: 96, students: 800 },
    { subject: 'Computer Science', passRate: 89, students: 450 }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{data?.name}</p>
          <p className="text-sm text-muted-foreground">Students: {data?.value}</p>
          <p className="text-sm text-muted-foreground">Percentage: {data?.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            ></div>
            <span className="text-xs text-muted-foreground">{entry?.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Exam Results Distribution</h3>
          <p className="text-sm text-muted-foreground">Academic year 2024 performance analysis</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">96.2%</div>
          <div className="text-xs text-muted-foreground">Overall Pass Rate</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Grade Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={examData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {examData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-wise Performance */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4">Subject-wise Pass Rates</h4>
          <div className="space-y-4">
            {subjectWiseData?.map((subject, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-foreground">{subject?.subject}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{subject?.passRate}%</span>
                    <span className="text-xs text-muted-foreground">({subject?.students} students)</span>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      subject?.passRate >= 95 ? 'bg-success' :
                      subject?.passRate >= 90 ? 'bg-primary' :
                      subject?.passRate >= 85 ? 'bg-accent' :
                      subject?.passRate >= 80 ? 'bg-warning': 'bg-error'
                    }`}
                    style={{ width: `${subject?.passRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-success">125</div>
            <div className="text-xs text-muted-foreground">Distinction</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">285</div>
            <div className="text-xs text-muted-foreground">First Class</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-accent">245</div>
            <div className="text-xs text-muted-foreground">Second Class</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-warning">115</div>
            <div className="text-xs text-muted-foreground">Pass</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsChart;