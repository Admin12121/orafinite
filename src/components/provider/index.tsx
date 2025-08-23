"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import Spinner from "@/components/ui/spinner";

// import Loader from "@/components/global/loader";

export const Provider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster
        icons={{ loading: <Spinner size="sm" color="secondary" /> }}
        invert={true}
        theme="system"
        position="bottom-right"
      />
      {children}
    </NextThemesProvider>
  );
};
