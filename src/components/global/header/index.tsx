"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ModeSwitcher } from "./switch";
import Link from "next/link";
import { useAuthUser } from "@/hooks/use-auth-user";
import ProfileMenu from "./menu";

const Header = ({ children }: { children: React.ReactNode }) => {
  const { status, user, signOut } = useAuthUser();
  return (
    <>
      <header className="flex items-center justify-center h-[60px] w-full fixed z-50 dark:bg-[#0a0a0ad9] backdrop-blur-md flex-col">
        <div className="lg:max-w-[64rem] xl:max-w-[80rem] sm:max-w-[40rem] md:max-w-[48rem] relative w-full">
          <h1 className="text-5xl font-medium text-[#e2f75d] relative left-[50%] right-[50%] transform translate-x-[-50%] w-[90px]">
            <span
              style={{
                fontFamily: "var(--font-vrc)",
                background:
                  "linear-gradient(135deg, rgb(255 255 255) 0%, rgb(255 255 255) 18%, rgb(226 247 93) 40%, rgb(226 247 93) 100%) text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              className="relative bottom-[-3px] left-[-1px]"
            >
              O
            </span>
            ra.
          </h1>
          <div className="absolute right-0 top-[25%] flex gap-3">
            <ModeSwitcher showLabel variant="circle" start="top-right" />
            {status === "authenticated" && <ProfileMenu user={user} signOut={signOut}/>}
            {status === "unauthenticated" && <Button variant="ghost">Signin</Button>}
            {status === "unauthenticated" && <Button
              variant="ghost"
              className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transition-opacity rounded-md shadow-[0_1px_theme(colors.white/0.07)_inset,0_1px_3px_theme(colors.zinc.900/0.2)] dark:shadow-[0_1px_theme(colors.black/0.6)_inset,0_1px_3px_theme(colors.black/0.6)] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-md before:bg-gradient-to-b before:from-white/20 dark:before:from-transparent before:opacity-50 dark:before:opacity-0 hover:before:opacity-40 dark:hover:before:opacity-0 after:pointer-events-none after:absolute after:inset-0 after:-z-10 after:rounded-md after:bg-gradient-to-b after:from-white/10 dark:after:from-transparent after:opacity-40 dark:after:opacity-0 dark:hover:after:opacity-0 after:from-[46%] after:to-[54%] after:mix-blend-overlay dark:after:mix-blend-normal dark:mix-blend-normal hover:bg-white/5 dark:hover:bg-white/5 text-sm h-[1.875rem] px-3 ring-1 bg-zinc-900 text-white ring-zinc-900"
            >
              <Link href="/register">Start Building</Link>
            </Button>}
          </div>
        </div>
      </header>
      {children}
    </>
  );
};

export default Header;
