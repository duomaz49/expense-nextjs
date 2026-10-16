import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "@/lib/auth/client";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient as never}
      social={{ providers: ["google"] }}
      redirectTo="/dashboard"
      emailOTP
      defaultTheme="light"
    >
      {children}
    </NeonAuthUIProvider>
  );
}
