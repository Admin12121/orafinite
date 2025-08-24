import { PeepAvatar } from "@/components/assets";
import { SectionCards } from "./selection-card";
import { ChartBarActive } from "./chart";

export default function Page() {
  return (
    <div className="px-[24px]">
      <div className="relative w-full flex bg-blue-500 h-60 rounded-2xl ring-2 ring-offset-2 ring-blue-400 dark:ring-blue-500/50 ring-offset-white dark:ring-offset-neutral-900 p-2">
        <span className="absolute right-0 flex items-end justify-end h-[92%]">
          <h1 className="text-white text-4xl">Hi, Vicky</h1>
          <PeepAvatar className="size-60 ml-auto scale-[1.5] transform -translate-y-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              {/* <ChartBarActive /> */}
              {/* <ChartAreaInteractive /> */}
            </div>
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
