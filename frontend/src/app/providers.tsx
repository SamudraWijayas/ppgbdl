"use client";

import ToasterProvider from "@/contexts/ToasterContext";
import { onErrorHander } from "@/libs/axios/responseHanler";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError(error) {
        onErrorHander(error);
        return false;
      },
    },
    mutations: {
      onError: onErrorHander,
    },
  },
});
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToasterProvider>{children}</ToasterProvider>
          </NextThemesProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
