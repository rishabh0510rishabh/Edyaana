import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import KPICard from './components/KPICard';
import AdmissionTrendsChart from './components/AdmissionTrendsChart';
import FeeCollectionChart from './components/FeeCollectionChart';
import HostelOccupancyHeatmap from './components/HostelOccupancyHeatmap';
import ExamResultsChart from './components/ExamResultsChart';
import QuickNavigationTiles from './components/QuickNavigationTiles';
import RecentActivities from './components/RecentActivities';
import Icon from '../../components/AppIcon';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const kpiData = [
    {
      title: 'Total Students',
      value: '2,340',
      trend: 'up',
      trendValue: '+12.5%',
      icon: 'Users',
      color: 'primary',
      description: 'Active enrolled students across all programs'
    },
    {
      title: 'Fees Collected',
      value: '₹1.2M',
      trend: 'up',
      trendValue: '+8.3%',
      icon: 'DollarSign',
      color: 'success',
      description: 'Total fee collection this academic year'
    },
    {
      title: 'Hostel Occupancy',
      value: '85%',
      trend: 'up',
      trendValue: '+5.2%',
      icon: 'Building',
      color: 'accent',
      description: 'Current hostel room occupancy rate'
    },
    {
      title: 'Pending Dues',
      value: '₹125K',
      trend: 'down',
      trendValue: '-15.8%',
      icon: 'AlertCircle',
      color: 'warning',
      description: 'Outstanding fee payments from students'
    },
    {
      title: 'Exam Pass Rate',
      value: '96.2%',
      trend: 'up',
      trendValue: '+2.1%',
      icon: 'Award',
      color: 'success',
      description: 'Overall pass rate for current semester'
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      // This would typically update state with new data
      console.log('Refreshing dashboard data...');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Edyaana</title>
        <meta name="description" content="Comprehensive institutional oversight through data-driven KPI visualization and quick navigation access" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={toggleSidebar} userRole="admin" />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="admin" />
        
        <main className="lg:ml-60 pt-16">
          <div className="p-4 sm:p-6 space-y-6">
            {/* Dashboard Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                  Welcome back! Here's what's happening at your institution today.
                </p>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Icon 
                    name="RefreshCw" 
                    size={16} 
                    className={refreshing ? 'animate-spin' : ''} 
                  />
                  <span className="text-sm">
                    {refreshing ? 'Refreshing...' : 'Refresh Data'}
                  </span>
                </button>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString()}
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {kpiData?.map((kpi, index) => (
                <KPICard
                  key={index}
                  title={kpi?.title}
                  value={kpi?.value}
                  trend={kpi?.trend}
                  trendValue={kpi?.trendValue}
                  icon={kpi?.icon}
                  color={kpi?.color}
                  description={kpi?.description}
                />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AdmissionTrendsChart />
              <FeeCollectionChart />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <HostelOccupancyHeatmap />
              <ExamResultsChart />
            </div>

            {/* Quick Navigation and Activities */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <QuickNavigationTiles />
              </div>
              <div className="xl:col-span-1">
                <RecentActivities />
              </div>
            </div>

            {/* Footer Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">156</div>
                  <div className="text-sm text-muted-foreground">Faculty Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">24</div>
                  <div className="text-sm text-muted-foreground">Departments</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">12,450</div>
                  <div className="text-sm text-muted-foreground">Library Books</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">630</div>
                  <div className="text-sm text-muted-foreground">Hostel Rooms</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;