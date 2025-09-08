import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FeeMetricsCard from './components/FeeMetricsCard';
import FeeFilters from './components/FeeFilters';
import FeeChartsPanel from './components/FeeChartsPanel';
import FeeTable from './components/FeeTable';
import PaymentModal from './components/PaymentModal';
import PaymentHistoryModal from './components/PaymentHistoryModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const FeeManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole] = useState('admin');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  // Mock fee data
  const feeData = [
    {
      id: 1,
      studentName: 'Alice Johnson',
      studentId: 'STU-2024-001',
      program: 'Computer Science',
      semester: 'Fall 2024',
      totalFees: 12000,
      paidAmount: 8500,
      pendingAmount: 3500,
      status: 'partial',
      lastPaymentDate: '2024-08-15',
      lastPaymentAmount: 2500
    },
    {
      id: 2,
      studentName: 'Bob Smith',
      studentId: 'STU-2024-002',
      program: 'Business Administration',
      semester: 'Fall 2024',
      totalFees: 10500,
      paidAmount: 10500,
      pendingAmount: 0,
      status: 'paid',
      lastPaymentDate: '2024-08-20',
      lastPaymentAmount: 3500
    },
    {
      id: 3,
      studentName: 'Carol Davis',
      studentId: 'STU-2024-003',
      program: 'Engineering',
      semester: 'Fall 2024',
      totalFees: 15000,
      paidAmount: 5000,
      pendingAmount: 10000,
      status: 'pending',
      lastPaymentDate: '2024-07-10',
      lastPaymentAmount: 5000
    },
    {
      id: 4,
      studentName: 'David Wilson',
      studentId: 'STU-2024-004',
      program: 'Medicine',
      semester: 'Fall 2024',
      totalFees: 25000,
      paidAmount: 15000,
      pendingAmount: 10000,
      status: 'partial',
      lastPaymentDate: '2024-08-25',
      lastPaymentAmount: 5000
    },
    {
      id: 5,
      studentName: 'Eva Brown',
      studentId: 'STU-2024-005',
      program: 'Liberal Arts',
      semester: 'Fall 2024',
      totalFees: 8000,
      paidAmount: 0,
      pendingAmount: 8000,
      status: 'overdue',
      lastPaymentDate: '2024-06-15',
      lastPaymentAmount: 0
    },
    {
      id: 6,
      studentName: 'Frank Miller',
      studentId: 'STU-2024-006',
      program: 'Computer Science',
      semester: 'Fall 2024',
      totalFees: 12000,
      paidAmount: 12000,
      pendingAmount: 0,
      status: 'paid',
      lastPaymentDate: '2024-09-01',
      lastPaymentAmount: 4000
    },
    {
      id: 7,
      studentName: 'Grace Lee',
      studentId: 'STU-2024-007',
      program: 'Business Administration',
      semester: 'Fall 2024',
      totalFees: 10500,
      paidAmount: 7000,
      pendingAmount: 3500,
      status: 'partial',
      lastPaymentDate: '2024-08-18',
      lastPaymentAmount: 3500
    },
    {
      id: 8,
      studentName: 'Henry Garcia',
      studentId: 'STU-2024-008',
      program: 'Engineering',
      semester: 'Fall 2024',
      totalFees: 15000,
      paidAmount: 0,
      pendingAmount: 15000,
      status: 'pending',
      lastPaymentDate: null,
      lastPaymentAmount: 0
    }
  ];

  // Calculate metrics
  const totalStudents = feeData?.length;
  const totalFeesAmount = feeData?.reduce((sum, student) => sum + student?.totalFees, 0);
  const totalCollected = feeData?.reduce((sum, student) => sum + student?.paidAmount, 0);
  const totalPending = feeData?.reduce((sum, student) => sum + student?.pendingAmount, 0);
  const collectionEfficiency = Math.round((totalCollected / totalFeesAmount) * 100);

  useEffect(() => {
    setFilteredData(feeData);
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...feeData];

    if (filters?.search) {
      filtered = filtered?.filter(student =>
        student?.studentName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
        student?.studentId?.toLowerCase()?.includes(filters?.search?.toLowerCase())
      );
    }

    if (filters?.program) {
      filtered = filtered?.filter(student => 
        student?.program?.toLowerCase()?.replace(/\s+/g, '-') === filters?.program
      );
    }

    if (filters?.status) {
      filtered = filtered?.filter(student => student?.status === filters?.status);
    }

    setFilteredData(filtered);
  };

  const handlePaymentRecord = (student) => {
    setSelectedStudent(student);
    setShowPaymentModal(true);
  };

  const handleViewHistory = (student) => {
    setSelectedStudent(student);
    setShowHistoryModal(true);
  };

  const handleGenerateReceipt = (student) => {
    // Mock receipt generation
    console.log('Generating receipt for:', student?.studentName);
    // In real app, this would trigger receipt generation/download
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log('Payment recorded:', paymentData);
    // In real app, this would update the student's payment record
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} userRole={userRole} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole={userRole} />
      <main className="lg:ml-60 pt-16">
        <div className="p-4 sm:p-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Fee Management</h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive financial oversight and payment processing
              </p>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 mt-4 sm:mt-0">
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Export Report
              </Button>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Record Payment
              </Button>
            </div>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <FeeMetricsCard
              title="Total Students"
              value={totalStudents?.toLocaleString('en-IN')}
              change="+12%"
              changeType="positive"
              icon="Users"
              color="primary"
            />
            <FeeMetricsCard
              title="Total Collected"
              value={`₹${totalCollected?.toLocaleString('en-IN')}`}
              change="+8.5%"
              changeType="positive"
              icon="DollarSign"
              color="success"
            />
            <FeeMetricsCard
              title="Pending Amount"
              value={`₹${totalPending?.toLocaleString('en-IN')}`}
              change="-5.2%"
              changeType="positive"
              icon="Clock"
              color="warning"
            />
            <FeeMetricsCard
              title="Collection Efficiency"
              value={`${collectionEfficiency}%`}
              change="+3.1%"
              changeType="positive"
              icon="TrendingUp"
              color="primary"
            />
          </div>

          {/* Filters */}
          <FeeFilters 
            onFiltersChange={handleFiltersChange}
            totalRecords={filteredData?.length}
          />

          {/* Charts and Table Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Charts Panel */}
            <div className="xl:col-span-1">
              <FeeChartsPanel />
            </div>

            {/* Fee Table */}
            <div className="xl:col-span-2">
              <FeeTable
                data={filteredData}
                onPaymentRecord={handlePaymentRecord}
                onViewHistory={handleViewHistory}
                onGenerateReceipt={handleGenerateReceipt}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Modals */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        student={selectedStudent}
        onPaymentSubmit={handlePaymentSubmit}
      />
      <PaymentHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default FeeManagement;