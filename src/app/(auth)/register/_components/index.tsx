"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as RPNInput from "react-phone-number-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema, RegisterInput } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { setRegistrationDraft } from "@/actions/reg";
import { toast } from "sonner";
import { Default_Login_Redirect } from "@/routes";

const Register = () => {
  const params = useSearchParams();
  React.useEffect(() => {
    try {
      const cookies = document.cookie.split(";").map((c) => c.trim());
      const deny = cookies.find((c) => c.startsWith("deny_create="));
      if (deny) {
        toast("User doesn't exist.");
        document.cookie = "deny_create=; Path=/; Max-Age=0; SameSite=Lax";
      }
    } catch (e) {
    }
  }, [params]);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      store: "",
      phone: "",
    },
  });

  const { watch } = form;
  const values = watch();

  const formValid =
    values.name.trim().length >= 3 &&
    values.store.trim().length >= 3 &&
    values.phone.trim().length >= 10;

  async function persistDraft() {
    await setRegistrationDraft({
      name: values.name ?? (values as any).username,
      store: values.store,
      phone: values.phone,
    });
  }

  const onSocial = async (provider: "google") => {
    if (!formValid) return;
    persistDraft();
    signIn(provider, { callbackUrl: Default_Login_Redirect });
  };

  return (
    <div
      className={cn(
        "rounded-[24px] p-1 no-underline shadow-sm bg-neutral-900 text-white",
        "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
        "shadow-[rgba(17,24,28,0.08)_0_0_0_1px,rgba(17,24,28,0.08)_0_1px_2px_-1px,rgba(17,24,28,0.04)_0_2px_4px]",
        "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]",
        "w-[500px] h-[590px]"
      )}
    >
      <div
        className={cn(
          "relative  size-full h-[490px] rounded-[20px] ring-1 ring-neutral-950 px-10 bg-neutral-950/80",
          "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_1px_1px_0px_rgba(255,252,240,0.5)_inset,0px_0px_0px_1px_hsla(0,0%,100%,0.1)_inset,0px_0px_1px_0px_rgba(28,27,26,0.5)]",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(255,255,255,0.03)_inset,0_0_0_1px_rgba(0,0,0,0.1),0_2px_2px_0_rgba(0,0,0,0.1),0_4px_4px_0_rgba(0,0,0,0.1),0_8px_8px_0_rgba(0,0,0,0.1)]"
        )}
      >
        <Logo className="top-2" />
        <div className="relative z-10 flex-none px-6 pt-6 text-center">
          <h3 className="text-sm font-medium ">Create your account</h3>
          <p className="mt-2 text-pretty text-sm/5 text-zinc-400">
            Welcome! Please fill in the details to get started.
          </p>
        </div>
        <Form {...form}>
          <form
            className="mt-10 space-y-6"
            // onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
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
                        className="peer pe-9 h-[42px] border-zinc-800"
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
                        className="peer pe-9 h-[42px] border-zinc-800"
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
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="lg"
                      className={cn(
                        "w-full bg-neutral-950 justify-start gap-5 px-2 h-12 cursor-pointer ring-1 ring-neutral-800 ring-offset-1 ring-offset-neutral-900 disabled:opacity-50 mt-3"
                      )}
                      onClick={() =>
                        formValid
                          ? onSocial("google")
                          : toast("Please fill in all fields.")
                      }
                    >
                      <span className="bg-neutral-900 p-2 rounded-md">
                        <svg
                          width="22"
                          height="22"
                          viewBox="-0.5 0 48 48"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g
                            id="Icons"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                          >
                            <g
                              id="Color-"
                              transform="translate(-401.000000, -860.000000)"
                            >
                              <g
                                id="Google"
                                transform="translate(401.000000, 860.000000)"
                              >
                                <path
                                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                                  id="Fill-1"
                                  fill="#FBBC05"
                                ></path>
                                <path
                                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                                  id="Fill-2"
                                  fill="#EB4335"
                                ></path>
                                <path
                                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                                  id="Fill-3"
                                  fill="#34A853"
                                ></path>
                                <path
                                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                                  id="Fill-4"
                                  fill="#4285F4"
                                ></path>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </span>
                      Continue with Google
                    </Button>
                  </TooltipTrigger>
                  {!formValid && (
                    <TooltipContent className="px-2 py-1 text-xs">
                      Fill required fields first
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center py-2">
        <p className="pb-2 pt-1">
          Already have an account?{" "}
          <Link href={"/signin"} className="text-[#e2f75d]">
            {" "}
            Sign in
          </Link>
        </p>
        <Separator className="bg-neutral-800" />
        <p className="py-2">
          Secured by <span className="text-[#e2f75d]">Ora.</span>
        </p>
      </div>
    </div>
  );
};

export default Register;

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <Input
      data-slot="phone-input"
      className={cn(
        "-ms-px rounded-s-none shadow-none focus-visible:z-10 h-[42px] border-zinc-800",
        className
      )}
      {...props}
    />
  );
};

PhoneInput.displayName = "PhoneInput";

const CountrySelect = () => {
  return (
    <div className="border-zinc-800 text-muted-foreground focus-within:border-ring focus-within:ring-ring/50 hover:bg-accent hover:text-foreground has-aria-invalid:border-destructive/60 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 relative inline-flex items-center self-stretch rounded-s-md border py-2 ps-3 pe-2 transition-[color,box-shadow] outline-none focus-within:z-10 focus-within:ring-[3px] has-disabled:pointer-events-none has-disabled:opacity-50">
      <div className="inline-flex items-center gap-1" aria-hidden="true">
        <span className="text-muted-foreground/80">+977</span>
      </div>
    </div>
  );
};
