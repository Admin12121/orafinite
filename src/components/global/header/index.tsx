"use client";

import React from "react";
import dynamic from "next/dynamic";
import { HoverBorderGradient } from "@/components/ui/hover-button";
import { ChevronRight } from "lucide-react"; 

const MenuBar = dynamic(() => import("./menu"), { ssr: false });

const Header = () => {
  return (
    <header className="flex items-center justify-center h-[60px] w-full fixed z-50 bg-[#0a0a0ad9] backdrop-blur-md flex-col">
      <div className="lg:max-w-[64rem] xl:max-w-[80rem] sm:max-w-[40rem] md:max-w-[48rem] relative w-full">
        {/* <MenuBar /> */}
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
        <HoverBorderGradient
          containerClassName="rounded-full absolute top-0 right-[50px]"
          as="button"
          className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
        >
          <span>Start Building</span>
          <ChevronRight className="w-5 h-5"/>
        </HoverBorderGradient>
      </div>
      <div className="relative">
        <div
          className="absolute opacity-30 inset-x-0 h-px -top-px"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 1'%3E%3Crect width='1' height='1' fill='%23fff'/%3E%3C/svg%3E");`,
            maskImage: `linear-gradient(to right, transparent, white 7rem, white calc(100% - 7rem), transparent)`,
            marginLeft: "-7rem",
            marginRight: "-7rem",
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;
