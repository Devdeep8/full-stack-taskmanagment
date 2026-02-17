import { cookies } from "next/headers";
import { baseApiUrl } from "@/services/apiSlice";

export async function getServerUser() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString(); // 🔥 this forwards ALL cookies

  const res = await fetch(`${baseApiUrl}/auth/me`, {
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}
