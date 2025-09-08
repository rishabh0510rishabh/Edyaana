import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ExamCalendar from './components/ExamCalendar';
import ExamFilters from './components/ExamFilters';
import ResultAnalytics from './components/ResultAnalytics';
import ExamDetailsModal from './components/ExamDetailsModal';
import ExamStatistics from './components/ExamStatistics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ExaminationManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState('calendar');
  const [selectedExam, setSelectedExam] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [filters, setFilters] = useState({
    semester: 'all',
    subject: 'all',
    examType: 'all',
    dateFrom: '',
    dateTo: '',
    search: '',
    quickFilter: ''
  });

  // Mock exam data
  const mockExams = [
    {
      id: 1,
      subject: 'Mathematics',
      examType: 'final',
      date: '2024-12-15',
      time: '10:00',
      duration: '180',
      venue: 'hall-a',
      semester: 'semester-3',
      totalMarks: '100',
      passingMarks: '40',
      supervisor: 'Dr. John Smith',
      status: 'scheduled',
      instructions: 'Bring calculator and drawing instruments. No mobile phones allowed.'
    },
    {
      id: 2,
      subject: 'Physics',
      examType: 'midterm',
      date: '2024-12-10',
      time: '14:00',
      duration: '120',
      venue: 'hall-b',
      semester: 'semester-2',
      totalMarks: '80',
      passingMarks: '32',
      supervisor: 'Dr. Sarah Johnson',
      status: 'completed',
      instructions: 'Formula sheet will be provided. Show all calculations clearly.'
    },
    {
      id: 3,
      subject: 'Chemistry',
      examType: 'practical',
      date: '2024-12-12',
      time: '09:00',
      duration: '240',
      venue: 'lab-3',
      semester: 'semester-4',
      totalMarks: '50',
      passingMarks: '20',
      supervisor: 'Dr. Michael Brown',
      status: 'scheduled',
      instructions: 'Wear lab coat and safety goggles. Follow all safety protocols.'
    },
    {
      id: 4,
      subject: 'Biology',
      examType: 'quiz',
      date: '2024-12-08',
      time: '11:00',
      duration: '60',
      venue: 'hall-c',
      semester: 'semester-1',
      totalMarks: '25',
      passingMarks: '10',
      supervisor: 'Dr. Emily Davis',
      status: 'completed',
      instructions: 'Multiple choice questions only. Use HB pencil for marking.'
    },
    {
      id: 5,
      subject: 'English',
      examType: 'final',
      date: '2024-12-18',
      time: '10:00',
      duration: '180',
      venue: 'hall-a',
      semester: 'semester-2',
      totalMarks: '100',
      passingMarks: '40',
      supervisor: 'Prof. Robert Wilson',
      status: 'scheduled',
      instructions: 'Essay questions require minimum 300 words. Grammar and spelling will be evaluated.'
    },
    {
      id: 6,
      subject: 'Computer Science',
      examType: 'practical',
      date: '2024-12-14',
      time: '13:00',
      duration: '180',
      venue: 'lab-1',
      semester: 'semester-5',
      totalMarks: '75',
      passingMarks: '30',
      supervisor: 'Dr. Lisa Anderson',
      status: 'scheduled',
      instructions: 'Programming questions in C++ and Java. Save work frequently.'
    }
  ];

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Find exams for selected date
    const dateStr = date?.toISOString()?.split('T')?.[0];
    const dayExams = mockExams?.filter(exam => exam?.date === dateStr);
    if (dayExams?.length > 0) {
      setSelectedExam(dayExams?.[0]);
      setModalMode('view');
      setModalOpen(true);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAddExam = () => {
    setSelectedExam(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditExam = (exam) => {
    setSelectedExam(exam);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleSaveExam = (examData) => {
    console.log('Saving exam:', examData);
    // Mock save functionality
  };

  const handleBulkImport = () => {
    console.log('Opening bulk import dialog');
    // Mock bulk import functionality
  };

  const handleRefreshStats = () => {
    console.log('Refreshing statistics');
    // Mock refresh functionality
  };

  const filteredExams = mockExams?.filter(exam => {
    if (filters?.semester !== 'all' && exam?.semester !== filters?.semester) return false;
    if (filters?.subject !== 'all' && !exam?.subject?.toLowerCase()?.includes(filters?.subject)) return false;
    if (filters?.examType !== 'all' && exam?.examType !== filters?.examType) return false;
    if (filters?.search && !exam?.subject?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    return true;
  });

  const views = [
    { id: 'calendar', label: 'Calendar View', icon: 'Calendar' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'statistics', label: 'Statistics', icon: 'TrendingUp' }
  ];

  useEffect(() => {
    // Set page title
    document.title = 'Examination Management - EduFlow ERP';
  }, []);

  return (
    <>
      <Helmet>
        <title>Examination Management - EduFlow ERP</title>
        <meta name="description" content="Comprehensive examination management system with calendar scheduling, result analytics, and performance tracking for educational institutions." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header onMenuToggle={handleToggleSidebar} userRole="admin" />

        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
          userRole="admin" 
        />

        {/* Main Content */}
        <main className={`
          transition-all duration-300 ease-in-out pt-16
          ${sidebarOpen ? 'lg:ml-60' : 'lg:ml-60'}
        `}>
          <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="FileText" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Examination Management</h1>
                  <p className="text-muted-foreground">
                    Schedule exams, track results, and analyze performance metrics
                  </p>
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                {views?.map(view => (
                  <Button
                    key={view?.id}
                    variant={activeView === view?.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setActiveView(view?.id)}
                    iconName={view?.icon}
                    iconPosition="left"
                  >
                    {view?.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <ExamFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onAddExam={handleAddExam}
              onBulkImport={handleBulkImport}
            />

            {/* Content based on active view */}
            {activeView === 'calendar' && (
              <div className="space-y-6">
                <ExamCalendar
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  exams={filteredExams}
                  filters={filters}
                />

                {/* Selected Date Details */}
                {selectedDate && (
                  <div className="bg-card rounded-lg border border-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">
                        Exams on {selectedDate?.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleAddExam}
                        iconName="Plus"
                      >
                        Add Exam
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredExams?.filter(exam => exam?.date === selectedDate?.toISOString()?.split('T')?.[0])?.map(exam => (
                        <div
                          key={exam?.id}
                          className="p-4 border border-border rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer"
                          onClick={() => {
                            setSelectedExam(exam);
                            setModalMode('view');
                            setModalOpen(true);
                          }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-foreground">{exam?.subject}</h4>
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-medium
                              ${exam?.status === 'scheduled' ? 'bg-warning/10 text-warning' :
                                exam?.status === 'completed' ? 'bg-success/10 text-success' :
                                exam?.status === 'ongoing'? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
                              }
                            `}>
                              {exam?.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-2">
                              <Icon name="Clock" size={14} />
                              <span>{exam?.time} ({exam?.duration} min)</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="MapPin" size={14} />
                              <span>{exam?.venue}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Icon name="User" size={14} />
                              <span>{exam?.supervisor}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredExams?.filter(exam => exam?.date === selectedDate?.toISOString()?.split('T')?.[0])?.length === 0 && (
                      <div className="text-center py-8">
                        <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">No exams scheduled for this date</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleAddExam}
                          iconName="Plus"
                          className="mt-4"
                        >
                          Schedule Exam
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeView === 'analytics' && (
              <ResultAnalytics analyticsData={{}} />
            )}

            {activeView === 'statistics' && (
              <ExamStatistics 
                statistics={{}}
                onRefresh={handleRefreshStats}
              />
            )}
          </div>
        </main>

        {/* Exam Details Modal */}
        <ExamDetailsModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          exam={selectedExam}
          onSave={handleSaveExam}
          mode={modalMode}
        />
      </div>
    </>
  );
};

export default ExaminationManagement;