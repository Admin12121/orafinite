"use client";

import { Check } from "lucide-react";
import { useState } from "react";

export default function SecurityDashboard() {
  const [isHovered, setIsHovered] = useState(false);

  const blockedUsers = [
    {
      email: "bad_actor+1@email.com",
      time: "Blocked Aug 4 at 14:09",
      delay: 0,
    },
    {
      email: "bad_actor+2@email.com",
      time: "Blocked Aug 4 at 14:10",
      delay: 100,
    },
    {
      email: "another.bad.actor@throwaway.com",
      time: "Blocked Aug 4 at 14:12",
      delay: 200,
    },
    {
      email: "bad_actor+3@email.com",
      time: "Blocked Aug 4 at 14:16",
      delay: 300,
    },
  ];

  return (
    <div
      className="group cursor-pointer pt-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="pointer-events-none relative flex-auto select-none min-h-[10.25rem]">
        <div className="flex h-full items-center justify-center">
          <div className="w-min">
            <div className="flex w-[19rem] items-center gap-3.5 rounded-md bg-zinc-800 bg-gradient-to-br from-white/5 to-65% p-3 ring-[0.25rem] ring-zinc-950/50 transition-all duration-500 ">
              <div
                className="transition-transform duration-500"
                style={{
                  animation: isHovered ? "spin 2s linear infinite" : "none",
                }}
              >
                <svg viewBox="0 0 16 16" fill="none" className="size-4">
                  <path
                    stroke="url(#paint0_radial_27_5200)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.25"
                    d="M8 1.75v1.042m0 10.416v1.042m3.125-11.663-.521.902m-5.208 9.022-.521.902m8.537-8.538-.902.52m-9.02 5.21-.903.52M14.25 8h-1.042M2.792 8H1.75m11.662 3.125-.902-.52m-9.02-5.21-.903-.52m8.538 8.538-.52-.902m-5.21-9.022-.52-.902"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_27_5200"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientTransform="rotate(102.529 4.047 5.711) scale(11.5244)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity=".2" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className="font-mono text-xs text-zinc-500 transition-all duration-500 group-hover:text-white">
                Setting up your Store ....
              </div>
                <div className="ml-auto text-xs text-zinc-600 transition-colors duration-500 group-hover:text-zinc-400">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
            </div>
            <div className="relative pl-[2.875rem] pt-16">
              <div className="absolute left-[calc(19/16*1rem)] top-0 -z-10 aspect-[39/393] w-[calc(39/16*1rem)]">
                <svg
                  viewBox="0 0 39 393"
                  fill="none"
                  className="absolute inset-0 size-full stroke-white/5 transition-all duration-700 group-hover:stroke-green-500/30"
                >
                  <path
                    d="M2 0V34.6863C2 36.808 2.84285 38.8429 4.34315 40.3431L34.6569 70.6569C36.1571 72.1571 37 74.192 37 76.3137V393"
                    className="transition-all duration-700"
                    style={{
                      strokeDasharray: isHovered ? "none" : "5,5",
                      strokeDashoffset: isHovered ? 0 : 10,
                    }}
                  />
                </svg>

                <div
                  className="transition-opacity duration-700"
                  style={{ opacity: isHovered ? 1 : 0 }}
                >
                  <canvas
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                    width="39"
                    height="393"
                  />
                  <svg width="0" height="0" aria-hidden="true">
                    <path d="M2 0V34.6863C2 36.808 2.84285 38.8429 4.34315 40.3431L34.6569 70.6569C36.1571 72.1571 37 74.192 37 76.3137V393" />
                  </svg>
                </div>
              </div>

              <div className="space-y-6">
                {blockedUsers.map((user, index) => (
                  <div
                    key={user.email}
                    className="flex items-start gap-4 text-xs"
                    style={{
                      transitionDelay: `${user.delay}ms`,
                    }}
                  >
                    <div className="relative mt-[0.0625rem] flex size-5 flex-none items-center justify-center rounded-full bg-zinc-600/20 transition-all duration-500 group-hover:bg-green-500/20">
                      <div
                        className="size-1 rounded-full bg-zinc-600 shadow-[0_1px_rgba(255,255,255,0.1)_inset,0_1px_2px_rgba(0,0,0,0.25)] transition-all duration-500"
                        style={{
                          opacity: isHovered ? 0 : 1,
                          transform: isHovered ? "scale(0.5)" : "scale(1)",
                        }}
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center rounded-full bg-green-500 transition-all duration-500"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered ? "scale(1)" : "scale(0.8)",
                          transitionDelay: `${user.delay + 100}ms`,
                        }}
                      >
                        <Check className="size-2" />
                      </div>
                    </div>
                    <div>
                      <div
                        className="font-medium text-white transition-all duration-500"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          filter: isHovered ? "blur(0px)" : "blur(8px)",
                          transform: isHovered
                            ? "translateY(0)"
                            : "translateY(-0.25rem)",
                          transitionDelay: `${user.delay + 150}ms`,
                        }}
                      >
                        {user.email}
                      </div>
                      <div
                        className="text-zinc-600 transition-all duration-500 group-hover:text-zinc-400"
                        style={{
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered
                            ? "translateY(0)"
                            : "translateY(0.5rem)",
                          transitionDelay: `${user.delay + 200}ms`,
                        }}
                      >
                        {user.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
