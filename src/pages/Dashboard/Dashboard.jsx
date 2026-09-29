export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Overview</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Employees', '128', 'text-indigo-600'],
          ['Present Today', '114', 'text-emerald-600'],
          ['Open Positions', '12', 'text-amber-600'],
          ['New Hires', '7', 'text-sky-600'],
        ].map(([label, value, color]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{label}</p>
            <p className={`mt-4 text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">Latest activity</h2>
        <div className="mt-5 space-y-4 text-sm text-slate-600">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span>Payroll processed</span>
            <span className="font-medium text-slate-900">Today</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span>New recruitment shortlist</span>
            <span className="font-medium text-slate-900">Yesterday</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Attendance review</span>
            <span className="font-medium text-slate-900">2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
