export default function EmployeeActions({ employee, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-2">
      {/* View */}
      <button
        type="button"
        onClick={() => onView?.(employee)}
        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-indigo-200 hover:text-indigo-600"
        title="View"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </button>

      {/* Edit */}
      <button
        type="button"
        onClick={() => onEdit?.(employee)}
        className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        title="Edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m16.862 3.487 3.65 3.65M4.5 19.5l4.2-.75L19.75 7.7a2.58 2.58 0 0 0-3.65-3.65L5.05 15.3l-.55 4.2Z"
          />
        </svg>
      </button>

      {/* Delete */}
      <button
        type="button"
        onClick={() => onDelete?.(employee)}
        className="rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
        title="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 7.5h12M9.5 7.5V5.25A1.25 1.25 0 0 1 10.75 4h2.5a1.25 1.25 0 0 1 1.25 1.25V7.5M8 7.5l.75 11.25A1.25 1.25 0 0 0 10 20h4a1.25 1.25 0 0 0 1.25-1.25L16 7.5M10 11v5M14 11v5"
          />
        </svg>
      </button>
    </div>
  );
}