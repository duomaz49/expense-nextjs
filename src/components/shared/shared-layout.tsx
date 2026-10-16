import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";
import { UserButton } from '@neondatabase/auth/react';
import LanguageSwitcher from '@/components/shared/language-switcher';

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between border-b p-2">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <UserButton size="icon" />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
