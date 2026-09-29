import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from '../Layouts/DashboardLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import EmployeeList from '../pages/Employees/EmployeeList/EmployeeList';
import Bills from '../pages/Bills/Bills';
import Reports from '../pages/Reports/Reports';
import Settings from '../pages/Settings/Settings';

function LayoutWrapper({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<LayoutWrapper><Dashboard /></LayoutWrapper>} />
      <Route path="/employees" element={<LayoutWrapper><EmployeeList /></LayoutWrapper>} />
      <Route path="/bills" element={<LayoutWrapper><Bills /></LayoutWrapper>} />
      <Route path="/reports" element={<LayoutWrapper><Reports /></LayoutWrapper>} />
      <Route path="/settings" element={<LayoutWrapper><Settings /></LayoutWrapper>} />
    </Routes>
  );
}
