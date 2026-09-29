import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import initialEmployees, { generateEmployeeId, saveEmployees } from '../../../data/employees';
import EmployeeForm from './EmployeeForm';

// const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
// const managerOptions = ['Olivia Chen', 'Sarah Davis', 'Emma Wilson', 'Grace Foster', 'Mason Harris'];
// const employmentTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Intern'];

const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
//   dateOfBirth: '',
//   gender: 'Female',
  department: 'Engineering',
  designation: '',
  dateOfJoining: '',
  address: '',
//   status: 'Active',
//   emergencyContact: '',
//   bloodGroup: 'A+',
//   manager: 'Olivia Chen',
//   employmentType: 'Full-time',
};

// const getAge = (dateString) => {
//   if (!dateString) return 0;

//   const today = new Date();
//   const birthDate = new Date(dateString);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDifference = today.getMonth() - birthDate.getMonth();

//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//     age -= 1;
//   }

//   return age;
// };

export default function AddEmployee() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(initialEmployees);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setFormData((prev) => ({ ...prev, [name]: nextValue }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {};
    const phoneValue = formData.phone.replace(/\D/g, '');

    if (!/^\d{10}$/.test(phoneValue)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    // if (!formData.dateOfBirth) {
    //   nextErrors.dateOfBirth = 'Date of birth is required.';
    // } else if (getAge(formData.dateOfBirth) < 18) {
    //   nextErrors.dateOfBirth = 'Minimum age: 18 years';
    // }

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
      joiningDate: formData.dateOfJoining,
      status: formData.status,
    //   gender: formData.gender,
    //   dateOfBirth: formData.dateOfBirth,
      address: formData.address,
    //   personalInfo: {
    //     emergencyContact: formData.emergencyContact || 'Not provided',
    //     bloodGroup: formData.bloodGroup || 'Not provided',
    //   },
    //   workInfo: {
    //     manager: formData.manager || 'Not assigned',
    //     employmentType: formData.employmentType || 'Full-time',
    //   },
    };

    setEmployees((currentEmployees) => {
      const nextEmployees = [...currentEmployees, newEmployee];
      saveEmployees(nextEmployees);
      return nextEmployees;
    });
    setFormData(initialFormData);
    setErrors({});
    setIsConfirmOpen(false);
    navigate('/employees');
  };

  const handleCloseConfirm = () => {
    setIsConfirmOpen(false);
  };

//   const maxDob = new Date();
//   maxDob.setFullYear(maxDob.getFullYear() - 18);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-600">Employees</p>
       
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Add New Employee</h1>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6 lg:p-8">
        <EmployeeForm
          formData={formData}
          errors={errors}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/employees')}
          isConfirmOpen={isConfirmOpen}
          onConfirmSave={handleConfirmSave}
          onCancelConfirm={handleCloseConfirm}
        //   maxDob={maxDob.toISOString().split('T')[0]}
        //   bloodGroupOptions={bloodGroupOptions}
        //   managerOptions={managerOptions}
        //   employmentTypeOptions={employmentTypeOptions}
        />
      </div>
    </div>
  );
}
