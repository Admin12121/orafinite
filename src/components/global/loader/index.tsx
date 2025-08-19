import React, { useState, useEffect, useRef } from "react";
import { NumberTicker } from "@/components/global/NumberTicker";

const TRANSITION_MS = 700;

const Loader: React.FC = () => {
  const [logoState, setLogoState] = useState<"center" | "top">("center");
  const [show, setShow] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dispatchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = () => {
    setLogoState("top");

    if (dispatchTimerRef.current) clearTimeout(dispatchTimerRef.current);
    dispatchTimerRef.current = setTimeout(() => {
      window.dispatchEvent(new CustomEvent("loader:top"));
    }, TRANSITION_MS);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShow(false), TRANSITION_MS + 40);
  };

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      if (dispatchTimerRef.current) clearTimeout(dispatchTimerRef.current);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backdropFilter: "blur(12px)",
        background: "rgba(30,30,30,0.4)",
        transition: `background 0.4s`,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: logoState === "center" ? "50%" : "12px",
          transform:
            logoState === "center"
              ? "translate(-50%, -50%) scale(3)"
              : "translate(-50%, 0) scale(1)",
          transition: `all ${TRANSITION_MS}ms cubic-bezier(.7,.2,.3,1)`,
          color: "#fff",
          fontWeight: 700,
          fontSize: logoState === "center" ? "5vw" : "1.25rem",
          letterSpacing: "-0.1em",
          textShadow: "0 2px 24px #0008",
          pointerEvents: "none",
        }}
      >
        {">_"}
      </div>

      <NumberTicker
        value={100}
        startValue={1}
        onComplete={handleComplete}
        className="absolute right-10 bottom-5 whitespace-pre-wrap text-4xl md:text-6xl font-medium tracking-tighter text-black dark:text-white"
      />
    </div>
  );
};

export default Loader;
