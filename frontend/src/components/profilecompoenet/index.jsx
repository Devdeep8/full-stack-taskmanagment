"use client";
import { useGetUserQuery } from "@/services/apiSlice";
import ProfileForm from "./components/profileform";
import ProfileHeader from "./components/profileImage";

export default function ProfileComponent() {
  const { data: user, isLoading, error } = useGetUserQuery();

  if (isLoading) {
    return (
      <div className="w-full flex flex-col items-center justify-center bg-dark text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex items-center justify-center  bg-dark text-white">
        <div className="text-center text-red-500">
          <p>Failed to load profile</p>
          <p className="text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center bg-dark text-white">
      <div className="mt-4 font-bold text-2xl">
        <h1 className="text-center">Personal Information</h1>
        <ProfileHeader name={user.name} username={user.id} />
      </div>
      <ProfileForm user={user} />
    </div>
  );
}