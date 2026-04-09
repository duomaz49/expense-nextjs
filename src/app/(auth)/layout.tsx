import {SignedIn, SignedOut, RedirectToSignIn} from '@neondatabase/neon-js/auth/react/ui';

export default function AuthLayout({children}: { children: React.ReactNode }) {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn/>
      </SignedOut>
    </>
  );
}
