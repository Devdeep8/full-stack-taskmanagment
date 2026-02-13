export default function DateField({ field, config, error }) {
  const { label, placeholder } = config;

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}

      <input
        {...field}
        type="date"
        placeholder={placeholder}
        className={`w-full bg-primary-2 text-white px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow ${
          error ? "border-red-500" : "border-white/40"
        }`}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
