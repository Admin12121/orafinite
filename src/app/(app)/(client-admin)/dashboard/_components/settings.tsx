import React from "react";
import {
  Settings,
  ChevronDown,
  CreditCard,
  Shield,
  User,
  Grid2x2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { signIn } from "next-auth/webauthn";
import { toast } from "sonner";
import { useGetPassKeyQuery } from "@/lib/store/api";

type AuthResult =
  | undefined
  | { error?: string; ok?: boolean; url?: string; status?: number };

const Setting = ({
  user,
  status,
  settingsOpen,
}: {
  user: any;
  status: "authenticated" | "unauthenticated" | "loading";
  settingsOpen: boolean;
}) => {
  const { data: passkeyData } = useGetPassKeyQuery(
    {},
    { skip: status === "unauthenticated" || !settingsOpen }
  );
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
          <div>
            {passkeyData &&
              Array.isArray(passkeyData.keys) &&
              passkeyData.keys.length > 0 && (
                <ul className="space-y-2">
                  {passkeyData.keys.map((k: any) => (
                    <li
                      key={k.credentialID}
                      className="space-y-1 rounded-md border p-3 text-xs"
                    >
                      <div className="flex  gap-2">
                        <span className="font-mono">
                          <Grid2x2 className="size-10"/>
                        </span>
                        <div className="flex flex-col w-full">
                          {k.label && (
                            <span className="text-neutral-800 dark:text-white">
                              {k.label}{" "}
                              {`(${new Date(k.createdAt).toLocaleString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "numeric",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                }
                              )})`}
                            </span>
                          )}
                          <div className="text-neutral-500 dark:text-neutral-400">
                            Created:{" "}
                            {new Date(k.createdAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: true,
                            })}
                          </div>
                          {k.lastUsedAt && (
                            <div className="text-neutral-400">
                              Last used:{" "}
                              {new Date(k.lastUsedAt).toLocaleString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                              })}
                              , {k.lastUsedUserAgent} on {k.lastUsedOs} in{" "}
                              {k.lastUsedCity}, {k.lastUsedCountry}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
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

