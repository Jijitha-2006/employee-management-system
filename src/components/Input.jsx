export default function Input({
  label,
  id,
  type = 'text',
  as = 'input',
  className = '',
  options = [],
  children,
  ...props
}) {
  const baseClassName =
    'mt-1 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-700 shadow-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100';

  const commonProps = { id, className: `${baseClassName} ${className}`, ...props };

  if (as === 'select') {
    return (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label && <span>{label}</span>}
        <select {...commonProps}>
          {options.map((option) => (
            <option key={option.value ?? option} value={option.value ?? option}>
              {option.label ?? option}
            </option>
          ))}
          {children}
        </select>
      </label>
    );
  }

  if (as === 'textarea') {
    return (
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label && <span>{label}</span>}
        <textarea {...commonProps} rows={4} />
      </label>
    );
  }

  return (
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label && <span>{label}</span>}
      <input type={type} {...commonProps} />
    </label>
  );
}
