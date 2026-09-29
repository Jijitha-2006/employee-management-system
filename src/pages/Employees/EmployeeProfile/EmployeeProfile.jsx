import {
  MdPerson,
  MdBusinessCenter,
  MdEmail,
  MdPhone,
  MdCalendarToday,
} from 'react-icons/md';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import EmployeeStatus from '../components/EmployeeStatus';

export default function EmployeeProfile({
  employee,
  formData,
  departmentOptions,
  onChange,
  onSave,
  onCancel,
}) {
  if (!employee) return null;

  return (
    <div className="grid gap-4 xl:grid-cols-[1.5fr_0.9fr]">
      {/* Profile Form */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div>
          <div className="flex items-center gap-3">
            <MdPerson className="h-7 w-7 text-slate-800" />

            <h2 className="text-2xl font-bold text-slate-900">
              Employee Profile
            </h2>
          </div>

          <p className="text-sm tracking-[0.2em] text-gray-500">
            View employee details
          </p>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={onChange}
          />

          <Input
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={onChange}
          />

          <Input
            label="Employee ID"
            name="employeeId"
            value={formData.employeeId}
            onChange={onChange}
            readOnly
          />

          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />

          <Input
            as="select"
            label="Department"
            name="department"
            value={formData.department}
            onChange={onChange}
            options={departmentOptions.filter(
              (option) => option !== 'All Departments'
            )}
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={onChange}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={onSave}
          >
            Save
          </Button>
        </div>
      </div>

      {/* Profile Details Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-base font-bold text-indigo-700">
              {employee.name
                .split(' ')
                .slice(0, 2)
                .map((part) => part[0])
                .join('')
                .toUpperCase()}
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900">
                {employee.name}
              </h3>

              <div className="flex items-center gap-2">
                <p className="text-sm text-slate-500">
                  {employee.id}
                </p>

                <EmployeeStatus status={employee.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-slate-700">
          <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex items-center gap-2 font-medium text-slate-500">
              <MdBusinessCenter className="h-5 w-5 text-slate-600" />
              Department
            </span>

            <span className="font-semibold text-slate-900">
              {employee.department}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex items-center gap-2 font-medium text-slate-500">
              <MdPerson className="h-5 w-5 text-slate-600" />
              Designation
            </span>

            <span className="font-semibold text-slate-900">
              {employee.designation}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex items-center gap-2 font-medium text-slate-500">
              <MdEmail className="h-5 w-5 text-slate-600" />
              Email
            </span>

            <span className="break-words font-semibold text-slate-900">
              {employee.email}
            </span>
          </div>

          <div className="flex flex-col gap-1 border-b border-slate-200 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex items-center gap-2 font-medium text-slate-500">
              <MdPhone className="h-5 w-5 text-slate-600" />
              Phone
            </span>

            <span className="font-semibold text-slate-900">
              {employee.phone}
            </span>
          </div>

          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="flex items-center gap-2 font-medium text-slate-500">
              <MdCalendarToday className="h-5 w-5 text-slate-600" />
              Joining Date
            </span>

            <span className="font-semibold text-slate-900">
              {employee.joiningDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}