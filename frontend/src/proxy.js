import { NextResponse, NextRequest } from 'next/server'

export function proxy(request) {
  // 1. Get the cookies from the request
  const accessToken = request.cookies.get('access_token')
  const refreshToken = request.cookies.get('refresh_token')

  // 2. Check if tokens exist and log the result
  if (accessToken) {
    console.log('Access token found:', accessToken.value)
  } else if (refreshToken) {
    console.log('Refresh token found:', refreshToken.value)
  } 

  // 4. If tokens exist, continue to the requested page
  return NextResponse.next()
}

// Configuration to specify which paths this Proxy applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - home (so we don't redirect loop)
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!home|api|_next/static|_next/image|favicon.ico).*)',
  ],
}