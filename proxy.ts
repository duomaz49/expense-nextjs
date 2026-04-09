import { auth } from '@/lib/auth/server';

export default auth.middleware({
  // Redirects unauthenticated users to landing page
  loginUrl: '/',
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/account/:path*',
    '/dashboard/:path*',
    '/transactions/:path*',
    '/categories/:path*',
    '/budgets/:path*',
  ],
};
