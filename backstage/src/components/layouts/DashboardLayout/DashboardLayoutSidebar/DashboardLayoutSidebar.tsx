"use client";

import { cn } from "@/utils/cn";
import React, { ReactNode } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { IUser } from "@/types/User";
import { ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarItem {
  key: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  children?: {
    key: string;
    label: string;
    href: string;
  }[];
}

interface SidebarSection {
  group: string;
  items: SidebarItem[];
}

interface PropTypes {
  sidebarItems: SidebarSection[];
  isOpen: boolean;
  collapsed: boolean;
  widthCollapsed?: string;
  forceHideLabel?: boolean;
  currentPath: string;
  dataProfile: IUser;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const { sidebarItems, isOpen, collapsed, widthCollapsed, forceHideLabel } =
    props;

  const [openMenu, setOpenMenu] = React.useState<string | null>(null);
  const toggleMenu = (key: string) => {
    setOpenMenu(openMenu === key ? null : key);
  };

  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed z-30 flex h-screen flex-col justify-between bg-white border-r border-gray-200 px-3 py-4 transition-all duration-300",
        collapsed ? "w-20" : widthCollapsed ? widthCollapsed : "w-65",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      {/* LOGO */}
      <div className="mb-6 flex items-center gap-2 px-2">
        <Image
          src="/images/logo/logo-light.png"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer w-30"
          onClick={() => router.push("/")}
        />
      </div>

      {/* MAIN MENU */}
      <div className="scrollbar-hide flex-1 space-y-6 overflow-y-auto pr-1">
        {sidebarItems.map((section) => (
          <div key={section.group}>
            <p className="mb-2 px-2 text-xs font-semibold text-gray-400 uppercase">
              {section.group}
            </p>

            <nav
              className={cn(
                "flex flex-col space-y-1",
                collapsed && "items-center",
                forceHideLabel && "items-center"
              )}
            >
              {section.items.map((item) => {
                if (item.key === "logout") {
                  return (
                    <button
                      key={item.key}
                      onClick={() => signOut({ callbackUrl: "/auth/login" })}
                      className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50"
                    >
                      <span className="text-sm">{item.icon}</span>
                      {!forceHideLabel && !collapsed ? item.label : null}
                    </button>
                  );
                }
                const hasChildren = Array.isArray(item.children);

                // ======================
                // DROPDOWN MENU
                // ======================
                if (hasChildren) {
                  const isActiveSub = item.children?.some((sub) =>
                    pathname.startsWith(sub.href)
                  );

                  const isOpen = openMenu === item.key || isActiveSub;

                  return (
                    <div key={item.key}>
                      <button
                        onClick={() => toggleMenu(item.key)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-sm px-3 py-2 text-[13px] font-medium transition-colors text-blue-900/90 hover:bg-gray-50"
                        )}
                      >
                        <span className="text-sm">{item.icon}</span>
                        {!forceHideLabel && !collapsed ? item.label : null}

                        {/* arrow */}
                        <span className="ml-auto text-xs transition-transform duration-200">
                          <ChevronDown
                            className={`h-4 w-4 font-bold transition-transform duration-300 ${
                              isOpen ? "rotate-180" : "rotate-0"
                            } `}
                          />
                        </span>
                      </button>

                      {/* SUBMENU */}
                      <div
                        className={cn(
                          "ml-6 mt-1 overflow-hidden transition-all duration-500",
                          isOpen ? "max-h-96" : "max-h-0"
                        )}
                      >
                        <div className="relative flex flex-col pl-4">
                          {/* Vertical line root */}
                          <span
                            className={cn(
                              "absolute left-0 top-0 w-4 h-14 border-l border-b border-gray-300 rounded-bl-md"
                            )}
                          ></span>
                          <span
                            className={cn(
                              "absolute left-0 top-0 w-4 h-5 border-l border-b border-gray-300 rounded-bl-md"
                            )}
                          ></span>

                          {item.children?.map((sub) => {
                            return (
                              <Link
                                key={sub.key}
                                href={sub.href}
                                className={cn(
                                  "relative py-2 pl-5 pr-3 text-[13px] rounded-md font-medium transition-colors hover:bg-blue-50 text-blue-900/90",
                                  pathname.startsWith(sub.href) &&
                                    "bg-blue-100 text-blue-700"
                                )}
                              >
                                {/* Branch connector */}

                                {sub.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

                // ======================
                // NORMAL MENU
                // ======================
                return (
                  <Link
                    key={item.key}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center gap-3 rounded-sm px-3 py-2 text-[13px] font-medium transition-colors",
                      item.href && pathname.startsWith(item.href)
                        ? "border border-blue-400/50 bg-blue-200/50 text-blue-800"
                        : "text-blue-900/90 hover:bg-gray-50"
                    )}
                  >
                    <span className="text-sm">{item.icon}</span>
                    {!forceHideLabel && !collapsed ? item.label : null}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default DashboardLayoutSidebar;
