// components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppShell from "@/components/commons/AppShell";
import { onErrorHander } from "@/libs/axios/responseHanler";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

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
interface Props {
  children: ReactNode;
}
export default function Providers({ children }: Props) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToasterProvider>
            {/* jika session client */}
            <AppShell>{children}</AppShell>
          </ToasterProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
