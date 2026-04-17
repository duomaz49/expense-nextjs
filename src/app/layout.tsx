import type { Metadata } from "next";
import { NeonAuthUIProvider } from '@neondatabase/auth/react';
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {authClient} from "@/lib/auth/client";
import { TRPCProvider } from "@/lib/trpc/client";

const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Track your expenses with ease using our intuitive expense tracker app built with Next.js and NeonDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <TRPCProvider>
        <NeonAuthUIProvider
          authClient={authClient as never}
          social={{ providers: ['google'] }}
          redirectTo="/dashboard"
          emailOTP
          defaultTheme="light"
        >
          {children}
        </NeonAuthUIProvider>
      </TRPCProvider>
      </body>
    </html>
  );
}
