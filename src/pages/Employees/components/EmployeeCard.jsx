export default function EmployeeCard({ employee }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{employee.name}</h3>
        <p className="text-sm text-slate-500">{employee.designation}</p>
      </div>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>{employee.department}</p>
        <p>{employee.email}</p>
      </div>
    </div>
  );
}
