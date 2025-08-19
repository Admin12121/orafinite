"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function AutoJoinCard() {
  const [hovered, setHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0); // 0=L, 1=C, 2=R
  const [glow, setGlow] = useState(0.1); // badge glow

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftRef = useRef<SVGPathElement | null>(null);
  const centerRef = useRef<SVGPathElement | null>(null);
  const rightRef = useRef<SVGPathElement | null>(null);
  const glowRef = useRef<number>(0.1);

  const setGlowSafe = (v: number | ((prev: number) => number)) => {
    setGlow((prev) => {
      const next = typeof v === "function" ? (v as any)(prev) : v;
      glowRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    if (!hovered) {
      setActiveIdx(0);
      setGlow(0.1);
      const c = canvasRef.current;
      if (c) {
        const ctx = c.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, c.width, c.height);
      }
      return;
    }

    let raf = 0;
    let decayRaf = 0;
    let delayTimeout = 0 as unknown as ReturnType<typeof setTimeout>;
    let start = 0;
    const dur = 650; // beam travel time per path
    const delay = 250; // delay before next beam starts (ms)

    // `waiting` is declared before draw so draw can avoid overwriting
    // glow while the decay/wait phase is active.
    let waiting = false;

    const draw = (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const paths = [leftRef.current, rightRef.current, centerRef.current];
      const p = paths[activeIdx];
      if (!p) return;

      const total = p.getTotalLength();
      const tail = total * 0.85; // visible beam length

      const head = progress * (total + tail);
      const from = Math.max(0, head - tail);

      const sx = canvas.width / 128;
      const sy = canvas.height / 55;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.globalAlpha = 0.1;
      [leftRef.current, centerRef.current, rightRef.current].forEach((rp) => {
        if (!rp) return;
        const L = rp.getTotalLength();
        ctx.beginPath();
        const first = rp.getPointAtLength(0);
        ctx.moveTo(first.x * sx, first.y * sy);
        for (let s = 1; s <= 200; s++) {
          const pt = rp.getPointAtLength((s / 200) * L);
          ctx.lineTo(pt.x * sx, pt.y * sy);
        }
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#111827";
        ctx.stroke();
      });
      ctx.restore();

      const gradStart = p.getPointAtLength(Math.max(0, from));
      const gradEnd = p.getPointAtLength(Math.min(head, total));
      const g = ctx.createLinearGradient(
        gradStart.x * sx,
        gradStart.y * sy,
        gradEnd.x * sx,
        gradEnd.y * sy
      );
      g.addColorStop(0, "rgba(168,85,247,0.0)");
      g.addColorStop(0.4, "rgba(168,85,247,0.7)");
      g.addColorStop(1, "rgba(125,211,252,0.95)");

      ctx.beginPath();
      const startPt = p.getPointAtLength(from);
      ctx.moveTo(startPt.x * sx, startPt.y * sy);
      const STEPS = 120;
      const segmentLength = Math.min(head, total) - from;
      for (let i = 1; i <= STEPS; i++) {
        const pt = p.getPointAtLength(from + (segmentLength * i) / STEPS);
        ctx.lineTo(pt.x * sx, pt.y * sy);
      }
      ctx.lineWidth = 3;
      ctx.strokeStyle = g;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(99,102,241,0.55)";
      ctx.stroke();

      const nearEnd = Math.min(head / total, 1);
      const easing = Math.pow(nearEnd, 2);
      if (!waiting) setGlowSafe(easing / 1.5);
    };

    const startDecay = () => {
      const step = () => {
        const next = Math.max(0.1, glowRef.current * 0.88);
        setGlowSafe(next);
        if (next > 0.101) {
          decayRaf = requestAnimationFrame(step);
        } else {
          decayRaf = 0;
          setActiveIdx((i) => (i + 1) % 3);
          start = performance.now();
          waiting = false;
          setGlowSafe(0.1);
        }
      };
      decayRaf = requestAnimationFrame(step);
    };

    const loop = (ts: number) => {
      if (!start) start = ts;
      let elapsed = ts - start;

      if (elapsed >= dur && !waiting) {
        waiting = true;
        setGlowSafe((prev) => prev * 0.85);
        delayTimeout = setTimeout(() => startDecay(), delay);
      }
      const t = Math.min(1, elapsed / dur);
      draw(t);

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      if (decayRaf) cancelAnimationFrame(decayRaf);
      if (delayTimeout) clearTimeout(delayTimeout as unknown as number);
    };
  }, [hovered, activeIdx]);

  return (
    <div
      className="relative group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative z-10 flex-none px-6 order-last pb-6">
        <h3 className="text-sm font-medium text-white">Auto-join</h3>
        <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
          Let your users discover and join organizations based on their email
          domain.
        </p>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-zinc-900"
        style={{ transform: "translateY(0rem)" }}
      ></div>
      <div
        className="relative flex-auto select-none"
        style={{ minHeight: "10.25rem" }}
        aria-hidden="true"
      >
        <div className="relative flex h-full flex-col items-center justify-center">
          <div className="absolute -z-10 mt-[calc(-108/16*1rem)] blur-[1px]">
            {[216, 280, 344, 408].map((size, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full border border-gray-400"
                animate={{
                  scale: hovered ? [1, 1.15, 1, 1] : 1,
                }}
                transition={{
                  duration: 3.7,
                  times: [0, 0.09, 0.25, 2.8],
                  delay: hovered ? i * 0.08 : 0,
                  repeat: hovered ? Infinity : 0,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
                initial={false}
                style={{
                  width: `${size / 16}rem`,
                  height: `${size / 16}rem`,
                  marginLeft: `calc(-${size} / 2 / 16 * 1rem)`,
                  marginTop: `calc(-${size} / 2 / 16 * 1rem)`,
                  opacity: [0.25, 0.18, 0.13, 0.09][i],
                }}
              />
            ))}
          </div>
          <div className="flex gap-4">
            {[
              "/avatars/person1.png",
              "/avatars/person3.png",
              "/avatars/person2.png",
            ].map((src, i) => {
              const displayIdx = [0, 2, 1][i];
              return (
                <motion.div
                  key={i}
                  className="size-10 rounded-full border-2 border-white bg-gray-50 shadow-[0_2px_3px_rgba(0,0,0,0.04),0_24px_68px_rgba(47,48,55,0.05),0_4px_6px_rgba(34,42,53,0.04),0_1px_1px_rgba(0,0,0,0.05)] ring-1 ring-gray-950/5 overflow-hidden"
                  animate={{
                    opacity: hovered
                      ? displayIdx === activeIdx
                        ? 1
                        : 0.25
                      : i === 0
                      ? 1
                      : 0.25,
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <Image
                    src={src}
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                </motion.div>
              );
            })}
          </div>

          <div className="relative aspect-[128/55] w-32">
            <svg
              viewBox="0 0 128 55"
              fill="none"
              aria-hidden="true"
              className="absolute inset-0 size-full stroke-gray-200/30"
            >
              <path d="M64 0v25M8 0v8c0 8.837 7.163 16 16 16h24c8.837 0 16 7.163 16 16v15M120 0v8c0 8.837-7.163 16-16 16H80c-5.922 0-11.093 3.218-13.86 8"></path>
            </svg>
            <div>
              <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
                width={256}
                height={110}
              />
              <svg width="0" height="0" aria-hidden="true">
                <path
                  ref={leftRef}
                  d="M8 0v8c0 8.837 7.163 16 16 16h24c8.837 0 16 7.163 16 16v15"
                />
              </svg>
              <svg width="0" height="0" aria-hidden="true">
                <path
                  ref={rightRef}
                  d="M120 0v8c0 8.837-7.163 16-16 16H80c-8.837 0-16 7.163-16 16v15"
                />
              </svg>
              <svg width="0" height="0" aria-hidden="true">
                <path ref={centerRef} d="M 64 0 V 55" />
              </svg>
            </div>
          </div>
          <div className="relative mt-px flex items-center gap-1.5 rounded-lg bg-white py-1 pl-1.5 pr-2 text-2xs font-medium text-gray-950 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] ring-1 ring-gray-950/5">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="size-4"
            >
              <g
                stroke="#9394A1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
              >
                <circle cx="8" cy="8" r="6.25"></circle>
                <path d="M8 5v6m3-3H5"></path>
              </g>
            </svg>
            Auto-join
            <motion.div
              className="absolute -bottom-1.5 left-1/2 -z-10 -ml-10 h-6 w-20 transform-gpu rounded-[50%] bg-gradient-to-r from-purple-500 from-25% to-sky-300 to-75% blur-sm"
              animate={{ opacity: 0.25 + 0.55 * glow, scale: 1 + 0.15 * glow }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
