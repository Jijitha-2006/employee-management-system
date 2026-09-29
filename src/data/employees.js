const STORAGE_KEY = 'employee-management-system-employees';

const defaultEmployees = [
  {
    id: 'EMP001',
    firstName: 'Alicia',
    lastName: 'Martinez',
    name: 'Alicia Martinez',
    email: 'alicia.martinez@company.com',
    phone: '9876543210',
    department: 'Engineering',
    designation: 'Senior Frontend Engineer',
    joiningDate: '2021-08-15',
    status: 'Active',
    gender: 'Female',
    dateOfBirth: '1992-02-14',
    address: '245 Market Street, San Francisco, CA',
    personalInfo: {
      emergencyContact: '+91 98765 43210',
      bloodGroup: 'O+',
    },
    workInfo: {
      manager: 'Olivia Chen',
      employmentType: 'Full-time',
    },
  },
  {
    id: 'EMP002',
    firstName: 'Daniel',
    lastName: 'Nguyen',
    name: 'Daniel Nguyen',
    email: 'daniel.nguyen@company.com',
    phone: '9123456780',
    department: 'Finance',
    designation: 'Senior Financial Analyst',
    joiningDate: '2020-05-10',
    status: 'On Leave',
    gender: 'Male',
    dateOfBirth: '1988-03-19',
    address: '189 Madison Avenue, New York, NY',
    personalInfo: {
      emergencyContact: '+91 91234 56780',
      bloodGroup: 'A-',
    },
    workInfo: {
      manager: 'Sarah Davis',
      employmentType: 'Full-time',
    },
  },
  {
    id: 'EMP003',
    firstName: 'Priya',
    lastName: 'Sharma',
    name: 'Priya Sharma',
    email: 'priya.sharma@company.com',
    phone: '9988776655',
    department: 'Human Resources',
    designation: 'HR Business Partner',
    joiningDate: '2022-01-17',
    status: 'Active',
    gender: 'Female',
    dateOfBirth: '1994-09-01',
    address: '47 Oxford Street, London, UK',
    personalInfo: {
      emergencyContact: '+91 99887 76655',
      bloodGroup: 'B+',
    },
    workInfo: {
      manager: 'Emma Wilson',
      employmentType: 'Full-time',
    },
  },
  {
    id: 'EMP004',
    firstName: 'Marcus',
    lastName: 'Lee',
    name: 'Marcus Lee',
    email: 'marcus.lee@company.com',
    phone: '9012345678',
    department: 'Marketing',
    designation: 'Content Strategist',
    joiningDate: '2023-09-04',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '1991-11-22',
    address: '19 Sunset Blvd, Los Angeles, CA',
    personalInfo: {
      emergencyContact: '+91 90123 45678',
      bloodGroup: 'A+',
    },
    workInfo: {
      manager: 'Grace Foster',
      employmentType: 'Contract',
    },
  },
  {
    id: 'EMP005',
    firstName: 'Sophia',
    lastName: 'Patel',
    name: 'Sophia Patel',
    email: 'sophia.patel@company.com',
    phone: '9123456789',
    department: 'Operations',
    designation: 'Operations Manager',
    joiningDate: '2019-11-12',
    status: 'Inactive',
    gender: 'Female',
    dateOfBirth: '1987-06-30',
    address: '884 Congress Avenue, Austin, TX',
    personalInfo: {
      emergencyContact: '+91 91234 56789',
      bloodGroup: 'AB+',
    },
    workInfo: {
      manager: 'Mason Harris',
      employmentType: 'Full-time',
    },
  },
  {
    id: 'EMP006',
    firstName: 'Ethan',
    lastName: 'Baker',
    name: 'Ethan Baker',
    email: 'ethan.baker@company.com',
    phone: '8877665544',
    department: 'Engineering',
    designation: 'DevOps Engineer',
    joiningDate: '2024-02-22',
    status: 'Active',
    gender: 'Male',
    dateOfBirth: '1995-08-10',
    address: '512 Cherry Creek South, Denver, CO',
    personalInfo: {
      emergencyContact: '+91 88776 65544',
      bloodGroup: 'B-',
    },
    workInfo: {
      manager: 'Alicia Martinez',
      employmentType: 'Full-time',
    },
  },
];

export const loadEmployees = () => {
  if (typeof window === 'undefined') return defaultEmployees;

  try {
    const savedEmployees = JSON.parse(
      localStorage.getItem(STORAGE_KEY) ?? 'null',
    );

    if (Array.isArray(savedEmployees) && savedEmployees.length > 0) {
      return savedEmployees;
    }
  } catch (error) {
    console.warn('Unable to load employees from localStorage:', error);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultEmployees));
  return defaultEmployees;
};

export const saveEmployees = (employees) => {
  if (typeof window === 'undefined') return employees;

  const nextEmployees = Array.isArray(employees) ? employees : [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextEmployees));
  return nextEmployees;
};

const employees = loadEmployees();

export const generateEmployeeId = (existingEmployees = employees) => {
  const highestNumber = existingEmployees.reduce((max, employee) => {
    const match = String(employee.id).match(/(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);

  return `EMP${String(highestNumber + 1).padStart(3, '0')}`;
};

export const departmentOptions = [
  'All Departments',
  'Engineering',
  'Finance',
  'Human Resources',
  'Marketing',
  'Operations',
];

export const statusOptions = ['All Statuses', 'Active', 'On Leave', 'Inactive'];

export default employees;
