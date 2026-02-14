"use client"
import { useForm } from "react-hook-form";
import { PROFILEFIELDS } from "../../constant/profilefield";
import DynamicForm from "../../../../common/components/FormBuilder";
import toast from "react-hot-toast";

export default function ProfileForm({ user }) {
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone : user.phone ,
      gender : user.gender || "male",
      username : user.username

    },
  });

  const onSubmit = async (data) => {
    const userId = user?.id;

    if (!userId) {
      toast.error("User id not found");
      return;
    }

    console.log(data);
    toast.success("Profile updated");
  };

  return (
    <div className="w-full max-w-5xl">
      {/* Form */}
      <DynamicForm
        onSubmit={onSubmit}
        form={form}
        formId="Profile-Form"
        fields={PROFILEFIELDS}
        showButton={false}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      />

      {/* Footer Actions */}
      <div className="mt-8 flex justify-center gap-3  pt-6">
        <button
          type="submit"
          form="Profile-Form"
          className="px-16 py-2.5 rounded-full bg-dark-3 text-yellow text-sm font-semibold transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
