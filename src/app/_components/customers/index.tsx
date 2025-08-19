"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

export default function CustomRolesPermissions() {
  const [randomTranslateX, setRandomTranslateX] = useState(-242.094);
  const [highlightedIndex, setHighlightedIndex] = useState(5);
  const [coloredImageIndex, setColoredImageIndex] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [highlightStyle, setHighlightStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const roles = [
    "Administrator",
    "Product Member",
    "Editor",
    "QA Tester",
    "Owner",
    "Engineer",
    "Human Resources",
    "Marketing",
  ];

  const imageRoleNames = ["Administrator", "Editor", "Marketing", "Owner"];
  const mappedRoleIndices = imageRoleNames
    .map((name) => roles.indexOf(name))
    .filter((idx) => idx >= 0);
  const roleIndexToImage = new Map<number, number>();
  mappedRoleIndices.forEach((roleIdx, imgIdx) =>
    roleIndexToImage.set(roleIdx, imgIdx)
  );
  const imageCount = mappedRoleIndices.length || 4;

  const roleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHovered) return;
    if (mappedRoleIndices.length === 0) return;
    let last = highlightedIndex;
    const id = setInterval(() => {
      let nextRoleIndex =
        mappedRoleIndices[Math.floor(Math.random() * mappedRoleIndices.length)];
      if (mappedRoleIndices.length > 1) {
        while (nextRoleIndex === last) {
          nextRoleIndex =
            mappedRoleIndices[
              Math.floor(Math.random() * mappedRoleIndices.length)
            ];
        }
      }
      last = nextRoleIndex;
      setHighlightedIndex(nextRoleIndex);
      setColoredImageIndex(
        roleIndexToImage.get(nextRoleIndex) ??
          mappedRoleIndices.indexOf(nextRoleIndex) % imageCount
      );
    }, 1200);
    return () => clearInterval(id);
  }, [isHovered, roles.length, imageRoleNames.join(",")]);

  useLayoutEffect(() => {
    let raf = 0;
    const update = () => {
      const el = roleRefs.current[highlightedIndex];
      const container = containerRef.current;
      if (!el || !container) return;
      const left = el.offsetLeft;
      const width = el.offsetWidth;
      const containerWidth = container.offsetWidth;
      const elCenter = left + width / 2;
      const translateX = containerWidth / 2 - elCenter;
      setHighlightStyle({ left, width });
      setRandomTranslateX(translateX);
    };
    update();
    raf = requestAnimationFrame(update);

    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [highlightedIndex, roles.length]);

  return (
    <div
      className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden row-span-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10 flex-none px-6 pt-6">
        <h3 className="text-sm font-medium">Custom roles and permissions</h3>
        <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
          Powerful primitives to fully customize your app's authorization story.
        </p>
      </div>
      <div
        className="relative flex-auto select-none"
        aria-hidden="true"
        style={{ minHeight: "10.25rem" }}
      >
        <svg width="0" height="0" aria-hidden="true">
          <defs>
            <pattern
              id="wave"
              width="12"
              height="3"
              patternUnits="userSpaceOnUse"
            >
              <path
                fill="none"
                stroke="white"
                strokeOpacity="0.1"
                d="M-6 0c3 2 6 0 6 0s3-2 6 0 6 0 6 0 3-2 6 0M-6 3c3 2 6 0 6 0s3-2 6 0 6 0 6 0 3-2 6 0"
              ></path>
            </pattern>
          </defs>
        </svg>
        <div className="flex h-full flex-col items-center justify-between py-5">
          <div className="grid w-max grid-cols-3 grid-rows-3 gap-2 mt-5">
            <div className="rounded-lg ring-1 ring-zinc-200/7.5"></div>
            <div className="bg-white rounded-lg p-1 ring-1 ring-zinc-200/5 transition duration-1000 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
              <div
                className={cn(
                  "relative overflow-hidden rounded bg-zinc-50 transition duration-1000 opacity-70 mix-blend-luminosity",
                  coloredImageIndex === 0
                    ? "opacity-100 mix-blend-normal"
                    : "opacity-70 mix-blend-luminosity"
                )}
                style={{
                  background:
                    coloredImageIndex === 0
                      ? "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.3) 41.24%, rgba(56, 218, 253, 0.25) 62.34%, rgba(59, 130, 246, 0) 91.89%)"
                      : "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(108, 71, 255, 0.3), rgba(255, 249, 99, 0.24) 41.24%, rgba(56, 218, 253, 0.18) 62.34%, rgba(98, 72, 246, 0) 91.89%)",
                }}
              >
                <img
                  alt=""
                  loading="lazy"
                  width="72"
                  height="84"
                  decoding="async"
                  data-nimg="1"
                  className="h-[5.25rem] w-[4.5rem] object-cover mix-blend-multiply"
                  src={"/person.webp"}
                  style={{ color: "transparent" }}
                />
                <svg className="absolute inset-0 size-full" aria-hidden="true">
                  <rect width="100%" height="100%" fill="url(#wave)"></rect>
                </svg>
                <div className="absolute inset-0 rounded ring-1 ring-inset ring-black/5"></div>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-800/7.5 ring-1 ring-zinc-200/12.5"></div>
            <div className="bg-white rounded-lg p-1 ring-1 ring-zinc-200/5 transition duration-1000 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
              <div
                className={cn(
                  "relative overflow-hidden rounded bg-zinc-50 transition duration-1000 opacity-70 mix-blend-luminosity",
                  coloredImageIndex === 1
                    ? "opacity-100 mix-blend-normal"
                    : "opacity-70 mix-blend-luminosity"
                )}
                style={{
                  background:
                    coloredImageIndex === 1
                      ? "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.3) 41.24%, rgba(56, 218, 253, 0.25) 62.34%, rgba(59, 130, 246, 0) 91.89%)"
                      : "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(108, 71, 255, 0.3), rgba(255, 249, 99, 0.24) 41.24%, rgba(56, 218, 253, 0.18) 62.34%, rgba(98, 72, 246, 0) 91.89%)",
                }}
              >
                <img
                  alt=""
                  loading="lazy"
                  width="72"
                  height="84"
                  decoding="async"
                  data-nimg="1"
                  className="h-[5.25rem] w-[4.5rem] object-cover mix-blend-multiply"
                  src={"/person.webp"}
                  style={{ color: "transparent" }}
                />
                <svg className="absolute inset-0 size-full" aria-hidden="true">
                  <rect width="100%" height="100%" fill="url(#wave)"></rect>
                </svg>
                <div className="absolute inset-0 rounded ring-1 ring-inset ring-black/5"></div>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-800/2.5 ring-1 ring-zinc-200/7.5"></div>
            <div className="bg-white rounded-lg p-1 ring-1 ring-zinc-200/5 transition duration-1000 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
              <div
                className={cn(
                  "relative overflow-hidden rounded bg-zinc-50 transition duration-1000 opacity-70 mix-blend-luminosity",
                  coloredImageIndex === 2
                    ? "opacity-100 mix-blend-normal"
                    : "opacity-70 mix-blend-luminosity"
                )}
                style={{
                  background:
                    coloredImageIndex === 2
                      ? "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.3) 41.24%, rgba(56, 218, 253, 0.25) 62.34%, rgba(59, 130, 246, 0) 91.89%)"
                      : "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(108, 71, 255, 0.3), rgba(255, 249, 99, 0.24) 41.24%, rgba(56, 218, 253, 0.18) 62.34%, rgba(98, 72, 246, 0) 91.89%)",
                }}
              >
                <img
                  alt=""
                  loading="lazy"
                  width="72"
                  height="84"
                  decoding="async"
                  data-nimg="1"
                  className="h-[5.25rem] w-[4.5rem] object-cover mix-blend-multiply"
                  src={"/person.webp"}
                  style={{ color: "transparent" }}
                />
                <svg className="absolute inset-0 size-full" aria-hidden="true">
                  <rect width="100%" height="100%" fill="url(#wave)"></rect>
                </svg>
                <div className="absolute inset-0 rounded ring-1 ring-inset ring-black/5"></div>
              </div>
            </div>
            <div className="rounded-lg ring-1 ring-zinc-200/7.5"></div>
            <div className="bg-white rounded-lg p-1 ring-1 ring-zinc-200/5 transition duration-1000 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]">
              <div
                className={cn(
                  "relative overflow-hidden rounded bg-zinc-50 transition duration-1000 opacity-70 mix-blend-luminosity",
                  coloredImageIndex === 3
                    ? "opacity-100 mix-blend-normal"
                    : "opacity-70 mix-blend-luminosity"
                )}
                style={{
                  background:
                    coloredImageIndex === 3
                      ? "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(59, 130, 246, 0.4), rgba(6, 182, 212, 0.3) 41.24%, rgba(56, 218, 253, 0.25) 62.34%, rgba(59, 130, 246, 0) 91.89%)"
                      : "radial-gradient(241.22% 160.71% at 49.27% -9.52%, rgba(108, 71, 255, 0.3), rgba(255, 249, 99, 0.24) 41.24%, rgba(56, 218, 253, 0.18) 62.34%, rgba(98, 72, 246, 0) 91.89%)",
                }}
              >
                <img
                  alt=""
                  loading="lazy"
                  width="72"
                  height="84"
                  decoding="async"
                  data-nimg="1"
                  className="h-[5.25rem] w-[4.5rem] object-cover mix-blend-multiply"
                  src={"/person.webp"}
                  style={{ color: "transparent" }}
                />
                <svg className="absolute inset-0 size-full" aria-hidden="true">
                  <rect width="100%" height="100%" fill="url(#wave)"></rect>
                </svg>
                <div className="absolute inset-0 rounded ring-1 ring-inset ring-black/5"></div>
              </div>
            </div>
            <div className="rounded-lg ring-1 ring-zinc-200/7.5"></div>
          </div>
          <div
            className="relative mt-10 w-full overflow-hidden"
            ref={containerRef}
          >
            <motion.div
              className="flex gap-x-3 relative pointer-events-auto"
              animate={{ x: randomTranslateX }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            >
              <motion.div
                className="absolute top-0 bottom-0 bg-white/10 rounded-full"
                animate={{
                  left: highlightStyle.left,
                  width: highlightStyle.width,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />

              {roles.map((role, i) => (
                <div
                  key={role}
                  ref={(el) => {
                    roleRefs.current[i] = el;
                  }}
                  className={cn(
                    "relative whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium cursor-pointer transition-colors",
                    i === highlightedIndex
                      ? "text-white bg-white/10"
                      : "text-zinc-300"
                  )}
                  onClick={() => {
                    setHighlightedIndex(i);
                    setColoredImageIndex(
                      roleIndexToImage.get(i) ?? i % imageCount
                    );
                  }}
                >
                  {role}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
