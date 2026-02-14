// app/components/ThemeSwitcher.tsx
"use client";

import { RadioGroup, Radio } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="pt-4 flex flex-col gap-3">
      <span className="text-gray-600 dark:text-gray-500 font-medium">Tema</span>
      <div className="flex flex-col gap-5">
        <div
          className="flex items-center justify-between gap2 cursor-pointer"
          onClick={() => setTheme("light")}
        >
          <div className="flex items-center gap-2">
            <Sun size={20} />
            <span className="text-sm">Mode Terang</span>
          </div>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value)}
            className="flex flex-col gap-3"
          >
            <Radio value="light"></Radio>
          </RadioGroup>
        </div>
        <div
          className="flex items-center justify-between gap-2 cursor-pointer"
          onClick={() => setTheme("dark")}
        >
          <div className="flex items-center gap-2">
            <Moon size={20} />
            <span className="text-sm">Mode Gelap</span>
          </div>
          <RadioGroup
            value={theme}
            onValueChange={(value) => setTheme(value)}
            className="flex flex-col gap-3"
          >
            <Radio value="dark"></Radio>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
