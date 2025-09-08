import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StudentProfileCard from './components/StudentProfileCard';
import FeeStatusCard from './components/FeeStatusCard';
import AcademicRecordsCard from './components/AcademicRecordsCard';
import LibraryStatusCard from './components/LibraryStatusCard';
import ExamScheduleCard from './components/ExamScheduleCard';
import AnnouncementsCard from './components/AnnouncementsCard';
import QuickActionsCard from './components/QuickActionsCard';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={handleSidebarToggle} userRole="student" />
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={handleSidebarClose} 
        userRole="student" 
      />
      {/* Main Content */}
      <main className="lg:ml-60 pt-16">
        <div className="p-6">
          {/* Welcome Section */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Welcome back, Sarah!</h1>
                <p className="text-muted-foreground mt-2">
                  Here's your academic overview for {currentTime?.toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <div className="text-2xl font-bold text-primary">
                  {currentTime?.toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
                <div className="text-sm text-muted-foreground">Current Time</div>
              </div>
            </div>
          </motion.div>

          {/* Dashboard Grid */}
          <motion.div 
            className="grid grid-cols-1 xl:grid-cols-12 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Column - Main Content */}
            <div className="xl:col-span-8 space-y-6">
              {/* Student Profile */}
              <motion.div variants={itemVariants}>
                <StudentProfileCard />
              </motion.div>

              {/* Fee Status */}
              <motion.div variants={itemVariants}>
                <FeeStatusCard />
              </motion.div>

              {/* Academic Records */}
              <motion.div variants={itemVariants}>
                <AcademicRecordsCard />
              </motion.div>

              {/* Library Status */}
              <motion.div variants={itemVariants}>
                <LibraryStatusCard />
              </motion.div>

              {/* Exam Schedule */}
              <motion.div variants={itemVariants}>
                <ExamScheduleCard />
              </motion.div>
            </div>

            {/* Right Column - Secondary Content */}
            <div className="xl:col-span-4 space-y-6">
              {/* Quick Actions */}
              <motion.div variants={itemVariants}>
                <QuickActionsCard />
              </motion.div>

              {/* Announcements */}
              <motion.div variants={itemVariants}>
                <AnnouncementsCard />
              </motion.div>
            </div>
          </motion.div>

          {/* Footer */}
          <motion.footer 
            className="mt-12 pt-8 border-t border-border text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} Edyaana. All rights reserved. | 
              <span className="ml-2">Student Portal v2.1.0</span>
            </p>
          </motion.footer>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;