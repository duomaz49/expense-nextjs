import AuthProvider from "@/components/shared/auth-provider";

export default function UnauthLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
