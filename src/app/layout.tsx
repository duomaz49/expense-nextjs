import type { Metadata } from "next";
import { NeonAuthUIProvider, UserButton } from '@neondatabase/auth/react';
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import {authClient} from "@/lib/auth/client";

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
      <NeonAuthUIProvider
        authClient={authClient as any}
        redirectTo="/account/settings"
        emailOTP
        >
        <header className='flex justify-end items-center p-4 gap-4 h-16'>
          <UserButton size="icon" />
        </header>
        {children}
      </NeonAuthUIProvider>
      </body>
    </html>
  );
}
