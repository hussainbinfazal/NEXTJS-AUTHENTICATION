import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req) {
  const { pathname } = req.nextUrl
  
  if (pathname === "/login" || pathname === "/register") {
    return NextResponse.next()
  }
  
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url))
  }
  
  return NextResponse.next()
}

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"] }