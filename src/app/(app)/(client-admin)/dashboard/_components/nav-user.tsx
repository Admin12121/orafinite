"use client";

import React, { useState } from "react";
import {
  BadgeInfo,
  BadgeQuestionMark,
  Bug,
  ChevronsUpDown,
  Command,
  LogOut,
  MoveUpRight,
  Notebook,
  Settings,
  Sparkles,
  SquareArrowOutUpRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Setting from "./settings";

export function NavUser({
  user,
  signOut,
  side,
}: {
  user: any;
  signOut: () => void;
  side?: any;
}) {
  const { isMobile } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-[45px] rounded-[14px] px-[5px]"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <Image
                    src={user.image || "/person.webp"}
                    alt="Avatar"
                    width={32}
                    height={32}
                    className="shrink-0 rounded-sm"
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : side ? side : "right"}
              align="end"
              sideOffset={side ? 20 : 10}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user.image || "/person.webp"}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles className="size-4" />
                  Upgrade to Pro
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setSettingsOpen(true)}>
                  <Settings className="size-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>रु</span>
                  Pricing
                  <SquareArrowOutUpRight className="size-4 ml-auto" />
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="gap-1">
                    <BadgeInfo className="size-4" />
                    Help
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem className="group">
                        <BadgeQuestionMark className="size-4" /> Help center{" "}
                        <MoveUpRight className="size-3 text-neutral-500 ml-auto hidden group-hover:block transition-all ease-in-out duration-300" />
                      </DropdownMenuItem>
                      <DropdownMenuItem className="group">
                        <Notebook className="size-4" />
                        Terms & policies{" "}
                        <MoveUpRight className="size-3 text-neutral-500 ml-auto hidden group-hover:block transition-all ease-in-out duration-300" />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bug className="size-4" /> Report Bug
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Command className="size-4" />
                        Keyboard shortcuts
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut}>
                <LogOut className="size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent className="sm:max-w-[950px] h-[600px] p-1">
          <DialogHeader className="hidden">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Setting />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NavUser;
