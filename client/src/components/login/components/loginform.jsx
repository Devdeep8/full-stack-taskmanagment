import DynamicForm from "../../../common/components/FormBuilder";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducer";
import { api } from "../../../services/apiSlice";

export default function LoginComponents() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: { username: "", password: "", remember: false },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const fields = [
    {
      type: "input",
      name: "username",
      label: "Username",
      placeholder: "Enter Username",
      className: "",
      rules: { required: "Enter Username" },
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Enter password",
      className: "w-full",
      rules: { required: "Password is required" },
    },
  ];

  const handleLogin = async (data) => {
    console.log(data);
    const res = await fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(data), 
      credentials: "include",
    });
    const response = await res.json();
    console.log(response.data.user);
    dispatch(setUser(response.data.user))  
    dispatch(api.endpoints.getUser.initiate())
  };

  return (
    <div className=" max-w-md flex flex-col mx-auto  p-6 space-y-6">
      <DynamicForm
        fields={fields}
        form={form}
        submitButtonText="Login"
        onSubmit={handleLogin}
        className=" flex flex-col gap-4"
      />
    </div>
  );
}
