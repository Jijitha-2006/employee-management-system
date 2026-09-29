import Button from '../../../components/Button';
import Input from '../../../components/Input';

export default function EmployeeForm({
  formData,
  errors = {},
  onChange,
  onSubmit,
  onCancel,
  isConfirmOpen = false,
  onConfirmSave,
  onCancelConfirm,
//   maxDob,
//   bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//   managerOptions = ['Olivia Chen', 'Sarah Davis', 'Emma Wilson', 'Grace Foster', 'Mason Harris'],
//   employmentTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Intern'],
}) {
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <Input
            label="First name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            label="Last name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            label="Phone"
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={10}
            value={formData.phone}
            onChange={onChange}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
        </div>
        {/* <div>
          <Input
            label="Date of birth"
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            max={maxDob}
            value={formData.dateOfBirth}
            onChange={onChange}
          />
          {errors.dateOfBirth && (
            <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth}</p>
          )}
        </div> */}
        {/* <div>
          <Input
            as="select"
            label="Gender"
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={onChange}
            options={['Female', 'Male', 'Other']}
          />
        </div> */}
        <div>
          <Input
            as="select"
            label="Department"
            id="department"
            name="department"
            value={formData.department}
            onChange={onChange}
            options={['Engineering', 'Finance', 'Human Resources', 'Marketing', 'Operations']}
          />
        </div>
        <div>
          <Input
            label="Designation"
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            label="Date of joining"
            id="dateOfJoining"
            name="dateOfJoining"
            type="date"
            value={formData.dateOfJoining}
            onChange={onChange}
          />
        </div>
        <div>
          <Input
            as="select"
            label="Status"
            id="status"
            name="status"
            value={formData.status}
            onChange={onChange}
            options={['Active', 'On Leave', 'Inactive']}
          />
        </div>
        {/* <div>
          <Input
            label="Emergency Contact"
            id="emergencyContact"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={onChange}
          />
        </div> */}
        {/* <div>
          <Input
            as="select"
            label="Blood Group"
            id="bloodGroup"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={onChange}
            options={bloodGroupOptions}
          />
        </div> */}
        {/* <div>
          <Input
            as="select"
            label="Manager"
            id="manager"
            name="manager"
            value={formData.manager}
            onChange={onChange}
            options={managerOptions}
          />
        </div> */}
        {/* <div>
          <Input
            as="select"
            label="Employment Type"
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={onChange}
            options={employmentTypeOptions}
          />
        </div> */}
      </div>

      <Input
        as="textarea"
        label="Address"
        id="address"
        name="address"
        value={formData.address}
        onChange={onChange}
      />

      <div className="flex flex-col-reverse justify-end gap-3 pt-4 sm:flex-row">
        <Button type="button" variant="secondary" onClick={onCancel} className="sm:min-w-[120px]">
          Cancel
        </Button>
        <Button type="submit" className="sm:min-w-[160px]">
          Save Employee
        </Button>
      </div>
    </form>

      {isConfirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
          onClick={onCancelConfirm}
        >
          <div
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <p className="text-lg font-semibold text-slate-900">Are you sure, you want to save this employee?</p>
            <p className="mt-2 text-sm text-slate-600">
              This action will add the employee to the current list.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="secondary" onClick={onCancelConfirm} className="sm:min-w-[120px]">
                Cancel
              </Button>
              <Button type="button" onClick={onConfirmSave} className="sm:min-w-[120px]">
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
