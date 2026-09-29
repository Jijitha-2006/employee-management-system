import EmployeeActions from '../components/EmployeeActions';
import EmployeeStatus from '../components/EmployeeStatus';
import { MdPerson } from 'react-icons/md';

export default function EmployeeTable({
  employees,
  totalEmployees,
  currentPage,
  totalPages,
  onViewEmployee,
  onPreviousPage,
  onNextPage,
}) {
  return (
    <div className="w-full overflow-y-visible rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
        <div>
          <div className="flex items-center gap-2">
        <MdPerson className="h-7 w-7 text-slate-800" />
          <h2 className="text-xl font-semibold text-slate-900">
            Employee List
          </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Total Employees: {totalEmployees}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto overflow-y-visible">
        <table className="min-w-[940px] w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {[
                'Employee ID',
                'Employee Name',
                'Email',
                'Phone',
                'Department',
                'Designation',
                'Joining Date',
                'Status',
                'Actions',
              ].map((heading) => (
                <th
                  key={heading}
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200">
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700">
                  {employee.id}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-slate-900">
                  {employee.name}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {employee.email}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {employee.phone}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {employee.department}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {employee.designation}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {employee.joiningDate}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <EmployeeStatus status={employee.status} />
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <EmployeeActions
                    employee={employee}
                    onView={onViewEmployee}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={onPreviousPage}
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm text-slate-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            onClick={onNextPage}
            disabled={currentPage === totalPages}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
}
