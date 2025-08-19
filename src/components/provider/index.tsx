"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import Header from "@/components/global/header";
import Loader from "@/components/global/loader";


export const Provider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {/* <Loader/> */}
      <Header/>
      {children}
    </NextThemesProvider>
  );
};
