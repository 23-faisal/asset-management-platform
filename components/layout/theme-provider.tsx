"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";

interface ExtendedThemeProviderProps extends ThemeProviderProps {
  containerClass?: string;
}

export function ThemeProvider({
  children,
  containerClass,
  ...props
}: ExtendedThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <main className={cn("max-w-7xl mx-auto px-4 ", containerClass)}>
        <Navbar />
        {children}
        {/* Footer component */}
      </main>
    </NextThemesProvider>
  );
}
