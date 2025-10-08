import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/'];
const authRoutes = ['/login', '/sign-up', '/reset-password'];

export async function middleware(req: NextRequest) {
    const token =
        req.cookies.get('authjs.session-token')?.value ||
        req.cookies.get('__Secure-authjs.session-token')?.value;

    const { pathname } = req.nextUrl;

    const isProtected =
        protectedRoutes.includes(pathname);
    const isAuthRoute =
        authRoutes.includes(pathname) || pathname.startsWith('/login');

      if (isProtected && !token) {
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('redirect_url', req.nextUrl.pathname);
        return NextResponse.redirect(loginUrl);
      }

    if (isAuthRoute && token) {
        const homeUrl = new URL('/', req.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/sign-up',
        '/reset-password',
    ],
};
