export default function InputField({ field, config, error, inputProps = {} }) {
  const { label, placeholder, type = "text", icon: Icon } = config;




  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2.5 text-sm font-medium">
          {label}
        </label>
      )}
      
      <div className="relative">
        {Icon && (
          <div className="absolute  inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 " aria-hidden="true" />
          </div>
        )}
        
        <input
          {...field}
          type={type}
          placeholder={placeholder}
          className="w-full bg-primary-2 text-white px-3 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow "
        />
      </div>
      
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}
    </div>
  );
}