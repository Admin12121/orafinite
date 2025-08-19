"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/global/glass-card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Icons from "@/lib/icons";

const Checkout = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    "esewa"
  );

  const items = [
    {
      title: "Cash On Delivery",
      name: "cash",
      icons: ["cash"],
      content: (
        <div className="flex items-center gap-4 p-2 justify-center flex-col">
          <div className="p-5 flex items-center gap-4 justify-center flex-col">
            <div className="flex items-center justify-center flex-col">
              <p className="text-center dark:text-neutral-400">
                After clicking &ldquo;Place Order&rdquo;, your order will be
                processed and you can pay with cash upon delivery.
              </p>
            </div>
          </div>
          <Button
            variant="custom"
            type="submit"
            className="dark:bg-themeBlack border-none w-full"
          >
            Place Order
          </Button>
        </div>
      ),
    },
    {
      title: "Esewa",
      name: "esewa",
      icons: ["esewa"],
      content: (
        <div className="flex items-center gap-4 p-2 justify-center flex-col">
          <div className="p-5 flex items-center gap-4 justify-center flex-col">
            <div>
              <p className="text-center dark:text-neutral-400">
                After clicking &ldquo;Pay with Esewa&rdquo;, you will be
                redirected to Esewa to complete your purchase securely.
              </p>
            </div>
          </div>
          <Button
            variant="custom"
            type="submit"
            className="dark:bg-themeBlack border-none w-full"
          >
            Pay with Esewa
          </Button>
        </div>
      ),
    },
  ];

  const handleAccordionChange = (value: string) => {
    setSelectedValue(
      value === selectedValue
        ? selectedValue
        : value !== ""
        ? value
        : selectedValue
    );
  };

  return (
    <div className="lg:items-center relative w-full flex flex-col">
      <GlassCard className="w-full py-4 p-2 !rounded-lg">
        <div className="px-2 flex flex-col gap-3">
          <span>
            <h5 className="font-bold text-base dark:text-themeTextWhite">
              Payment Method
            </h5>
            <p className="text-themeTextGray leading-tight">
              Easy to pay with One Click. No hidden fees.
            </p>
          </span>
        </div>
        <div className="w-full flex items-center justify-center flex-col pt-5 min-h-44">
          <RadioGroup
            className="w-full"
            value={selectedValue}
            onValueChange={handleAccordionChange}
          >
            <Accordion
              type="single"
              collapsible
              value={selectedValue}
              onValueChange={handleAccordionChange}
              className="w-full space-y-2"
            >
              {items.map((item, index) => {
                return (
                  <AccordionItem
                    key={index}
                    value={item.name}
                    className="w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-lg"
                  >
                    <div className="flex items-center px-4 text-[15px] justify-between leading-6 hover:no-underline gap-3">
                      <span className="flex items-center gap-2">
                        <RadioGroupItem value={item.name} />
                        <AccordionTrigger icon={<> </>}>
                          {item.title}
                        </AccordionTrigger>
                      </span>
                      <Icons icons={item.icons} className="w-auto" />
                    </div>
                    <AccordionContent className="p-0 bg-neutral-50 dark:bg-zinc-800/50">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </RadioGroup>
        </div>
      </GlassCard>
    </div>
  );
};

export default Checkout;
