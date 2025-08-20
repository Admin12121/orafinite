import * as React from "react";

import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AnimatedCard({ className, ...props }: CardProps) {
  return (
    <div
      role="region"
      aria-labelledby="card-title"
      aria-describedby="card-description"
      className={cn(
        "group/animated-card relative w-full h-full overflow-hidden",
        className
      )}
      {...props}
    />
  );
}

export function CardVisual({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("h-[270px] w-full overflow-hidden", className)}
      {...props}
    />
  );
}

import { Visual3 } from "./visual";

export function AnimatCard() {
  return (
    <AnimatedCard>
      <CardVisual>
        <Visual3 mainColor="#28282b" secondaryColor="#e2f75d" />
      </CardVisual>
      <div className="relative z-10 flex-none px-6 order-last pb-6 -top-[90px]">
        <h3 className="text-sm font-medium text-white">Smart Analytics</h3>
        <p className="mt-2 text-pretty text-sm/5 text-gray-400">
          Track revenue, sales trends, in real time to
          make smarter business decisions.
        </p>
      </div>
    </AnimatedCard>
  );
}

export default AnimatCard;
