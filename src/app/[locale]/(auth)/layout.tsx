import {SignedIn, SignedOut, RedirectToSignIn} from '@neondatabase/neon-js/auth/react/ui';
import AuthProvider from '@/components/shared/auth-provider';
import { TRPCProvider } from '@/lib/trpc/client';

export default function AuthLayout({children}: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TRPCProvider>
        <SignedIn>
          {children}
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn/>
        </SignedOut>
      </TRPCProvider>
    </AuthProvider>
  );
}
