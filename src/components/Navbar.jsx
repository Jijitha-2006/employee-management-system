import { useState } from "react";

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4"
    >
      <path
        d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M10 21a2 2 0 0 0 4 0" strokeLinecap="round" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M20 21a8 8 0 0 0-16 0" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MenuIcon({ isOpen }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      {isOpen ? (
        <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7H20" strokeLinecap="round" />
          <path d="M4 12H20" strokeLinecap="round" />
          <path d="M4 17H20" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function Navbar({ onMenuToggle, isSidebarOpen }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[72px] w-full border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex h-full items-center justify-between gap-3">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 lg:hidden"
        >
          <MenuIcon isOpen={isSidebarOpen} />
        </button>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">

          {/* Notification */}
          <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
            <BellIcon />
          </button>

          {/* Profile */}
          <div className="relative w-auto">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 shadow-sm transition hover:border-slate-300 sm:h-auto sm:gap-3 sm:py-1.5"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 sm:h-9 sm:w-9">
                AD
              </div>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-900">
                  Admin
                </p>
                <p className="text-xs text-slate-500">
                  HR Manager
                </p>
              </div>

              <div className="hidden text-slate-400 sm:block">
                <UserIcon />
              </div>
            </button>

            {/* Profile Dropdown */}
            {profileOpen && (
              <div
                className="
                  absolute right-0 top-12
                  w-40
                  rounded-xl
                  border border-slate-200
                  bg-white
                  p-2
                  shadow-lg
                  sm:top-14 sm:w-full
                "
              >
                <div className="border-b border-slate-100 px-3 py-2">
                  <p className="text-sm font-semibold text-slate-900">
                    Admin
                  </p>
                  <p className="text-xs text-slate-500">
                    HR Manager
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => console.log("Logout clicked")}
                  className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}