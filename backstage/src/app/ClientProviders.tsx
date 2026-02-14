// components/ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import { ToasterProvider } from "@/contexts/ToasterContext";
import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import AppShell from "@/components/commons/AppShell";

const queryClient = new QueryClient();

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <ToasterProvider>
          <SessionProvider>
            {/* jika session client */}
            <AppShell>{children}</AppShell>
          </SessionProvider>
        </ToasterProvider>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
