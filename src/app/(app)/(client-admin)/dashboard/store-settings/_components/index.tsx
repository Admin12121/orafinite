"use client"
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterSchema, RegisterInput } from "@/schemas";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ImageCropper from "@/components/global/imagecrop";
import * as RPNInput from "react-phone-number-input";
import { cn } from "@/lib/utils";

const Store = () => {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      store: "",
      phone: "",
    },
  });
  return (
    <div className="space-y-2 rounded-lg p-2 w-full h-full ">
      <h1 className="text-4xl">Store Details</h1>
      <Separator />
      <Form {...form}>
        <form
          className="space-y-6 w-full"
          // onSubmit={form.handleSubmit(onSubmit)}
        >
          <ImageCropper />
          <FormField
            control={form.control}
            name="store"
            render={({ field }) => (
              <FormItem>
                <Label className="font-normal">Store Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isLoading}
                    type="text"
                    placeholder="Store Name"
                    className="peer pe-9 h-[42px] dark:border-zinc-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <Label className="font-normal">Full Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isLoading}
                    type="text"
                    placeholder="Full Name"
                    className="peer pe-9 h-[42px] dark:border-zinc-800"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <Label className="font-normal">Phone Number</Label>
                <FormControl>
                  <RPNInput.default
                    className="flex rounded-md shadow-xs"
                    international={false}
                    defaultCountry="NP"
                    countrySelectComponent={CountrySelect}
                    inputComponent={PhoneInput}
                    placeholder="Enter phone number"
                    limitMaxLength
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Store;

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px rounded-s-none shadow-none focus-visible:z-10 h-[42px] dark:border-zinc-800",
        className
      )}
      {...props}
    />
  );
};

PhoneInput.displayName = "PhoneInput";

const CountrySelect = () => {
  return (
    <div className="dark:border-zinc-800 text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <span className="text-muted-foreground/80">+977</span>
      </div>
    </div>
  );
};
