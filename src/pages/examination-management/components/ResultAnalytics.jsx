import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResultAnalytics = ({ analyticsData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const passFailData = [
    { name: 'Mathematics', passed: 85, failed: 15, total: 100 },
    { name: 'Physics', passed: 78, failed: 22, total: 100 },
    { name: 'Chemistry', passed: 82, failed: 18, total: 100 },
    { name: 'Biology', passed: 90, failed: 10, total: 100 },
    { name: 'English', passed: 95, failed: 5, total: 100 },
    { name: 'History', passed: 88, failed: 12, total: 100 }
  ];

  const gradeDistribution = [
    { name: 'A+', value: 25, color: '#10B981' },
    { name: 'A', value: 35, color: '#14FFEC' },
    { name: 'B+', value: 20, color: '#0D7377' },
    { name: 'B', value: 12, color: '#F59E0B' },
    { name: 'C', value: 6, color: '#EF4444' },
    { name: 'F', value: 2, color: '#6B7280' }
  ];

  const performanceTrend = [
    { month: 'Jan', average: 78, passRate: 85 },
    { month: 'Feb', average: 82, passRate: 88 },
    { month: 'Mar', average: 79, passRate: 86 },
    { month: 'Apr', average: 85, passRate: 92 },
    { month: 'May', average: 88, passRate: 94 },
    { month: 'Jun', average: 86, passRate: 91 }
  ];

  const subjectPerformance = [
    { subject: 'Mathematics', avgScore: 78, passRate: 85, students: 120 },
    { subject: 'Physics', avgScore: 75, passRate: 78, students: 115 },
    { subject: 'Chemistry', avgScore: 82, passRate: 82, students: 118 },
    { subject: 'Biology', avgScore: 88, passRate: 90, students: 110 },
    { subject: 'English', avgScore: 92, passRate: 95, students: 125 },
    { subject: 'History', avgScore: 85, passRate: 88, students: 105 }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'subjects', label: 'Subject Analysis', icon: 'BookOpen' },
    { id: 'trends', label: 'Performance Trends', icon: 'TrendingUp' },
    { id: 'grades', label: 'Grade Distribution', icon: 'PieChart' }
  ];

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {entry?.name?.includes('Rate') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Result Analytics</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex items-center space-x-1 mb-6 border-b border-border">
        {tabs?.map(tab => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`
              flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-all duration-200
              ${activeTab === tab?.id
                ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pass/Fail Chart */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Pass/Fail Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={passFailData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--color-muted-foreground)"
                      fontSize={12}
                    />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                    <Tooltip content={renderCustomTooltip} />
                    <Bar dataKey="passed" fill="var(--color-success)" name="Passed" />
                    <Bar dataKey="failed" fill="var(--color-error)" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-success">87.5%</div>
                  <div className="text-sm text-muted-foreground">Overall Pass Rate</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-primary">83.2</div>
                  <div className="text-sm text-muted-foreground">Average Score</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-accent">693</div>
                  <div className="text-sm text-muted-foreground">Total Students</div>
                </div>
                <div className="text-center p-4 bg-card rounded-lg border border-border">
                  <div className="text-2xl font-bold text-warning">24</div>
                  <div className="text-sm text-muted-foreground">Subjects</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'subjects' && (
          <div className="space-y-6">
            {/* Subject Performance Table */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Subject-wise Performance</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Subject</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Students</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Avg Score</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Pass Rate</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjectPerformance?.map((subject, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium text-foreground">{subject?.subject}</td>
                        <td className="py-3 px-4 text-muted-foreground">{subject?.students}</td>
                        <td className="py-3 px-4 text-muted-foreground">{subject?.avgScore}</td>
                        <td className="py-3 px-4">
                          <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${subject?.passRate >= 90 ? 'bg-success/10 text-success' :
                              subject?.passRate >= 80 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
                            }
                          `}>
                            {subject?.passRate}%
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${subject?.passRate}%` }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Performance Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="month" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                  />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
                  <Tooltip content={renderCustomTooltip} />
                  <Area 
                    type="monotone" 
                    dataKey="average" 
                    stroke="var(--color-primary)" 
                    fill="var(--color-primary)" 
                    fillOpacity={0.1}
                    name="Average Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="passRate" 
                    stroke="var(--color-success)" 
                    strokeWidth={2}
                    name="Pass Rate"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'grades' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grade Distribution Pie Chart */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Grade Distribution</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {gradeDistribution?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry?.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grade Statistics */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-lg font-medium text-foreground mb-4">Grade Statistics</h3>
              <div className="space-y-4">
                {gradeDistribution?.map((grade, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: grade?.color }}
                      ></div>
                      <span className="font-medium text-foreground">Grade {grade?.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-muted-foreground">{grade?.value}%</span>
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${grade?.value * 4}%`,
                            backgroundColor: grade?.color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultAnalytics;