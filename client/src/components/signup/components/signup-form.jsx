import DynamicForm from "../../../common/components/FormBuilder";
import { useForm } from "react-hook-form";
export default function SignupComponent() {
  const form = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: { name: " ", email: "", password: "" },
  });
  const handleSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const user = await res.json();
      console.log("User created:", user);
      alert("Signup successful 🎉");
    } catch (err) {
      console.error(err);
    }
  };

  const fields = [
    {
      type: "input",
      name: "name",
      label: "Name",
      placeholder: "Enter Name",
      className: "",
      rules: { required: "Name is required" },
    },
    {
      type: "input",
      name: "email",
      label: "Email",
      placeholder: "Enter email",
      className: "",
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
      label: "Phone. No.",
      type: "input",
      placeholder: "0000000000",
      rules: {
        required: "Phone number is required",
        pattern: {
          value: /^[6-9]\d{9}$/,
          message: "Enter valid 10 digit number",
        },
      },
      inputProps: {
        className:
          " border border-white/30 bg-primary-2 text-white focus:ring-2 focus:outline-none  focus:ring-gold rounded px-3 py-2 w-full",
        maxLength: 10,
      },
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      className: "w-full",
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
    <div className=" max-w-md  mx-auto ">
      <DynamicForm
        fields={fields}
        form={form}
        onSubmit={handleSubmit}
        submitButtonText=" Sign Up"
      />
    </div>
  );
}
