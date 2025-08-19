"use client";

import { useInView, useMotionValue, useSpring } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: number;
  decimalPlaces?: number;
  onComplete?: () => void;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  onComplete,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const calledRef = useRef(false);
  const motionValue = useMotionValue(direction === "down" ? value : startValue);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const target = direction === "down" ? startValue : value;
  const EPS = 0.01;

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => motionValue.set(target), delay * 500);
    return () => clearTimeout(t);
  }, [isInView, delay, motionValue, target]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
      if (!calledRef.current && Math.abs(latest - target) < EPS) {
        calledRef.current = true;
        onComplete?.();
      }
    });
    return unsub;
  }, [spring, decimalPlaces, target, onComplete]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tabular-nums tracking-wider text-black dark:text-white",
        className,
      )}
      {...props}
    >
      {startValue}
    </span>
  );
}
