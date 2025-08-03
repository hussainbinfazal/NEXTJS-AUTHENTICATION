import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const { pathname } = req.nextUrl
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
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