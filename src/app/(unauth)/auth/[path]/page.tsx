import { AuthView } from '@neondatabase/auth/react';

export const dynamicParams = false;

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;

  return (
    <div className="auth-page-wrapper neon-auth-ui min-h-screen">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      <main className="relative z-10 container mx-auto flex grow flex-col items-center justify-center gap-3 self-center p-4 md:p-6 min-h-screen">
        <AuthView path={path} redirectTo='/dashboard' />
      </main>
    </div>
  );
}
