import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import StaffDashboard from './pages/staff-dashboard';
import ExaminationManagement from './pages/examination-management';
import AdminDashboard from './pages/admin-dashboard';
import FeeManagement from './pages/fee-management';
import LoginAuthentication from './pages/login-authentication';
import StudentDashboard from './pages/student-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LoginAuthentication />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/examination-management" element={<ExaminationManagement />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/fee-management" element={<FeeManagement />} />
        <Route path="/login-authentication" element={<LoginAuthentication />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/reports" element={<AdminDashboard />} />
        <Route path="/settings" element={<AdminDashboard />} />
        <Route path="/help" element={<AdminDashboard />} />
        <Route path="/profile" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;