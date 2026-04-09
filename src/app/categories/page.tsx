import {SignedIn, SignedOut, RedirectToSignIn} from '@neondatabase/neon-js/auth/react/ui';

export default function CategoriesPage() {
    return (
        <>
            <SignedIn>
                <h1 className="text-2xl font-bold">Categories</h1>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn/>
            </SignedOut>
        </>
    );
}
