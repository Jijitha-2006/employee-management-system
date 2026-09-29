const statusClasses = {
  Active: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  'On Leave': 'bg-amber-100 text-amber-700 ring-amber-200',
  Inactive: 'bg-slate-200 text-slate-700 ring-slate-300',
};

export default function EmployeeStatus({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${statusClasses[status] || statusClasses.Inactive}`}
    >
      {status}
    </span>
  );
}
