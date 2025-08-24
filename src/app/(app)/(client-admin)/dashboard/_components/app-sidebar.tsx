"use client";

import * as React from "react";
import {
  Gauge,
  ChartBarStacked,
  Package,
  MessageCircle,
  TruckElectric,
  UserRound,
  PanelsTopLeft,
  Contrast,
  TicketPercent,
  WalletMinimal,
} from "lucide-react";

import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthUser } from "@/hooks/use-auth-user";
import { NavMain } from "./mian-nav";
import { SidebarOptInForm } from "./sidebar-opt";
import Image from "next/image";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: Gauge, isActive: true },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: ChartBarStacked,
      isActive: true,
    },
    { title: "Products", url: "dashboard/products", icon: Package, isActive: true },
    { title: "Reviews", url: "dashboard/reviews", icon: MessageCircle, isActive: true },
    { title: "Orders", url: "dashboard/orders", icon: TruckElectric, isActive: true },
    {
      title: "Discount Coupons",
      url: "dashboard/discounts",
      icon: TicketPercent,
      isActive: true,
    },
    { title: "Customers", url: "dashboard/customers", icon: UserRound, isActive: true },
  ],
  customization: [
    { title: "Pages", url: "dashboard/pages", icon: PanelsTopLeft, isActive: true },
    { title: "Appearance", url: "dashboard/appearance", icon: Contrast, isActive: true },
    { title: "Payment Settings", url: "dashboard/payment-settings", icon: WalletMinimal, isActive: true },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, signOut } = useAuthUser();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link href="/dashboard">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg p-1.5">
                    <Image
                      src={"/logo.webp"}
                      width={32}
                      height={32}
                      alt="Logo"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Orafinite</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain title="Platform" items={data.navMain} />
          <NavMain title="Customization" items={data.customization} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} signOut={signOut} />
        </SidebarFooter>
      </Sidebar>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/dashboard">
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg p-1.5">
                    <Image
                      src={"/logo.webp"}
                      width={32}
                      height={32}
                      alt="Logo"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Orafinite</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain title="Platform" items={data.navMain} />
          <NavMain title="Customization" items={data.customization} />
        </SidebarContent>
        <SidebarFooter className="space-y-5">
          <SidebarOptInForm />
          <NavUser user={user} signOut={signOut} side={"top"} />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
