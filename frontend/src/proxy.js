import { NextResponse } from "next/server";

export function proxy(request) {
  console.log("Proxy running...");

  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // ✅ Allow homepage without token
  if (pathname === "/") {
    return NextResponse.next();
  }

  // ❌ If no tokens → redirect to home
  if (!accessToken && !refreshToken) {
    console.log("No tokens found. Redirecting to /");

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|gif|webp|ico)).*)",
  ],
};
