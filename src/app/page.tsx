"use client";

import { AnimatedShinyText } from "@/components/global/magic";
import { Safari } from "@/components/global/safari";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SecurityDashboard from "./_components/security";
import AnimatCard from "./_components/animated-card";
import CustomRolesPermissions from "./_components/customers";
import { ProductCard } from "./_components/product-card";
import Checkout from "./_components/payment-method";
import { FlickeringGrid } from "@/components/global/fliper-grid";
import SignIn from "@/components/global/signin-button";
import Encryption from "./_components/encryption-animation";
import AutoJoinCard from "./_components/customers/join";
import EncCard from "./_components/encryption-animation";

export default function Home() {
  const keypadRef = useRef<HTMLDivElement | null>(null);

  const oneBtn = useRef<HTMLButtonElement | null>(null);
  const twoBtn = useRef<HTMLButtonElement | null>(null);
  const threeBtn = useRef<HTMLButtonElement | null>(null);

  const oneText = useRef<HTMLSpanElement | null>(null);
  const twoText = useRef<HTMLSpanElement | null>(null);
  const threeText = useRef<HTMLSpanElement | null>(null);

  const configRef = useRef({
    theme: "system",
    muted: false,
    exploded: false,
    one: {
      travel: 26,
      text: "ok",
      key: "o",
      hue: 114,
      saturation: 1.4,
      brightness: 1.2,
      buttonRef: oneBtn,
      textRef: oneText,
    },
    two: {
      travel: 26,
      text: "go",
      key: "g",
      hue: 0,
      saturation: 0,
      brightness: 1.4,
      buttonRef: twoBtn,
      textRef: twoText,
    },
    three: {
      travel: 18,
      text: "create.",
      key: "Enter",
      hue: 0,
      saturation: 0,
      brightness: 0.4,
      buttonRef: threeBtn,
      textRef: threeText,
    },
  });
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const switchIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isCardHovered) {
      if (switchIntervalRef.current) {
        clearInterval(switchIntervalRef.current);
        switchIntervalRef.current = null;
      }
      return;
    }
    const id = window.setInterval(() => {
      setActiveCardIndex((p) => (p + 1) % 2);
    }, 3500);
    switchIntervalRef.current = id;
    return () => {
      clearInterval(id);
      switchIntervalRef.current = null;
    };
  }, [isCardHovered]);

  useEffect(() => {
    const cfg = configRef.current;

    document.documentElement.dataset.theme = cfg.theme;

    const clickAudio = new Audio(
      "https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3"
    );
    clickAudio.muted = cfg.muted;

    const playClick = () => {
      if (!cfg.muted) {
        try {
          clickAudio.currentTime = 0;
          void clickAudio.play();
        } catch {}
      }
    };

    const ids = ["one", "two", "three"] as const;
    const pointerDownHandlers: Array<() => void> = [];
    const pointerUpHandlers: Array<() => void> = [];

    for (const id of ids) {
      const entry = cfg[id];
      const btn = entry.buttonRef.current;
      const txt = entry.textRef.current;
      if (!btn) continue;

      btn.style.setProperty("--travel", String(entry.travel));
      btn.style.setProperty("--saturate", String(entry.saturation));
      btn.style.setProperty("--hue", String(entry.hue));
      btn.style.setProperty("--brightness", String(entry.brightness));

      if (txt) txt.textContent = entry.text;

      const onDown = () => {
        btn.dataset.pressed = "true";
        playClick();
      };
      const onUp = () => {
        btn.dataset.pressed = "false";
      };

      btn.addEventListener("pointerdown", onDown);
      btn.addEventListener("pointerup", onUp);
      btn.addEventListener("pointercancel", onUp);
      btn.addEventListener("mouseleave", onUp);

      pointerDownHandlers.push(() => {
        btn.removeEventListener("pointerdown", onDown);
      });
      pointerUpHandlers.push(() => {
        btn.removeEventListener("pointerup", onUp);
        btn.removeEventListener("pointercancel", onUp);
        btn.removeEventListener("mouseleave", onUp);
      });
    }

    const onKeyDown = (event: KeyboardEvent) => {
      for (const id of ids) {
        const entry = cfg[id];
        const btn = entry.buttonRef.current;
        if (!btn) continue;
        if (event.key === entry.key) {
          btn.dataset.pressed = "true";
          playClick();
        }
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      for (const id of ids) {
        const entry = cfg[id];
        const btn = entry.buttonRef.current;
        if (!btn) continue;
        if (event.key === entry.key) {
          btn.dataset.pressed = "false";
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    if (keypadRef.current) {
      keypadRef.current.style.setProperty("opacity", "1");
    }

    return () => {
      pointerDownHandlers.forEach((remove) => remove());
      pointerUpHandlers.forEach((remove) => remove());
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  return (
    <main>
      <div className="relative mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
        <div className="pointer-events-none absolute inset-x-[calc(theme(inset.6)+1px)] inset-y-0 z-30 opacity-50 md:inset-x-[calc(theme(inset.8)+1px)]">
          <div
            className="absolute opacity-30 inset-y-0 w-px -right-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 4px)",
              backgroundRepeat: "repeat-y",
              backgroundPosition: "center",
              maskImage:
                "linear-gradient(transparent, white 40rem, white calc(100% - 40rem), transparent)",
              WebkitMaskImage:
                "linear-gradient(transparent, white 40rem, white calc(100% - 40rem), transparent)",
              marginTop: "-2rem",
              marginBottom: "-2rem",
            }}
          ></div>
          <div
            className="absolute opacity-30 inset-y-0 w-px -left-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 4px)",
              backgroundRepeat: "repeat-y",
              backgroundPosition: "center",
              maskImage:
                "linear-gradient(transparent, white 40rem, white calc(100% - 40rem), transparent)",
              WebkitMaskImage:
                "linear-gradient(transparent, white 40rem, white calc(100% - 40rem), transparent)",
              marginTop: "-2rem",
              marginBottom: "-2rem",
            }}
          ></div>
        </div>
        <div className="font-sans items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 h-full flex justify-center !pt-52 flex-col">
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Introducing Orifinite</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </div>
          <h1
            className="text-7xl lg:text-8xl 2xl:text-9xl text-center"
            style={{ lineHeight: ".8", fontFamily: "var(--font-vrc)" }}
          >
            NEW ERA OF <br />
            <span className="text-[#e2f75d]">Business.</span>
          </h1>
          <div
            className="keypad -top-[100px]"
            ref={keypadRef}
            style={{ opacity: 0, transition: "opacity .3s ease" }}
          >
            <div className="keypad__base">
              <img
                src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86"
                alt=""
              />
            </div>

            <button
              id="one"
              ref={oneBtn}
              className="key keypad__single keypad__single--left"
              data-pressed="false"
              type="button"
            >
              <span className="key__mask">
                <span className="key__content">
                  <span className="key__text !text-center" ref={oneText}>
                    ok
                  </span>
                  <img
                    src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                    alt=""
                  />
                </span>
              </span>
            </button>

            <button
              id="two"
              ref={twoBtn}
              className="key keypad__single"
              data-pressed="false"
              type="button"
            >
              <span className="key__mask">
                <span className="key__content">
                  <span className="key__text !text-center" ref={twoText}>
                    go
                  </span>
                  <img
                    src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                    alt=""
                  />
                </span>
              </span>
            </button>

            <button
              id="three"
              ref={threeBtn}
              className="key keypad__double"
              data-pressed="false"
              type="button"
            >
              <span className="key__mask">
                <span className="key__content">
                  <span
                    className="key__text !left-[15px] !top-[20px] !text-center"
                    ref={threeText}
                  >
                    create.
                  </span>
                  <img
                    src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86"
                    alt=""
                  />
                </span>
              </span>
            </button>
          </div>
        </div>
        <div className="relative w-full h-[25px] lg:max-w-[64rem] xl:max-w-[80rem] sm:max-w-[40rem] md:max-w-[48rem] overflow-hidden">
          <FlickeringGrid
            className="inset-0 z-0 size-full"
            squareSize={2}
            gridGap={3}
            color="#6B7280"
            maxOpacity={0.5}
            flickerChance={0.1}
            height={25}
            width={1700}
          />
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
        <div className="relative pb-[calc(theme(padding.32)+theme(height.11))] pt-32">
          <div className="text-center">
            <h2 className="text-sm font-medium text-[#e2f75d]">
              User authentication
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] text-white">
              Everything you need to build business on web.
            </p>
            <p className="mx-auto mb-4 mt-4 max-w-xl text-balance text-zinc-400">
              <span
                data-br="_R_1m4clubstmivb_"
                data-brr="1"
                style={{
                  display: "inline-block",
                  verticalAlign: "top",
                  textDecoration: "inherit",
                  textWrap: "balance",
                }}
              >
                Ever feel like your business requirements change with the
                season? orafinite keeps up with the latest trends and security
                best practices.
              </span>
              <script>
                self.__wrap_n!=1&&self.__wrap_b("_R_1m4clubstmivb_",1)
              </script>
            </p>
            <a
              className="group relative isolate inline-flex items-center justify-center overflow-hidden text-left font-medium transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity text-sm text-white"
              target=""
              href="/user-authentication"
            >
              Explore user authentication
              <svg
                viewBox="0 0 10 10"
                aria-hidden="true"
                className="ml-2 h-2.5 w-2.5 flex-none opacity-60 group-hover:translate-x-6 group-hover:opacity-0 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                ></path>
              </svg>
              <svg
                viewBox="0 0 10 10"
                aria-hidden="true"
                className="-ml-2.5 h-2.5 w-2.5 flex-none -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition duration-300 ease-[cubic-bezier(0.4,0.36,0,1)] before:duration-300 before:ease-[cubic-bezier(0.4,0.36,0,1)] before:transtion-opacity"
              >
                <path
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="m7.25 5-3.5-2.25v4.5L7.25 5Z"
                ></path>
              </svg>
            </a>
          </div>
          <div className="relative mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <div className="mt-16 grid grid-cols-1 grid-rows-[repeat(12,minmax(0,260px))] gap-2 md:grid-cols-2 md:[grid-template-rows:repeat(6,minmax(0,260px))] xl:grid-flow-col xl:grid-cols-3 xl:[grid-template-rows:repeat(4,minmax(0,260px))] h-full">
              <div className="relative group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
                <div className="relative z-10 flex-none px-6 pt-6 h-full">
                  <Safari
                    url="orifinite.com"
                    mode="simple"
                    className="size-full scale-[.8] absolute right-0 bottom-0 transform group-hover:translate-y-10 group-hover:translate-x-40 transition ease-in-out duration-500"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-zinc-900"
                    style={{ transform: "translateY(0rem)" }}
                  ></div>
                </div>
                <div className="relative z-10 flex-none px-6 order-last pb-6 -top-[110px]">
                  <h3 className="text-sm font-medium text-white">
                    Advanced security
                  </h3>
                  <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
                    Clerk is SOC 2 type 2 compliant and CCPA compliant. We
                    conduct regular third-party audits and penetration tests.
                  </p>
                </div>
              </div>
              <CustomRolesPermissions />
              <div className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
                <AutoJoinCard />
              </div>
              <div className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden row-span-2">
                <div className="relative z-10 flex-none px-6 pt-6">
                  <h3 className="text-sm font-medium text-white">
                    Fraud and Abuse Prevention
                  </h3>
                  <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
                    Reduce fraudulent sign-ups and free trial abuse by blocking
                    high-risk disposable email domains and restricting the use
                    of email subaddresses with the “+” separator.
                  </p>
                </div>
                <SecurityDashboard />
              </div>
              <EncCard />
              <div className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden">
                <svg
                  className="half-circle-pie m-auto rtl:-scale-x-100"
                  viewBox="0 0 34 17"
                  width="340px"
                  height="170px"
                  role="img"
                  aria-label="Half circle chart showing 9 of 14 segments filled"
                >
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(6.43) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(19.29) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(32.15) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(45.01) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(57.87) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(70.72999999999999) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(83.59) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(96.44999999999999) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-[#e2f75d] transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(109.31) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-zinc-100 dark:fill-zinc-700 transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(122.16999999999999) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-zinc-100 dark:fill-zinc-700 transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(135.03) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-zinc-100 dark:fill-zinc-700 transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(147.89) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-zinc-100 dark:fill-zinc-700 transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(160.75) translate(-13.5,0)"
                  ></path>
                  <path
                    className="fill-zinc-100 dark:fill-zinc-700 transition-colors duration-300"
                    d="M -2.7 -1.5 L 2.7 -0.98 C 3.1 -0.93 3.5 -0.582 3.5 -0.182 L 3.5 0.217 C 3.5 0.629 3.1 0.93 2.7 0.98 L -2.7 1.5 C -3.142 1.5 -3.5 1.142 -3.5 0.7 L -3.5 -0.7 C -3.5 -1.142 -3.142 -1.5 -2.7 -1.5 Z"
                    transform="translate(17,17) rotate(173.61) translate(-13.5,0)"
                  ></path>
                </svg>
              </div>
              <div className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]">
                <AnimatCard />
              </div>
              <div
                className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden row-span-2"
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
              >
                <div className="relative z-10 flex-none px-6 pt-6">
                  <h3 className="text-sm font-medium">
                    Organization UI Components
                  </h3>
                  <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
                    Clerk's UI components add turn-key simplicity to complex
                    Organization management tasks.
                  </p>
                </div>
                <div className="mx-2 mt-2 gap-2 flex flex-col items-center justify-center h-full">
                  <div
                    className={cn(
                      "w-full h-full flex items-center justify-center transition-all duration-300",
                      !isCardHovered && "filter grayscale-[1]"
                    )}
                  >
                    <AnimatePresence mode="wait">
                      {activeCardIndex === 0 ? (
                        <motion.div
                          key="product"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="w-full h-full mt-[15px]"
                        >
                          <ProductCard />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="checkout"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                          className="w-full h-full flex items-end mb-3"
                        >
                          <Checkout />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              <div className="group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative flex items-center justify-center bg-white pt-32">
        <div className="absolute inset-x-0 -top-11 mt-[calc(-3/16*1rem)] flex items-end">
          <div className="mr-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-white"></div>
          <div className="flex justify-between mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
            <svg
              viewBox="0 0 56 48"
              aria-hidden="true"
              className="-ml-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-white"
            >
              <path d="M 2.686 3 H -4 V 48 H 56 V 47 H 53.314 A 8 8 0 0 1 47.657 44.657 L 8.343 5.343 A 8 8 0 0 0 2.686 3 Z"></path>
            </svg>
            <svg
              viewBox="0 0 56 48"
              aria-hidden="true"
              className="-mr-1.5 mb-[calc(-1/16*1rem)] w-14 flex-none overflow-visible fill-white"
            >
              <path d="M 53.314 3 H 60 V 48 H 0 V 47 H 2.686 A 8 8 0 0 0 8.343 44.657 L 47.657 5.343 A 8 8 0 0 1 53.314 3 Z"></path>
            </svg>
          </div>
          <div className="ml-[calc(-1*(theme(spacing.8)-theme(spacing[1.5])))] h-11 flex-auto bg-white"></div>
        </div>
        <div className="text-center">
          <p className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.015em] text-neutral-900">
            Built on a foundation of fast, production-grade tooling
          </p>
          <p className="mx-auto mb-4 mt-4 max-w-xl text-balance text-zinc-400">
            <span
              data-br="_R_1m4clubstmivb_"
              data-brr="1"
              style={{
                display: "inline-block",
                verticalAlign: "top",
                textDecoration: "inherit",
                textWrap: "balance",
              }}
            >
              Ever feel like authentication requirements change with the season?
              Clerk keeps up with the latest trends and security best practices.
            </span>
          </p>
        </div>
        <div className="absolute bottom-0 mx-auto w-full px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[80rem]">
          <div className="relative -mx-2.5 flex -bottom-1 -mt-12">
            <svg
              viewBox="0 0 64 48"
              className="w-16 flex-none fill-neutral-950"
              aria-hidden="true"
            >
              <path d="M51.657 2.343 12.343 41.657A8 8 0 0 1 6.686 44H0v4h64V0h-6.686a8 8 0 0 0-5.657 2.343Z"></path>
            </svg>
            <div className="-mx-px flex-auto bg-neutral-950"></div>
            <svg
              viewBox="0 0 64 48"
              className="w-16 flex-none fill-neutral-950"
              aria-hidden="true"
            >
              <path d="m12.343 2.343 39.314 39.314A8 8 0 0 0 57.314 44H64v4H0V0h6.686a8 8 0 0 1 5.657 2.343Z"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="h-[50vh]"></div>
    </main>
  );
}
