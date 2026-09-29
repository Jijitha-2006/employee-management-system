import { useEffect, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import initialEmployees, {
  departmentOptions,
  generateEmployeeId,
  saveEmployees,
  statusOptions,
} from '../../../data/employees';
import EmployeeForm from '../AddEmployee/EmployeeForm';
import EmployeeProfile from '../EmployeeProfile/EmployeeProfile';
import EmployeeTable from './EmployeeTable';

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  department: 'Engineering',
  designation: '',
  dateOfJoining: '',
  address: '',
  status: 'Active',
};

const getSelectedFormData = (employee) => ({
  name: employee?.name ?? '',
  designation: employee?.designation ?? '',
  employeeId: employee?.id ?? '',
  email: employee?.email ?? '',
  department: employee?.department ?? 'Engineering',
  phone: employee?.phone ?? '',
});

export default function EmployeeList() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(
    initialEmployees[0]?.id ?? '',
  );

  const [selectedFormData, setSelectedFormData] = useState(() =>
    getSelectedFormData(initialEmployees[0] ?? null),
  );

  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Selected employee
  const selectedEmployee = useMemo(
    () =>
      employees.find(
        (employee) => employee.id === selectedEmployeeId,
      ) ??
      employees[0] ??
      null,
    [employees, selectedEmployeeId],
  );

  // Update profile form when selected employee changes
  useEffect(() => {
    setSelectedFormData(getSelectedFormData(selectedEmployee));
  }, [selectedEmployee]);

  // Search and filters
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        employee.name.toLowerCase().includes(search) ||
        employee.email.toLowerCase().includes(search) ||
        employee.id.toLowerCase().includes(search);

      const matchesDepartment =
        departmentFilter === 'All Departments' ||
        employee.department === departmentFilter;

      const matchesStatus =
        statusFilter === 'All Statuses' ||
        employee.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });
  }, [employees, searchTerm, departmentFilter, statusFilter]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredEmployees.length / pageSize),
  );

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredEmployees.slice(
      startIndex,
      startIndex + pageSize,
    );
  }, [currentPage, pageSize, filteredEmployees]);

//   const handlePageSizeChange = (event) => {
//     const nextPageSize = Number(event.target.value);

