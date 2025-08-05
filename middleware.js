import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const { pathname } = req.nextUrl
  var token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) //Development Mode
  let token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: process.env.NODE_ENV === 'production'
      ? '__Secure-authjs.session-token'
      : 'authjs.session-token'
  }) //Production Mode

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/blog",
    "/search"
  ]

  const isPublicRoute = publicRoutes.some(route =>
    pathname === route ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/search/")
  )

  // Allow public routes without authentication & redirect authenticated users away from auth pages
  if (isPublicRoute) {
    // But redirect authenticated users away from login/register pages
    if ((pathname === "/login" || pathname === "/register") && token) {
      console.log('↩️ Redirecting authenticated user away from auth pages')
      return NextResponse.redirect(new URL("/", req.url))
    }
    console.log('✅ Allowing access to public route')
    return NextResponse.next()
  }
  // Redirect authenticated users away from login/register pages
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow access to login/register for unauthenticated users
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next()
  }

  // Require authentication for all other pages
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Check admin access for admin routes
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] }