"use client";
import { useForm } from "react-hook-form";
import { PROFILEFIELDS } from "../../constant/profilefield";
import DynamicForm from "../../../../common/components/FormBuilder";
import toast from "react-hot-toast";
import { UpdateUserData } from "@/services/patch-service";

export default function ProfileForm({ user }) {
  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user.phone,
      gender: user.gender || "male",
      username: user.username,
      address: user.address,
      dob: user.dob,
      zipcode: user.zipCode || "",
      state: user.state || ""
    },
  });

  const onSubmit = async (data) => {
    const userId = user?.id;

    console.log("data :>> ", data);
    if (!userId) {
      toast.error("User id not found");
      return;
    }

    const res = await UpdateUserData(userId, data);
    const updatedUser = res.data;
    console.log("data :>> ", updatedUser);
    toast.success("Profile updated");
  };

  return (
    <div className="w-full max-w-5xl mb-4 ">
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
          className="px-16 py-2.5 rounded-full bg-slider text-sm font-semibold transition"
        >
          Save
        </button>
      </div>
    </div>
  );
}
