import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { UserButton } from '@neondatabase/auth/react';

export default function DashBoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between border-b p-2">
          <SidebarTrigger />
          <UserButton className="ml-auto" size="icon" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
