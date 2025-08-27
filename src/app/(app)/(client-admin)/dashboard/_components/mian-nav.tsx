"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function normalizePath(p?: string) {
  if (!p) return "/";
  return p.replace(/\/+$/, "") || "/";
}

function isPrefix(current: string, target: string) {
  const c = normalizePath(current);
  const t = normalizePath(target);
  return c.startsWith(t + "/");
}

export function NavMain({
  items,
  title,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  title: string;
}) {
  const path = usePathname() || "/";
  const current = normalizePath(path);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const itemPath = normalizePath(item.url);
          const selfActive = current === itemPath;
          const hasChildren = !!item.items?.length;
          const childActive =
            hasChildren &&
            item.items!.some((s) => {
              const sPath = normalizePath(s.url);
              return current === sPath || isPrefix(current, sPath);
            });
          const openByDefault = item.isActive || selfActive || childActive;

          return (
            <Collapsible key={item.title} asChild defaultOpen={openByDefault}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    selfActive &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                  )}
                >
                  <Link
                    href={item.url}
                    aria-current={selfActive ? "page" : undefined}
                    onClick={(e) => {
                      if (selfActive) e.preventDefault();
                    }}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => {
                          const subPath = normalizePath(subItem.url);
                          const subActive = current === subPath;
                          return (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <Link
                                  href={subItem.url}
                                  aria-current={subActive ? "page" : undefined}
                                  className={cn(
                                    subActive && "text-primary font-medium"
                                  )}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
