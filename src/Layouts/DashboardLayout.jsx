import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen overflow-visible bg-gradient-to-br from-[#E5EFFF] via-[#D7EEFF] to-[#E8F1FA] text-slate-900">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="min-h-screen overflow-visible lg:pl-[250px]">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          onMenuToggle={() => setIsSidebarOpen((prev) => !prev)}
        />

        <main className="mt-[72px] min-h-[calc(100vh-72px)] overflow-x-hidden overflow-y-visible p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
