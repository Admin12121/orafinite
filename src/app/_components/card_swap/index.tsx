// @ts-nocheck
"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from "react";
import gsap from "gsap";
import { Safari } from "@/components/global/safari";
import { cn } from "@/lib/utils";

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-md border outline-1 ring-1 ring-neutral-500 ring-offset-1 ring-offset-neutral-800 bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] ${
      customClass ?? ""
    } ${rest.className ?? ""}`.trim()}
  />
));
Card.displayName = "Card";

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

const CardSwap = ({
  width = 360,
  height = 200,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  startOnHover = false,
  hoverTarget = null,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
  className,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const startTimeoutRef = useRef<number | undefined>();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => {
      if (!r.current) return;
      if (i === 0) {
        placeNow(
          r.current,
          makeSlot(0, cardDistance, verticalDistance, total),
          0
        );
      } else {
        gsap.set(r.current, {
          x: 0,
          y: 0,
          z: -60 * i,
          xPercent: -50,
          yPercent: -50,
          skewY: 0,
          transformOrigin: "center center",
          zIndex: total - i,
          force3D: true,
        });
      }
    });

    if (container.current) {
      gsap.set(container.current, {
        css: { transform: "translate(-50%, -50%) scale(0.8, 0.8)" },
        clearProps: "perspective",
      });
    }

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        {
          y: backSlot.y,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    const startAnimation = () => {
      if (intervalRef.current) return;
      swap();
      intervalRef.current = window.setInterval(swap, delay);
      tlRef.current?.play?.();
    };
    const stopAnimation = () => {
      tlRef.current?.pause?.();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      }
    };
    const enable3D = () => {
      if (!container.current) return;
      container.current.style.transition = "perspective 420ms ease";
      container.current.style.perspective = `900px`;
      gsap.to(container.current, {
        css: {
          transform: "translate(-100px, -50px) scale(0.75, 0.75)",
        },
        duration: 0.45,
        ease: "power2.out",
      });
      order.current.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        gsap.set(el, { zIndex: slot.zIndex });
        gsap.to(el, {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          skewY: skewAmount,
          duration: 0.45,
          ease: "power2.out",
        });
      });
    };

    const disable3D = () => {
      if (!container.current) return;
      order.current.forEach((idx, i) => {
        const el = refs[idx]?.current;
        if (!el) return;
        const backZ = i === 0 ? 0 : -60 * i;
        gsap.to(el, {
          x: 0,
          y: 0,
          z: backZ,
          skewY: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            gsap.set(el, { zIndex: refs.length - i });
          },
        });
      });
      gsap.to(container.current, {
        css: { transform: "translate(-50%, -50%) scale(0.8, 0.8)" },
        duration: 0.35,
        ease: "power2.in",
      });
      window.setTimeout(() => {
        if (container.current) container.current.style.perspective = "";
      }, 420);
    };
    const hoverNode =
      hoverTarget && hoverTarget.current
        ? hoverTarget.current
        : container.current;
    if (hoverNode) {
      const onEnter = () => {
        enable3D();
        if (startOnHover) {
          if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current);
          startTimeoutRef.current = window.setTimeout(() => {
            startAnimation();
            startTimeoutRef.current = undefined;
          }, 480);
        }
      };
      const onLeave = () => {
        if (startTimeoutRef.current) {
          clearTimeout(startTimeoutRef.current);
          startTimeoutRef.current = undefined;
        }
        if (startOnHover) stopAnimation();
        disable3D();
      };
      hoverNode.addEventListener("mouseenter", onEnter);
      hoverNode.addEventListener("mouseleave", onLeave);
      if (!startOnHover) {
        startAnimation();
      }
      return () => {
        hoverNode.removeEventListener("mouseenter", onEnter);
        hoverNode.removeEventListener("mouseleave", onLeave);
        if (startTimeoutRef.current) {
          clearTimeout(startTimeoutRef.current);
          startTimeoutRef.current = undefined;
        }
        stopAnimation();
        disable3D();
      };
    }
    startAnimation();

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
        intervalRef.current = undefined;
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);
      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        stopAnimation();
      };
    }

    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
        startTimeoutRef.current = undefined;
      }
      stopAnimation();
    };
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
    startOnHover,
    hoverTarget,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          },
        })
      : child
  );

  return (
    <div
      ref={container}
      className={cn(
        "absolute top-1/2 left-1/2 transform origin-center overflow-visible max-[768px]:scale-[0.75] max-[480px]:scale-[0.55] scale-[.8]",
        className
      )}
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export { CardSwap };

const Card_Swap = ({ className, ...props }: { className?: string }) => {
  const outerRef = React.useRef(null);

  return (
    <div
      ref={outerRef}
      className="relative group isolate flex flex-col rounded-2xl bg-zinc-900 shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] overflow-hidden "
    >
      <div className="absolute bottom-0 z-10 flex-none px-6 order-last pb-6">
        <h3 className="text-sm font-medium text-white">Ready-Made Templates</h3>
        <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
          Choose from modern, mobile-friendly designs. No coding customize
          layout to match your brand.
        </p>
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-zinc-900 z-5"
        style={{ transform: "translateY(0rem)" }}
      ></div>
      <div
        className="relative flex-auto select-none"
        style={{ minHeight: "10.25rem" }}
        aria-hidden="true"
      >
        <CardSwap
          cardDistance={60}
          verticalDistance={70}
          delay={5000}
          pauseOnHover={false}
          startOnHover={true}
          hoverTarget={outerRef}
          className={className}
          {...props}
        >
          <Card className="overflow-hidden">
            <div>
              <Safari url="orifinite.com" mode="simple" className="size-full" />
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div>
              <Safari url="orifinite.com" mode="simple" className="size-full" />
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div>
              <Safari url="orifinite.com" mode="simple" className="size-full" />
            </div>
          </Card>
        </CardSwap>
      </div>
    </div>
  );
};

export default Card_Swap;
