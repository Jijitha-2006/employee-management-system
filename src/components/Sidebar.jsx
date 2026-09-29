import { NavLink } from 'react-router-dom';
import {
  MdDashboard,
  MdPeople,
  MdDescription,
  MdBarChart,
  MdSettings,
} from 'react-icons/md';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: MdDashboard },
  { label: 'Employees', to: '/employees', icon: MdPeople },
  { label: 'Salary Bills', to: '/bills', icon: MdDescription },
  { label: 'Reports', to: '/reports', icon: MdBarChart },
  { label: 'Settings', to: '/settings', icon: MdSettings },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <div
        className={`fixed left-0 top-[72px] bottom-0 z-30 bg-slate-900/20 transition-opacity duration-200 lg:hidden ${
          isOpen
            ? 'opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
  className={`fixed left-0 top-[72px] bottom-0 z-40 w-[85%] shrink-0 border-r border-slate-200 bg-white text-slate-700 transition-transform duration-300 ease-in-out sm:w-[60%] ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:w-[250px] lg:translate-x-0`}
>
        <div className="flex h-full flex-col">
          <nav className="flex-1 space-y-1 px-3 py-5">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        className={`mr-3 h-5 w-5 ${
                          isActive
                            ? 'text-blue-600'
                            : 'text-slate-500'
                        }`}
                      />

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}