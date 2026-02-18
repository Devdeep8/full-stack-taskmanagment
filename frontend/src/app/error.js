"use client";

import { useRouter } from "next/navigation";


export default function Error({ error, reset }) {
    const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>

      <p className="text-gray-400 mb-6">{error?.message}</p>
      <div className=" flex gap-2">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