//     setPageSize(nextPageSize);
//     setCurrentPage(1);
//   };

  const handlePreviousPage = () => {
    setCurrentPage((previousPage) =>
      Math.max(1, previousPage - 1),
    );
  };

  const handleNextPage = () => {
    setCurrentPage((previousPage) =>
      Math.min(totalPages, previousPage + 1),
    );
  };

  // Select employee from table
  const handleViewEmployee = (employee) => {
    setSelectedEmployeeId(employee.id);
  };

  // Profile form
  const handleProfileFormChange = (event) => {
    const { name, value } = event.target;

    setSelectedFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (!selectedEmployee) return;

    setEmployees((currentEmployees) => {
      const employeeIndex = currentEmployees.findIndex(
        (employee) => employee.id === selectedEmployee.id,
      );

      if (employeeIndex === -1) return currentEmployees;

      const nextEmployee = {
        ...currentEmployees[employeeIndex],
      };

      if (name === 'name') nextEmployee.name = value;
      if (name === 'designation') nextEmployee.designation = value;
      if (name === 'email') nextEmployee.email = value;
      if (name === 'department') nextEmployee.department = value;
      if (name === 'phone') nextEmployee.phone = value;

      const updatedEmployees = [...currentEmployees];
      updatedEmployees[employeeIndex] = nextEmployee;
      return updatedEmployees;
    });
  };

  const handleProfileFormSave = () => {
    if (!selectedEmployee) return;

    setEmployees((currentEmployees) => {
      const employeeIndex = currentEmployees.findIndex(
        (employee) => employee.id === selectedEmployee.id,
      );

      if (employeeIndex === -1) return currentEmployees;

      const updatedEmployees = [...currentEmployees];
      updatedEmployees[employeeIndex] = {
        ...updatedEmployees[employeeIndex],
        name: selectedFormData.name,
        designation: selectedFormData.designation,
        email: selectedFormData.email,
        department: selectedFormData.department,
        phone: selectedFormData.phone,
      };

      saveEmployees(updatedEmployees);
      return updatedEmployees;
    });

    setSelectedEmployeeId(selectedEmployee.id);
  };

  const handleProfileFormCancel = () => {
    setSelectedFormData(
      getSelectedFormData(selectedEmployee),
    );
  };

  // Add employee modal
  const handleAddEmployeeOpen = () => {
    setIsAddEmployeeOpen(true);
  };

  const handleAddEmployeeClose = () => {
    setIsAddEmployeeOpen(false);
  };

  // Add employee form
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const nextValue =
      name === 'phone'
        ? value.replace(/\D/g, '').slice(0, 10)
        : value;

    setFormData((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const phoneValue = formData.phone.replace(/\D/g, '');

    if (!/^\d{10}$/.test(phoneValue)) {
      nextErrors.phone =
        'Phone number must be exactly 10 digits.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsConfirmOpen(true);
  };

  const handleConfirmSave = () => {
    const phoneValue = formData.phone.replace(/\D/g, '');

    const newEmployee = {
      id: generateEmployeeId(employees),
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      phone: phoneValue,
      department: formData.department,
      designation: formData.designation,
      joiningDate:
        formData.dateOfJoining ||
        new Date().toISOString().split('T')[0],
      status: formData.status,
      address: formData.address,
    };

    setEmployees((currentEmployees) => {
      const nextEmployees = [...currentEmployees, newEmployee];
      saveEmployees(nextEmployees);
      return nextEmployees;
    });
    setCurrentPage(1);
    setSelectedEmployeeId(newEmployee.id);
    setFormData(initialFormData);
    setErrors({});
    setIsConfirmOpen(false);
    setIsAddEmployeeOpen(false);
  };

  // Keep current page valid
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
     <div className="w-full max-w-full space-y-6 overflow-visible bg-gradient-to-br from-[#E5EFFF] via-[#D7EEFF] to-[#E8F1FA]">

      {/* Employee Profile */}
      <EmployeeProfile
        employee={selectedEmployee}
        formData={selectedFormData}
        departmentOptions={departmentOptions}
        onChange={handleProfileFormChange}
        onSave={handleProfileFormSave}
        onCancel={handleProfileFormCancel}
      />

      {/* Search and Filters */}
     <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
  <div className="flex flex-col gap-3 min-[768px]:grid min-[768px]:grid-cols-3 min-[1280px]:grid-cols-4">

    {/* Search */}
    <div className="w-full min-[768px]:col-span-3 min-[1280px]:col-span-1">
      <label htmlFor="search" className="sr-only">
        Search employees
      </label>

      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name, email, or ID"
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      />
    </div>

    {/* Department */}
    <div className="w-full">
      <label htmlFor="department" className="sr-only">
        Department filter
      </label>

      <select
        id="department"
        value={departmentFilter}
        onChange={(event) =>
          setDepartmentFilter(event.target.value)
        }
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        {departmentOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>

    {/* Status */}
    <div className="w-full">
      <label htmlFor="status" className="sr-only">
        Status filter
      </label>

      <select
        id="status"
        value={statusFilter}
        onChange={(event) =>
          setStatusFilter(event.target.value)
        }
        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>

    {/* Add Employee */}
    <div className="w-full">
      <Button
        onClick={handleAddEmployeeOpen}
        className="w-full min-[768px]:w-auto"
      >
        + Add Employee
      </Button>
    </div>

  </div>
</div>
      {/* Employee Table */}
   
<EmployeeTable
  employees={paginatedEmployees}
  totalEmployees={employees.length}
  currentPage={currentPage}
  totalPages={totalPages}
  onViewEmployee={handleViewEmployee}
  onPreviousPage={handlePreviousPage}
  onNextPage={handleNextPage}
/>



      {/* Add Employee Modal */}
      {isAddEmployeeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">

          <div className="relative w-full max-w-4xl rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl sm:p-6">

            {/* Close */}
            <button
              type="button"
              onClick={handleAddEmployeeClose}
              className="absolute right-4 top-4 text-xl font-medium text-slate-500 hover:text-slate-800"
              aria-label="Close add employee modal"
            >
              ×
            </button>

            <div className="mb-4 pr-8">
              <h3 className="text-2xl font-semibold text-slate-900">
                Add Employee
              </h3>
            </div>

            <EmployeeForm
              formData={formData}
              errors={errors}
              onChange={handleInputChange}
              onSubmit={handleSubmit}
              onCancel={handleAddEmployeeClose}
              isConfirmOpen={isConfirmOpen}
              onConfirmSave={handleConfirmSave}
              onCancelConfirm={() =>
                setIsConfirmOpen(false)
              }
            />

          </div>
        </div>
      )}
    </div>
  );
}
