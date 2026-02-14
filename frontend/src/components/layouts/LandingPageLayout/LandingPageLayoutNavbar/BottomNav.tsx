"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "../LandingPageLayout.constants";

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 z-30 w-full border-t border-gray-200 dark:border-gray-900 bg-white/90 dark:bg-black/50 backdrop-blur-md shadow-lg">
      <div className="flex items-center justify-between px-8 py-2 max-w-2xl mx-auto">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center transition-all duration-300 ${
                isActive ? "text-blue-600" : "text-gray-500  hover:text-blue-500"
              }`}
            >
              <Icon
                size={20}
                className={`transition-transform duration-300  ${
                  isActive ? "scale-110 stroke-blue-600" : "stroke-gray-500 dark:stroke-white"
                }`}
              />
              <span
                className={`text-[11px] font-medium ${
                  isActive ? "text-blue-600" : "text-gray-500 dark:text-white"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
