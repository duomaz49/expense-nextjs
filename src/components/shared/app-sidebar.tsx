"use client"

import Image from "next/image"
import { Link, usePathname } from "@/i18n/navigation"
import { LayoutDashboard, Wallet, Tags, ArrowLeftRight, Settings } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import LanguageSwitcher from "@/components/shared/language-switcher"

export function AppSidebar() {
  const pathname = usePathname()
  const t = useTranslations("nav")

  const navItems = [
    { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
    { key: "transactions", href: "/transactions", icon: ArrowLeftRight },
    { key: "budgets", href: "/budgets", icon: Wallet },
    { key: "categories", href: "/categories", icon: Tags },
    { key: "settings", href: "/account/settings", icon: Settings },
  ] as const

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Image src="/icon.svg" alt={t("brand")} width={20} height={20} className="shrink-0" />
          <span className="text-lg font-semibold group-data-[collapsible=icon]:hidden">{t("brand")}</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{t(item.key)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LanguageSwitcher />
      </SidebarFooter>
    </Sidebar>
  )
}
