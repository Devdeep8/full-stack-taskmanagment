import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordField({ field, config, error }) {
  const { label, placeholder, icon: Icon } = config;
  const [show, setShow] = useState(false);

  return (
    <div className="w-full">
      {label && <label className="block mb-1 text-sm font-medium">{label}</label>}

      <div className="relative">
        {Icon && <Icon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />}

        <input
          {...field}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="w-full bg-primary-2 text-white px-3 py-3 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow"
        />

        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-2 top-1/2 -translate-y-1/2"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
