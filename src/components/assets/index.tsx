import React from "react";
import Peep1 from "./peep-1.svg";
import Peep2 from "./peep-2.svg";
import Peep3 from "./peep-3.svg";
import Peep4 from "./peep-4.svg";
import Peep5 from "./peep-5.svg";
import Peep6 from "./peep-6.svg";
import Peep7 from "./peep-7.svg";
import Peep8 from "./peep-8.svg";

export const peepSvgs = [Peep1, Peep2, Peep3, Peep4, Peep5, Peep6, Peep7, Peep8];

export type PeepAvatarProps = {
  index?: number;
  seed?: string | number;
  className?: string;
  fallbackIndex?: number;
  title?: string;
};

function hashToIndex(seed: string | number, length: number) {
  const s = seed.toString();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return (h % length) + 1;
}

function renderSvgModule(
  mod: any,
  props: React.SVGProps<SVGSVGElement> & { className?: string; alt?: string }
) {
  // If it is already a React component (function)
  if (typeof mod === "function") {
    const Comp = mod as React.ComponentType<any>;
    return <Comp {...props} />;
  }
  // If it is a string URL
  if (typeof mod === "string") {
    return <img src={mod} className={props.className} alt={props.alt} />;
  }
  // If it is an object with a 'default' (sometimes SVGR default export)
  if (mod?.default && typeof mod.default === "function") {
    const Comp = mod.default as React.ComponentType<any>;
    return <Comp {...props} />;
  }
  // Next.js static asset object shape: { src, height, width, blurDataURL? }
  if (mod && typeof mod === "object" && typeof mod.src === "string") {
    return <img src={mod.src} className={props.className} alt={props.alt} />;
  }
  return (
    <div
      className={props.className}
      aria-label={props.alt}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#eee",
        color: "#444",
        fontSize: 10,
        width: 48,
        height: 48,
        borderRadius: "50%",
      }}
    >
      SVG?
    </div>
  );
}

export const PeepAvatar: React.FC<PeepAvatarProps> = ({
  index,
  seed,
  className,
  fallbackIndex,
  title,
}) => {
  const total = peepSvgs.length;
  let chosen: number;
  if (typeof index === "number" && index >= 1 && index <= total) {
    chosen = index;
  } else if (seed !== undefined) {
    chosen = hashToIndex(seed, total);
  } else if (fallbackIndex && fallbackIndex >= 1 && fallbackIndex <= total) {
    chosen = fallbackIndex;
  } else {
    chosen = Math.floor(Math.random() * total) + 1;
  }
  const raw = peepSvgs[chosen - 1];
  return renderSvgModule(raw, { className, alt: title || "avatar" });
};

const RandomPeep: React.FC<{ className?: string }> = ({ className }) => (
  <PeepAvatar className={className} />
);

export default RandomPeep;
