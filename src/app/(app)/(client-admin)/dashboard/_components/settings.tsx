import React from "react";
import {
  Settings,
  ChevronDown,
  CreditCard,
  Shield,
  User,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
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
import { cn } from "@/lib/utils";
import ImageCropper from "@/components/global/imagecrop";
import * as RPNInput from "react-phone-number-input";
import { Switch } from "@/components/ui/switch";
import { signIn } from "next-auth/webauthn";
import { toast } from "sonner";
type AuthResult =
  | undefined
  | { error?: string; ok?: boolean; url?: string; status?: number };

const Setting = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const handlePasskey = async () => {
    try {
      const res = (await signIn("passkey", {
        action: "register",
      })) as AuthResult;
      if (res?.error) {
        toast("Cancelled or failed to add passkey.");
      } else if (res?.ok) {
        toast("Passkey added");
      }
    } catch (e) {
      toast("Cancelled or failed to add passkey.");
    }
  };

  const form = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      store: "",
      phone: "",
    },
  });
  return (
    <Tabs
      defaultValue="tab-1"
      orientation="vertical"
      className="w-full flex-row"
    >
      <TabsList className="flex-col gap-1 h-full bg-transparent items-center justify-start border-r-1 rounded-none min-w-52">
        <TabsTrigger
          value="general"
          className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none max-h-9 px-1"
        >
          <span className="bg-blue-600 rounded-md p-1 mr-2">
            <Settings className="stroke-white" />
          </span>
          General
        </TabsTrigger>
        <TabsTrigger
          value="billing"
          className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none max-h-9 px-1"
        >
          <span className="bg-blue-600 rounded-md p-1 mr-2">
            <CreditCard className="stroke-white" />
          </span>
          Billing
        </TabsTrigger>
        <TabsTrigger
          value="security"
          className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none max-h-9 px-1"
        >
          <span className="bg-blue-600 rounded-md p-1 mr-2">
            <Shield className="stroke-white" />
          </span>
          Security
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none max-h-9 px-1"
        >
          <span className="bg-blue-600 rounded-md p-1 mr-2">
            <User className="stroke-white" />
          </span>
          Account
        </TabsTrigger>
      </TabsList>
      <div className="grow text-start h-[590px] overflow-y-auto">
        <TabsContent value="general" className="px-5 py-2 space-y-5">
          <h1 className="text-4xl">Preferences</h1>
          <Separator />
          <div className="space-y-2 rounded-lg flex p-2">
            <span>
              <h1>Appearance</h1>
              <p className="text-neutral-700/70 dark:text-neutral-500 text-sm">
                Customize how Notion looks on your device.
              </p>
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  aria-label="Select theme"
                  className="ml-auto w-32"
                >
                  {(resolvedTheme ?? "System").charAt(0).toUpperCase() +
                    (resolvedTheme ?? "System").slice(1)}
                  <ChevronDown className="size-4 ml-auto" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-32">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1 className="text-4xl">Store Details</h1>
          <Separator />
          <div className="space-y-2 rounded-lg flex p-2 w-full">
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
        </TabsContent>
        <TabsContent value="billing" className="px-5 py-2 space-y-5">
          <h1 className="text-4xl">Billing</h1>
          <Separator />
          <h1>Current plan</h1>
          <div className="space-y-2 border rounded-lg flex p-2">
            <span>
              <h1>Basic Plan</h1>
              <p className="text-neutral-700/70 dark:text-neutral-500 text-sm">
                Basic features for individual users
              </p>
            </span>
            <div className="ml-auto space-x-3">
              <Button
                variant="outline"
                size={"sm"}
                className="hover:ring-2 hover:ring-offset-2 ring-neutral-600/50 cursor-pointer transition-all ease-in-out duration-300"
              >
                View plans
              </Button>
              <Button
                variant="outline"
                size={"sm"}
                className="hover:ring-2 hover:ring-offset-2 ring-neutral-600/50 cursor-pointer transition-all ease-in-out duration-300"
              >
                Upgrade
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="security" className="px-5 py-2 space-y-5">
          <h1 className="text-4xl">Security</h1>
          <Separator />
          <div className="space-y-2 flex">
            <span className="max-w-[80%] space-y-2">
              <h1>Multi-Factor Authentication</h1>
              <p className="text-sm text-neutral-700/70 dark:text-neutral-500">
                Require an extra security challenge when logging in. If you are
                unable to pass this challenge, you will have the option to
                recover your account via email.
              </p>
            </span>
            <div className="ml-auto [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)] in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)]">
              <Switch className="data-[state=unchecked]:border-input data-[state=unchecked]:[&_span]:bg-input data-[state=unchecked]:bg-transparent [&_span]:transition-all data-[state=unchecked]:[&_span]:size-4 data-[state=unchecked]:[&_span]:translate-x-0.5 data-[state=unchecked]:[&_span]:shadow-none data-[state=unchecked]:[&_span]:rtl:-translate-x-0.5" />
            </div>
          </div>
          <Separator />
          <div className="space-y-2 flex">
            <span className="max-w-[80%] space-y-2">
              <h1>Add PassKey</h1>
              <p className="text-sm text-neutral-700/70 dark:text-neutral-500">
                Passkeys are a new way to sign in to apps and websites that are
                more secure and easier to use than passwords. They use biometric
                data, such as your fingerprint or face, to verify your identity.
              </p>
            </span>
            <Button
              variant="outline"
              size={"sm"}
              className="ml-auto hover:ring-2 hover:ring-offset-2 ring-neutral-600/50 transition-all ease-in-out duration-300 dark:ring-neutral-500 dark:ring-offset-neutral-900"
              onClick={handlePasskey}
            >
              Add PassKey
            </Button>
          </div>
          <Separator />
          <div className="space-y-2 flex">
            <span className="max-w-[80%] space-y-2">
              <h1>Log out of all devices</h1>
              <p className="text-sm text-neutral-700/70 dark:text-neutral-500">
                Log out of all active sessions across all devices, including
                your current session. It may take up to 30 minutes for other
                devices to be logged out.
              </p>
            </span>
            <Button
              variant="destructive"
              size={"sm"}
              className="ml-auto text-white hover:ring-2 hover:ring-offset-2 ring-red-600/50 dark:ring-red-400 dark:ring-offset-neutral-900 transition-all ease-in-out duration-300"
            >
              Log Out
            </Button>
          </div>
          <Separator />
          <div className="space-y-2">
            <h1>Secure by Orafinite.</h1>
          </div>
        </TabsContent>
        <TabsContent value="account">
          <p className="text-muted-foreground px-4 py-3 text-xs">
            Content for Tab 3
          </p>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Setting;

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
