import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  
  console.log('Middleware running...');
  console.log('pathname:', request.nextUrl.pathname);
  console.log('Token:', token);
  
  // Define public paths that don't require authentication
  const publicPaths = ['/auth/signin', '/api/auth']
  // Check if the current path is in the public paths
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  if (!token && !isPublicPath) {
    // Redirect to signin page if there's no token and it's not a public path
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  if (token && request.nextUrl.pathname === '/auth/signin') {
    // Redirect to home page if user is already signed in and tries to access signin page
    return NextResponse.redirect(new URL('/book', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}