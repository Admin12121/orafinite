import { NumberTicker } from "@/components/global/NumberTicker";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const rotations = [
  6.43, 19.29, 32.15, 45.01, 57.87, 70.73, 83.59, 96.45, 109.31, 122.17, 135.03,
  147.89, 160.75, 173.61,
];

const colorStops = [
  { t: 0, c: [239, 68, 68] },
  { t: 0.33, c: [251, 146, 60] },
  { t: 0.66, c: [234, 179, 8] },
  { t: 0.85, c: [0, 185, 0] },
  { t: 1, c: [0, 255, 0] },
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function colorFor(count: number) {
  const max = rotations.length - 1;
  const t = Math.max(0, Math.min(1, count / max));
  let a = colorStops[0];
  let b = colorStops[colorStops.length - 1];
  for (let i = 0; i < colorStops.length - 1; i++) {
    const s = colorStops[i];
    const n = colorStops[i + 1];
    if (t >= s.t && t <= n.t) {
      a = s;
      b = n;
      break;
    }
  }
  const localT = (t - a.t) / (b.t - a.t || 1);
  const r = lerp(a.c[0], b.c[0], localT);
  const g = lerp(a.c[1], b.c[1], localT);
  const bl = lerp(a.c[2], b.c[2], localT);
  return `rgb(${r} ${g} ${bl})`;
}

const PerformanceMeter: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [count, setCount] = useState(8);
  const countRef = useRef<number>(count);
  const [tickerValue, setTickerValue] = useState(
    () => Math.round((count / (rotations.length - 1)) * 100 * 100) / 100
  );
  const tickerAnimRef = useRef({ v: tickerValue });
  const inDescentRef = useRef(false);
  const returningToIdleRef = useRef(false);
  const [sign, setSign] = useState<string>(() => "+");
  const lastAnimVal = useRef<number>(tickerValue);
  const timers = useRef<number[]>([]);
  const runToken = useRef(0);

  const setCountSafe = (updater: number | ((prev: number) => number)) => {
    setCount((prev) => {
      const next =
        typeof updater === "function" ? (updater as any)(prev) : updater;
      countRef.current = next;
      return next;
    });
  };
  useEffect(() => {
    return () => timers.current.forEach((t) => clearTimeout(t));
  }, []);

  useEffect(() => {
    const target = (count / (rotations.length - 1)) * 100;
    gsap.killTweensOf(tickerAnimRef.current);
    lastAnimVal.current = tickerAnimRef.current.v ?? tickerValue;
    gsap.to(tickerAnimRef.current, {
      v: target,
      duration: 0.45,
      ease: "power2.out",
      onUpdate: () => {
        const current = Number(tickerAnimRef.current.v);
        if (current > lastAnimVal.current) setSign("+");
        else if (current < lastAnimVal.current) setSign("-");
        setTickerValue(Number(current.toFixed(2)));
        lastAnimVal.current = current;
      },
    });
    return () => gsap.killTweensOf(tickerAnimRef.current);
  }, [count]);

  useEffect(() => {
    tickerAnimRef.current.v = tickerValue;
  }, []);

  useEffect(() => {
    const sequence = [12, 4, 12];
    const stepMs = 70;
    const pauseMs = 200;

    const sleep = (ms: number) =>
      new Promise<void>((res) => {
        const id = window.setTimeout(() => res(), ms);
        timers.current.push(id as unknown as number);
      });
    const stepTo = async (target: number, token: number) => {
      while (token === runToken.current && countRef.current !== target) {
        setCountSafe((prev) => {
          if (prev < target) return prev + 1;
          if (prev > target) return prev - 1;
          return prev;
        });
        await sleep(stepMs);
      }
    };

    const run = async (token: number) => {
      for (let i = 0; i < sequence.length && token === runToken.current; i++) {
        const target = sequence[i];
        await stepTo(target, token);
        if (token !== runToken.current) break;
        await sleep(pauseMs);
      }
    };

    if (isHovered) {
      runToken.current += 1;
      const token = runToken.current;
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
      (async () => {
        if (countRef.current > 0) {
          inDescentRef.current = true;
          await stepTo(0, token);
          inDescentRef.current = false;
        }
        if (token === runToken.current) {
          await run(token);
        }
      })();
    } else {
      runToken.current += 1;
      const token = runToken.current;
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];

      (async () => {
        await stepTo(0, token);
        if (token !== runToken.current) return;
        await sleep(120);
        returningToIdleRef.current = true;
        await stepTo(8, token);
        returningToIdleRef.current = false;
      })();
    }

    return () => {
      runToken.current += 1;
      timers.current.forEach((t) => clearTimeout(t));
      timers.current = [];
    };
  }, [isHovered]);

  const fillColor = colorFor(count);
  const idleMuted = "#3b3b3e";
  const offColor = "#28282b";
  return (
    <div
      className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-2 mt-2 gap-2 flex flex-col items-center justify-center h-full scale-[.8]">
        <svg
          className="half-circle-pie m-auto rtl:-scale-x-100"
          viewBox="0 0 34 17"
          width="340px"
          height="170px"
          role="img"
          aria-label="Half circle meter"
        >
          {rotations.map((rot, i) => {
            const isOn = i < count;
            const isIdleDisplay = !isHovered && count === 8;
            const shouldUseMuted =
              isIdleDisplay ||
              inDescentRef.current ||
              returningToIdleRef.current;
            const fill = isOn
              ? shouldUseMuted
                ? idleMuted
                : fillColor
              : offColor;
            return (
              <path
                key={i}
                d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                transform={`translate(17,17) rotate(${rot}) translate(-13.5,0)`}
                fill={fill}
                className="transition-colors duration-200"
              />
            );
          })}
        </svg>
        <h2 className="absolute bottom-0">
          {sign}{" "}
          <NumberTicker
            value={tickerValue}
            decimalPlaces={2}
            className="whitespace-pre-wrap text-xl font-medium tracking-tighter text-black dark:text-white"
          />
        </h2>
      </div>

      <div className="relative z-10 flex-none px-6 order-last pb-6">
        <h3 className="text-sm font-medium text-white">Central Dashboard</h3>
        <p className="mt-2 text-pretty text-sm/5 text-gray-400">
          Control everything from one place—orders, inventory, customers,
          payments, and reports.
        </p>
      </div>
    </div>
  );
};

export default PerformanceMeter;
