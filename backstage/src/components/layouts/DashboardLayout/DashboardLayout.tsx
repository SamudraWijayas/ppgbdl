"use client";

import React, { ReactNode, useState } from "react";
import {
  SIDEBAR_ADMIN,
  SIDEBAR_DAERAH,
  SIDEBAR_KELOMPOK,
} from "./DashboardLayout.constant";
import DashboardLayoutSidebar from "./DashboardLayoutSidebar";
import { cn } from "@/utils/cn";
import useDashboardLayout from "./useDashboardLayout";
import { Avatar, Skeleton } from "@heroui/react";
import { useSession } from "next-auth/react";
import {
  Activity,
  Group,
  LayoutDashboard,
  LogOut,
  User,
  UserPen,
  Users,
} from "lucide-react";
import { IKelompok } from "@/types/Kelompok";

interface SidebarItem {
  key: string;
  label: string;
  href?: string;
  icon: ReactNode;
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

interface DashboardLayoutProps {
  children: ReactNode;
  description?: string;
  title?: string;
  widthCollapsed?: string;
  forceHideLabel?: boolean;
  widthHeader?: string;
  type?: string;
  currentPath?: string;
  collapsed?: boolean;
}
const DashboardLayout = (props: DashboardLayoutProps) => {
  const {
    dataProfile,
    dataKelompok,
    isLoadingKelompok,
  } = useDashboardLayout();
  const session = useSession();
  const isLoadingSession = session.status === "loading";

  const initial = dataProfile?.fullName?.charAt(0).toUpperCase() || "U";
  // Flat avatar colors (dipilih berdasarkan huruf pertama)
  const flatColors = [
    { bg: "bg-pink-100", text: "text-pink-600", border: "border-pink-200" },
    { bg: "bg-blue-100", text: "text-blue-600", border: "border-blue-200" },
    { bg: "bg-green-100", text: "text-green-600", border: "border-green-200" },
    {
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      border: "border-yellow-200",
    },
    {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  ];
  const colorIndex = dataProfile?.fullName
    ? dataProfile.fullName.charCodeAt(0) % flatColors.length
    : 0;
  const { bg, text, border } = flatColors[colorIndex];

  const {
    children,
    // description = "Welcome to your dashboard",
    title = "Dashboard Overview",
    type = "ADMIN",
    widthCollapsed,

    forceHideLabel,
    widthHeader,
    currentPath = "",
  } = props;
  const [open, setOpen] = useState(false); // mobile
  const [collapsed, setCollapsed] = useState(false); // desktop

  let sidebarItems: SidebarSection[];

  switch (type) {
    case "ADMIN":
      sidebarItems = SIDEBAR_ADMIN;
      break;
    case "DAERAH":
      sidebarItems = SIDEBAR_DAERAH;
      break;
    case "DESA":
      sidebarItems = [
        {
          group: "Dashboard",
          items: [
            {
              key: "dashboard",
              label: "Dashboard",
              href: "/village/dashboard",
              icon: <LayoutDashboard />,
            },
            {
              key: "user",
              label: "Users",
              href: "/village/users",
              icon: <User />,
            },
            {
              key: "kegiatan",
              label: "Kegiatan",
              href: "/village/activity",
              icon: <Activity />,
            },
          ],
        },
        {
          group: "Generus & Kelompok",
          items: [
            {
              key: "kelompok",
              label: "Generus Kelompok",
              icon: <Group />,
              children: isLoadingKelompok
                ? [
                    {
                      key: "loading",
                      label: "Loading...",
                      href: "#",
                    },
                  ]
                : dataKelompok?.data.map((item: IKelompok) => ({
                    key: item.id,
                    label: item.name,
                    href: `/village/kelompok/${item.id}`,
                  })) || [],
            },
            {
              key: "mahasiswa",
              label: "Mahasiswa",
              icon: <Users />,
              href: "/village/student",
            },
          ],
        },
        {
          group: "KEAMANAN",
          items: [
            {
              key: "profile",
              label: "Profile",
              href: "/village/profile",
              icon: <UserPen />,
            },
            {
              key: "logout",
              label: "Logout",
              href: "/lo",
              icon: <LogOut />,
            },
          ],
        },
      ];
      break;

    case "KELOMPOK":
      sidebarItems = SIDEBAR_KELOMPOK;
      break;
    default:
      sidebarItems = []; // fallback
  }

  return (
    <div className="max-w-screen-3xl 3xl:container flex bg-gray-50">
      <DashboardLayoutSidebar
        sidebarItems={sidebarItems}
        isOpen={open}
        collapsed={collapsed}
        dataProfile={dataProfile}
        forceHideLabel={forceHideLabel}
        widthCollapsed={widthCollapsed}
        currentPath={currentPath}
      />
      {/* Main Section */}
      <div
        className={cn(
          "min-h-screen flex-1 overflow-y-auto transition-all duration-300",
          open
            ? "ml-0"
            : collapsed
              ? "lg:ml-20"
              : widthHeader || "lg:ml-65",
          forceHideLabel && "lg:ml-85",
        )}
      >
        {/* Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            {/* Hamburger Button - Mobile */}

            <h2 className="font-semibold text-xl">{title}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isLoadingSession ? (
                  <Skeleton className="flex h-12 w-12 rounded-full" />
                ) : (
                  <Avatar
                    src={
                      dataProfile?.avatar
                        ? `${process.env.NEXT_PUBLIC_IMAGE}${dataProfile.avatar}`
                        : undefined
                    }
                    name={initial}
                    showFallback
                    className={`cursor-pointer ${bg} ${text} ${border} text-xl font-bold md:text-2xl`}
                  />
                )}
              </div>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setOpen(!open)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5m-16.5 5.25h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-4 sm:px-4">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
