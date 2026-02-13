/* eslint-disable react-hooks/incompatible-library */
import DynamicForm from "../../../common/components/FormBuilder";
import { useForm } from "react-hook-form";
import { useUsernameCheck } from "../hooks/useUsernameCheck";
import { baseApiUrl } from "@/services/apiSlice";
import toast from "react-hot-toast";
export default function SignupComponent() {
  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      password: "",
      remember: false,
    },
  });

  const {
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  // 👇 realtime username watch
  const username = watch("username");

  // 👇 realtime username check (debounced inside hook)
  const { checking } = useUsernameCheck(username, setError, clearErrors);

  const handleSubmit = async (data) => {
    try {
      const res = await fetch(`${baseApiUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          name: data.name,
          username: data.username,
          email: data.email,
          phone: data.phone,
          password: data.password,
        }),
        credentials: "include",
      });

      const response = await res.json();

      // ❌ Username / Email already exists (example: 409 conflict)
      if (res.status === 409) {
        if (response?.field === "username") {
          setError("username", {
            type: "server",
            message: response.message || "Username already taken",
          });
          setFocus("username");
        }

        if (response?.field === "email") {
          setError("email", {
            type: "server",
            message: response.message || "Email already exists",
          });
          setFocus("email");
        }

        toast.error(response?.message || "User already exists");
        return;
      }

      // ❌ Validation error (400)
      if (res.status === 400) {
        setError("root", {
          type: "server",
          message: response?.message || "Invalid input",
        });
        toast.error(response?.message || "Invalid input");
        return;
      }

      // ❌ Other server errors
      if (!res.ok) {
        setError("root", {
          type: "server",
          message: response?.message || "Signup failed. Try again.",
        });
        toast.error(response?.message || "Signup failed ❌");
        return;
      }

      // ✅ Success
      const user = response?.data?.user;

      if (!user) {
        setError("root", {
          type: "server",
          message: "Invalid server response",
        });
        toast.error("Invalid server response");
        return;
      }

      dispatch(setUser(user));

      // Sync RTK Query cache
      dispatch(
        api.endpoints.getUser.initiate(undefined, { forceRefetch: true }),
      );

      toast.success("Signup successful 🎉");
      router.push("/");
      onClose();
    } catch (err) {
      console.error("Signup error:", err);
      setError("root", {
        type: "server",
        message: "Network error. Please try again.",
      });
      toast.error("Network error. Please try again.");
    }
  };

  const fields = [
    {
      type: "input",
      name: "name",
      label: "Name",
      placeholder: "Enter Name",
      rules: { required: "Name is required" },
    },
    {
      type: "input",
      name: "username",
      label: "Username",
      placeholder: "Enter Username",
      rules: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Minimum 3 characters required",
        },
      },
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      placeholder: "Enter email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Please enter a valid email address",
        },
      },
    },
    {
      name: "phone",
      label: "Phone No.",
      type: "tel",
      placeholder: "0000000000",
      rules: {
        required: "Phone number is required",
        pattern: {
          value: /^[6-9]\d{9}$/,
          message: "Enter valid 10 digit number",
        },
      },
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      rules: { required: "Password is required" },
    },
    {
      type: "checkbox",
      name: "remember",
      label:
        "I confirm that I am 18 years or older and legally allowed to participate in online gaming.",
    },
  ];

  return (
    <div className="max-w-md mx-auto">
      <DynamicForm
        fields={fields}
        form={form}
        onSubmit={handleSubmit}
        submitButtonText={checking ? "Checking..." : "Sign Up"}
        disabled={checking || !!errors.username || isSubmitting}
      />

      {/* 🔥 Username Status UI */}
      {checking && (
        <p className="text-xs text-yellow-400 mt-2">Checking username...</p>
      )}

      {!checking && username?.length >= 3 && !errors.username && (
        <p className="text-xs text-green-400 mt-2">Username available</p>
      )}

      {errors.username && (
        <p className="text-xs text-red-400 mt-2">{errors.username.message}</p>
      )}
    </div>
  );
}
