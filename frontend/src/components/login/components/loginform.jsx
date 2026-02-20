"use client";
import DynamicForm from "../../../common/components/FormBuilder";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducer";
import { api } from "../../../services/apiSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginComponents({onClose}) {
  const dispatch = useDispatch();

  const router = useRouter();

  const form = useForm({
    defaultValues: { username: "", password: "", remember: false },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { setError, setFocus } = form;

  const fields = [
    {
      type: "input",
      name: "username",
      label: "Username",
      placeholder: "Enter Username",
      rules: { required: "Enter Username" },
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      rules: { required: "Password is required" },
    },
  ];

  const handleLogin = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, 
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          credentials: "include",
        },
      );

      const response = await res.json();

      if (res.status === 401) {
        setError("username", {
          type: "server",
          message: response?.message || "Invalid username or password",
        });
        setError("password", {
          type: "server",
          message: "Invalid username or password",
        });
        setFocus("username");
        return;
      }

      if (!res.ok) {
        setError("root", {
          type: "server",
          message: response?.message || "Login failed. Try again.",
        });
        return;
      }

      const user = response?.data?.user;
      if (!user) {
        setError("root", {
          type: "server",
          message: "Invalid server response",
        });
        return;
      }

      dispatch(setUser(user));

      dispatch(
        api.endpoints.getUser.initiate(undefined, { forceRefetch: true }),
      );
      toast.success("Login worked")
      router.push("/");
      onClose();
    } catch (err) {
      console.error("Login error:", err);
      setError("root", {
        type: "server",
        message: "Network error. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <DynamicForm
        fields={fields}
        form={form}
        submitButtonText="Login"
        onSubmit={handleLogin}
        className="flex flex-col gap-4"
      />
     

    </div>
  );
}
