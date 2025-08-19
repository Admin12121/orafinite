import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const symbols =
  "ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz123456789/?@=+-.$&!";

const symbolFontSize = 12;
const gap = 5;

const Encryption: React.FC = () => {
  const rectRef = useRef<HTMLDivElement | null>(null);
  const axleRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timeoutIds: number[] = [];

    function generateRandomInt(max: number, min = 0) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function animateSymboles(
      symbolGroups: HTMLElement[][],
      prevActiveSymbols?: HTMLElement[]
    ) {
      // clear previous active
      if (prevActiveSymbols) {
        prevActiveSymbols.forEach((item) => item.classList.remove("active"));
      }

      const activeSymbols = symbolGroups[0];

      if (activeSymbols) {
        activeSymbols.forEach((item) => item.classList.add("active"));
      }

      const id = window.setTimeout(() => {
        if (symbolGroups.length > 1) {
          animateSymboles(symbolGroups.slice(1), activeSymbols);
        } else {
          // final cleanup for last frame: remove active after a short delay
          const cleanupId = window.setTimeout(() => {
            activeSymbols?.forEach((it) => it.classList.remove("active"));
          }, 100);
          timeoutIds.push(cleanupId);
        }
      }, 100);

      timeoutIds.push(id);
    }

    function appTrigger() {
      const rect = rectRef.current;
      const card = cardRef.current;
      if (!rect || !card) return;

      // clear any previous content
      rect.innerHTML = "";

      const rectBounds = rect.getBoundingClientRect();
      const rectWidth = rectBounds.width;
      const rectHeight = rectBounds.height;

      const symbolePerColumn = Math.ceil(rectHeight / (symbolFontSize + gap));

      for (let i = 0; i < symbolePerColumn; i++) {
        const row = document.createElement("div");
        row.classList.add("row");

        let filledRows = 0;
        // keep adding spans until row fills horizontally
        while (filledRows < rectWidth) {
          const randomSymbolIndex = generateRandomInt(symbols.length - 1);
          const randomSymbol = symbols[randomSymbolIndex];

          const symboleSpan = document.createElement("span");
          symboleSpan.innerText = randomSymbol;

          row.appendChild(symboleSpan);
          rect.appendChild(row);

          // measure span after appended
          const spanWidth = symboleSpan.getBoundingClientRect().width || 8;
          filledRows += spanWidth + gap;
        }
      }

      rect.classList.add("animate");
      card.classList.add("animate");
      // ensure animations start
      card.style.animationPlayState = "running";
      rect.style.animationPlayState = "running";
    }

    function onAnimationStart(event: AnimationEvent) {
      const rect = rectRef.current;
      if (!rect) return;
      if ((event as any).animationName === "hide") {
        const rowsNumber = rect.children.length;
        if (rowsNumber === 0) return;
        const columnsNumber = rect.childNodes[0].childNodes.length;
        if (columnsNumber === 0) return;

        const groups: HTMLElement[][] = [];

        for (let i = 0; i < 10; i++) {
          groups[i] = [];
          for (let j = 0; j < rowsNumber; j++) {
            const row = rect.childNodes[j] as HTMLElement;
            const y = generateRandomInt(columnsNumber - 1);
            const symbol = row.childNodes[y] as HTMLElement;
            if (symbol) groups[i].push(symbol);
          }
        }

        animateSymboles(groups, []);
      }
    }

    function onAnimationEnd(event: AnimationEvent) {
      const rect = rectRef.current;
      const card = cardRef.current;
      if (!rect || !card) return;

      if ((event as any).animationName === "animateRect") {
        // reset: remove children and re-trigger population
        rect.classList.remove("animate");
        card.classList.remove("animate");

        // clear content and re-run appTrigger to rebuild rows
        rect.innerHTML = "";
        // small delay helps ensure animations fully stopped before restart
        const id = window.setTimeout(() => {
          appTrigger();
        }, 20);
        timeoutIds.push(id);
      }
    }

    // initialize
    appTrigger();

    const rectEl = rectRef.current;
    if (rectEl) {
      rectEl.addEventListener(
        "animationstart",
        onAnimationStart as EventListener
      );
      rectEl.addEventListener("animationend", onAnimationEnd as EventListener);
    }

    // cleanup on unmount
    return () => {
      if (rectEl) {
        rectEl.removeEventListener(
          "animationstart",
          onAnimationStart as EventListener
        );
        rectEl.removeEventListener(
          "animationend",
          onAnimationEnd as EventListener
        );
      }
      timeoutIds.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return (
    <div className="relative w-full h-full scale-[.75]">
      <div id="card" ref={cardRef} />
      <div id="rect" className="text-zinc-400" ref={rectRef} />
      <div id="axle" ref={axleRef} />
    </div>
  );
};

export { Encryption };

const EncCard = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  return (
    <div
      className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <Encryption />
      <div className="relative z-10 flex-none px-6 order-last pb-6">
        <h3 className="text-sm font-medium text-white">Passwords</h3>
        <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
          Simple and secure password authentication, complete with breach
          detection and recovery options.
        </p>
      </div>
      <div
        className="pointer-events-none relative flex-auto select-none isolate"
        style={{ minHeight: "10.25rem" }}
        aria-hidden="true"
      >
        <motion.div
          className="absolute inset-0 flex flex-col items-center gap-4 group-hover:-translate-y-[2rem] transition-all duration-300 ease-initial"
        >
          <div className="absolute inset-0 top-[5.25rem] flex justify-center overflow-hidden [mask:linear-gradient(black,transparent)]">
            <svg
              width="317"
              height="214"
              viewBox="0 0 317 214"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.6502 2.38322L2.30334 22.0051C0.827423 23.502 0 25.5197 0 27.6219L0 214L317 214L317 27.6219C317 25.5197 316.173 23.502 314.697 22.0051L295.35 2.38322C293.846 0.858434 291.794 0 289.653 0L27.3468 0C25.2055 0 23.1536 0.858435 21.6502 2.38322Z"
                fill="#2B2B30"
                stroke="white"
                strokeOpacity="0.04"
              ></path>
            </svg>
          </div>
          <div className="z-10 mt-[2.875rem] size-[4.5rem] rounded-full bg-zinc-950 p-1 shadow-[0_1px_0_theme(colors.white/5%)] [&amp;_div]:rounded-full">
            <div className="relative size-full overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-850 shadow-[inset_0_1px_0_theme(colors.white/8%)] rounded-full">
              <div className="absolute inset-4 bg-gradient-to-b from-gray-850 to-gray-800/50 shadow-[0_1px_0_theme(colors.white/2%),0_-1px_0_theme(colors.white/6%),0_-2px_4px_theme(colors.white/2%),inset_0_1px_1px_theme(colors.black/20%)] rounded-full"></div>
              <div className="relative z-10 size-full bg-[repeating-radial-gradient(theme(colors.black/20%)_0.125rem,transparent_0.25rem)]">
                <div className="flex size-full items-center justify-center drop-shadow-[0_1px_0_theme(colors.white/10%)]">
                    <div
                    style={{ transform: "rotate(0deg)" }}
                    className={`transition-all ease-initial duration-300 ${isCardHovered ? "delay-[1500ms] rotate-90" : "delay-[100ms] rotate-0"}`}
                    >
                    <svg
                      width="8"
                      height="36"
                      viewBox="0 0 8 36"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="fill-zinc-950"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M3 0C1.34315 0 0 1.34315 0 3V19.5858C0 19.851 0.105357 20.1054 0.292893 20.2929L3.29289 23.2929C3.68342 23.6834 3.68342 24.3166 3.29289 24.7071L0.292893 27.7071C0.105357 27.8946 0 28.149 0 28.4142V33C0 34.6569 1.34315 36 3 36H5C6.65685 36 8 34.6569 8 33V16.4142C8 16.149 7.89464 15.8946 7.70711 15.7071L4.70711 12.7071C4.31658 12.3166 4.31658 11.6834 4.70711 11.2929L7.70711 8.29289C7.89464 8.10536 8 7.851 8 7.58579V3C8 1.34315 6.65685 0 5 0H3Z"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-0 shadow-[inset_2.5px_-2.5px_0_-2px_theme(colors.white/8%)]"
                style={{ transform: "rotate(90deg)", opacity: 0 }}
              ></div>
              <div
                className="absolute inset-0 shadow-[inset_-2.5px_2.5px_0_-2px_theme(colors.white/8%)]"
                style={{ transform: "rotate(-90deg)", opacity: 0 }}
              ></div>
              <div
                className="absolute left-1/2 top-0 h-full w-10 bg-[linear-gradient(90deg,transparent,theme(colors.white/50%)_30%,white,theme(colors.white/50%)_70%,transparent)] opacity-10"
                style={{
                  transform:
                    "translateX(-125%) translateY(-75%) rotate(45deg) scaleY(1.2)",
                }}
              ></div>
            </div>
          </div>
          <div
            className="relative h-7 w-56 rounded-md bg-zinc-900 bg-gradient-to-b from-zinc-800 to-zinc-850 shadow-md shadow-black/10 ring-1 ring-black group-hover:translate-y-[1rem] group-hover:opacity-100 transition-all ease-initial duration-300"
            style={{ transform: "translateY(0rem)", opacity: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center gap-1.5 rounded-[inherit] border border-[#e2f75d] bg-[#e2f75d]/5 px-3 shadow-[0_0_6px_3px] shadow-[#e2f75d]/10 group-hover:opacity-100 transition-all ease-in-out duration-300 opacity-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="size-1 rounded-full bg-[#e2f75d] shadow-sm shadow-black/40"
                  initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
                  animate={
                    isCardHovered
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, scale: 0.6, filter: "blur(10px)" }
                  }
                  transition={{
                    duration: 0.36,
                    // start whole sequence after 300ms, then stagger each dot
                    delay: 0.3 + i * 0.06,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default EncCard;
