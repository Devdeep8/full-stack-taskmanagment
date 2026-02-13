export default function CheckboxField({ field, config, error }) {
  const { label } = config;

  return (
    <div className="w-full">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          {...field}
          type="checkbox"
          checked={field.value || false}
          className={`w-4 h-4 rounded border ${
            error ? "border-red-500" : "border-gray-300"
          } text-primary focus:ring-2 focus:ring-primary cursor-pointer`}
        />
        <span className="text-sm font-medium select-none">{label}</span>
      </label>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}