import { TrendingUp, TrendingDown, MoveUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      <Card className="@container/card rounded-3xl">
        <CardHeader className="space-y-5">
          <CardDescription className="text-xl">Gross Revenue</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-5xl">
            रु 3,534.<span className="text-4xl text-neutral-400">09</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="w-10 h-10 rounded-full">
              <MoveUpRight />
            </Badge>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardFooter className="flex-col items-start gap-1.5 text-neutral-700">
          <div className="line-clamp-1 flex gap-2 font-medium">
            From Dec 01, 2025 - Jan 30, 2026
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-3xl">
        <CardHeader className="space-y-5">
          <CardDescription className="text-xl">Order</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-5xl">
            25
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="w-10 h-10 rounded-full">
              <MoveUpRight />
            </Badge>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardFooter className="flex-col items-start gap-1.5 text-neutral-700">
          <div className="line-clamp-1 flex gap-2 font-medium">
            From Dec 01, 2025 - Jan 30, 2026
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card rounded-3xl">
        <CardHeader className="space-y-5">
          <CardDescription className="text-xl">Delivery Charge</CardDescription>
          <CardTitle className="text-5xl font-semibold tabular-nums @[250px]/card:text-5xl">
            रु 1,234.<span className="text-4xl text-neutral-400">00</span>
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="w-10 h-10 rounded-full">
              <MoveUpRight />
            </Badge>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardFooter className="flex-col items-start gap-1.5 text-neutral-700">
          <div className="line-clamp-1 flex gap-2 font-medium">
            From Dec 01, 2025 - Jan 30, 2026
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
