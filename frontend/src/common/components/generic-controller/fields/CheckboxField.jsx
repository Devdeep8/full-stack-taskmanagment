/* eslint-disable react-hooks/refs */
export default function CheckboxField({ field, config, error }) {
  const { label } = config;

  return (
    <div className="w-full mt-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={!!field.value}
          onChange={(e) => field.onChange(e.target.checked)}
          onBlur={field.onBlur}
          ref={field.ref}
          className={`w-4 h-4 rounded border ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span className="text-sm font-medium select-none">{label}</span>
      </label>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
