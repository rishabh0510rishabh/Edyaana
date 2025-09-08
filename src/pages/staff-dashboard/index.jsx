import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TaskCard from './components/TaskCard';
import UpdatesFeed from './components/UpdatesFeed';
import QuickAccessTile from './components/QuickAccessTile';
import StaffMetrics from './components/StaffMetrics';
import TaskModal from './components/TaskModal';

const StaffDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [metrics, setMetrics] = useState([]);

  // Mock data initialization
  useEffect(() => {
    const mockTasks = [
      {
        id: 1,
        title: "Review Student Admission Applications",
        description: "Review and process 15 new admission applications for the upcoming semester. Verify documents and conduct initial screening.",
        priority: "high",
        status: "pending",
        dueDate: "2025-01-10",
        assignedBy: "Dr. Sarah Johnson",
        category: "Admissions",
        progress: 0,
        createdAt: "2025-01-07",
        notes: "Priority applications from international students need special attention for visa documentation.",
        attachments: [
          { name: "admission_guidelines.pdf", size: "2.3 MB" },
          { name: "checklist.docx", size: "156 KB" }
        ]
      },
      {
        id: 2,
        title: "Update Fee Collection Records",
        description: "Update payment status for 45 students and generate pending fee reports for the finance department.",
        priority: "medium",
        status: "in-progress",
        dueDate: "2025-01-08",
        assignedBy: "Mr. Robert Chen",
        category: "Finance",
        progress: 65,
        createdAt: "2025-01-05",
        notes: "Focus on semester fee payments and hostel dues."
      },
      {
        id: 3,
        title: "Prepare Exam Schedule Draft",
        description: "Create preliminary exam schedule for mid-semester examinations across all departments.",
        priority: "medium",
        status: "pending",
        dueDate: "2025-01-12",
        assignedBy: "Prof. Maria Garcia",
        category: "Examinations",
        progress: 0,
        createdAt: "2025-01-06"
      },
      {
        id: 4,
        title: "Student Record Verification",
        description: "Verify and update academic records for 28 students before transcript generation.",
        priority: "low",
        status: "completed",
        dueDate: "2025-01-06",
        assignedBy: "Ms. Lisa Wong",
        category: "Records",
        progress: 100,
        createdAt: "2025-01-03"
      },
      {
        id: 5,
        title: "Hostel Room Allocation Review",
        description: "Review current hostel occupancy and prepare room allocation plan for new admissions.",
        priority: "high",
        status: "in-progress",
        dueDate: "2025-01-09",
        assignedBy: "Mr. David Kumar",
        category: "Hostel",
        progress: 40,
        createdAt: "2025-01-04"
      }
    ];

    const mockUpdates = [
      {
        id: 1,
        type: "announcement",
        title: "New Academic Calendar Released",
        description: "The academic calendar for the upcoming semester has been published. Please review the important dates and deadlines.",
        author: "Academic Office",
        category: "Academic",
        timestamp: new Date(Date.now() - 300000),
        isNew: true
      },
      {
        id: 2,
        type: "student-status",
        title: "Student Admission Status Updated",
        description: "12 new students have been admitted to the Computer Science program. Please prepare their orientation materials.",
        author: "Admissions Team",
        category: "Admissions",
        timestamp: new Date(Date.now() - 900000),
        isNew: true
      },
      {
        id: 3,
        type: "fee",
        title: "Fee Payment Deadline Extended",
        description: "The fee payment deadline has been extended by one week due to technical issues with the payment gateway.",
        author: "Finance Department",
        category: "Finance",
        timestamp: new Date(Date.now() - 1800000),
        isNew: false
      },
      {
        id: 4,
        type: "system",
        title: "System Maintenance Scheduled",
        description: "The ERP system will undergo maintenance on January 10th from 2:00 AM to 4:00 AM. Please plan accordingly.",
        author: "IT Department",
        category: "System",
        timestamp: new Date(Date.now() - 3600000),
        isNew: false
      },
      {
        id: 5,
        type: "exam",
        title: "Exam Hall Booking Available",
        description: "Exam hall booking system is now open for mid-semester examinations. Please book required halls by January 15th.",
        author: "Exam Controller",
        category: "Examinations",
        timestamp: new Date(Date.now() - 7200000),
        isNew: false
      }
    ];

    const mockMetrics = [
      {
        id: 1,
        type: "completed",
        label: "Tasks Completed",
        description: "Today\'s completed tasks",
        value: "8",
        change: { type: "increase", value: "+2 from yesterday" }
      },
      {
        id: 2,
        type: "pending",
        label: "Pending Approvals",
        description: "Awaiting your approval",
        value: "12",
        change: { type: "decrease", value: "-3 from yesterday" }
      },
      {
        id: 3,
        type: "students",
        label: "Students Processed",
        description: "Records updated today",
        value: "45",
        change: { type: "increase", value: "+15 from yesterday" }
      },
      {
        id: 4,
        type: "activity",
        label: "Recent Activities",
        description: "Actions performed today",
        value: "23",
        change: { type: "increase", value: "+5 from yesterday" }
      }
    ];

    setTasks(mockTasks);
    setUpdates(mockUpdates);
    setMetrics(mockMetrics);
  }, []);

  const quickAccessTiles = [
    {
      id: 1,
      title: "Admission Processing",
      description: "Process new student applications and manage admission workflow",
      icon: "UserPlus",
      color: "bg-primary",
      path: "/admission-management",
      badge: { type: "count", text: "15 pending" }
    },
    {
      id: 2,
      title: "Fee Collection",
      description: "Manage student fee payments and generate collection reports",
      icon: "CreditCard",
      color: "bg-success",
      path: "/fee-management",
      badge: { type: "count", text: "23 due" }
    },
    {
      id: 3,
      title: "Student Records",
      description: "Update and maintain comprehensive student academic records",
      icon: "FileText",
      color: "bg-warning",
      action: () => console.log("Opening student records"),
      badge: { type: "status", text: "Updated" }
    },
    {
      id: 4,
      title: "Examination Management",
      description: "Schedule exams, manage results and generate reports",
      icon: "BookOpen",
      color: "bg-accent",
      path: "/examination-management"
    },
    {
      id: 5,
      title: "Hostel Management",
      description: "Manage room allocations and hostel administration",
      icon: "Building",
      color: "bg-secondary",
      action: () => console.log("Opening hostel management")
    },
    {
      id: 6,
      title: "Library Operations",
      description: "Handle book issues, returns and library administration",
      icon: "BookMarked",
      color: "bg-primary",
      action: () => console.log("Opening library operations")
    }
  ];

  const handleToggleTask = (taskId) => {
    setTasks(prevTasks =>
      prevTasks?.map(task =>
        task?.id === taskId
          ? {
              ...task,
              status: task?.status === 'completed' ? 'pending' : 'completed',
              progress: task?.status === 'completed' ? 0 : 100
            }
          : task
      )
    );
  };

  const handleViewTaskDetails = (task) => {
    setSelectedTask(task);
    setTaskModalOpen(true);
  };

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks?.map(task =>
        task?.id === taskId
          ? {
              ...task,
              status: newStatus,
              progress: newStatus === 'completed' ? 100 : newStatus === 'in-progress' ? 50 : 0
            }
          : task
      )
    );
    setTaskModalOpen(false);
  };

  const handleAssignTask = (task) => {
    console.log("Reassigning task:", task);
    setTaskModalOpen(false);
  };

  const pendingTasks = tasks?.filter(task => task?.status !== 'completed');
  const completedTasks = tasks?.filter(task => task?.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} userRole="staff" />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userRole="staff" />
      <main className="lg:ml-60 pt-16">
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-primary-foreground">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, Staff Member!</h1>
                <p className="text-primary-foreground/90">
                  You have {pendingTasks?.length} pending tasks and {updates?.filter(u => u?.isNew)?.length} new updates today.
                </p>
              </div>
              <div className="hidden md:block">
                <Icon name="Briefcase" size={48} className="text-primary-foreground/20" />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Tasks Section */}
            <div className="xl:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Assigned Tasks</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {pendingTasks?.length} pending
                      </span>
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Add Task
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
                  {pendingTasks?.length === 0 ? (
                    <div className="text-center py-8">
                      <Icon name="CheckCircle2" size={48} className="text-success mx-auto mb-4" />
                      <p className="text-muted-foreground">All tasks completed! Great job!</p>
                    </div>
                  ) : (
                    pendingTasks?.map((task) => (
                      <TaskCard
                        key={task?.id}
                        task={task}
                        onToggleComplete={handleToggleTask}
                        onViewDetails={handleViewTaskDetails}
                      />
                    ))
                  )}
                </div>
                
                {completedTasks?.length > 0 && (
                  <div className="border-t border-border">
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Completed Today ({completedTasks?.length})
                      </h3>
                      <div className="space-y-2">
                        {completedTasks?.slice(0, 3)?.map((task) => (
                          <TaskCard
                            key={task?.id}
                            task={task}
                            onToggleComplete={handleToggleTask}
                            onViewDetails={handleViewTaskDetails}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Updates and Metrics */}
            <div className="xl:col-span-2 space-y-6">
              <UpdatesFeed updates={updates} />
              <StaffMetrics metrics={metrics} />
            </div>
          </div>

          {/* Quick Access Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={16} className="mr-2" />
                Customize
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {quickAccessTiles?.map((tile) => (
                <QuickAccessTile key={tile?.id} tile={tile} />
              ))}
            </div>
          </div>

          {/* Recent Activity Summary */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Today's Activity Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">8</div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-success mb-1">45</div>
                <div className="text-sm text-muted-foreground">Students Processed</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-warning mb-1">12</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-accent mb-1">23</div>
                <div className="text-sm text-muted-foreground">Activities Logged</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Task Modal */}
      <TaskModal
        task={selectedTask}
        isOpen={taskModalOpen}
        onClose={() => setTaskModalOpen(false)}
        onUpdateStatus={handleUpdateTaskStatus}
        onAssignTask={handleAssignTask}
      />
    </div>
  );
};

export default StaffDashboard;