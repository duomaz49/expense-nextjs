import {SignedIn, SignedOut, RedirectToSignIn} from '@neondatabase/neon-js/auth/react/ui';

export default function DashboardPage() {
    return (
        <>
            <SignedIn>
                <h1 className="text-2xl font-bold">Dashboard</h1>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn/>
            </SignedOut>
        </>
    );
}
