import { auth } from "@/lib/auth/server";

export async function createContext() {
  const { data: session } = await auth.getSession();
  return { user: session?.user ?? null };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
