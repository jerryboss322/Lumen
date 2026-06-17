
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    
    if (isAdminRoute) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/auth/login?error=admin', req.url))
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect shop pages - require login
        if (req.nextUrl.pathname.startsWith('/shop') || req.nextUrl.pathname.startsWith('/product')) {
          return !!token
        }
        return true
      }
    }
  }
)

export const config = {
  matcher: ['/admin/:path*', '/shop/:path*', '/product/:path*']
}
