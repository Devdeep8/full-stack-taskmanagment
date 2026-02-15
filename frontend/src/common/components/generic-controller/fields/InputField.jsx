import { cn } from "@/utils";

export default function InputField({ field, config, error, inputProps = {} }) {
  const { label, placeholder, type = "text", icon: Icon  , disabled , readOnly} = config;

  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium">{label}</label>}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5" />
          </div>
        )}

        <input
          {...field}
          {...inputProps}
          disabled={disabled}
          readOnly={readOnly}
          type={type}
          placeholder={placeholder}
          
          className={cn(
            "w-full bg-primary-2 disabled:bg-white/30 disabled:text-white/30 text-white px-3 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow",
            inputProps.className
          )}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
