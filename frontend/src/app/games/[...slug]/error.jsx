"use client";

import { useRouter } from "next/navigation";


export default function Error({ error, reset }) {
    const router = useRouter()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary">
      <h2 className="text-2xl font-bold mb-4">Games not Found!</h2>

      <div className=" flex gap-2">
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-stress-2 rounded-lg hover:bg-stress-2 transition"
        >
          Try Again
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-stress-2 rounded-lg hover:bg-stress-2 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
