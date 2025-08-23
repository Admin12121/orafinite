import { cn } from "@/lib/utils";
import React from "react";

const Logo = ({className}:{className?:string}) => {
  return (
    <h1 className={cn("text-5xl font-medium text-[#e2f75d] relative left-[50%] right-[50%] transform translate-x-[-50%] w-[90px]", className)}>
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
  );
};

export default Logo;
