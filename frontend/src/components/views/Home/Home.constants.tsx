import { Home, ScanQrCode, File, Component } from "lucide-react";

const menuItems = [
  {
    name: "Presensi QR Code",
    icon: <ScanQrCode size={20} />,
    href: "/scan",
    bg: "bg-blue-200/50 text-blue-600 dark:bg-blue-800/50 dark:text-blue-300",
  },
  {
    name: "Kehadiran",
    icon: <File size={20} />,
    href: "/presence",
    bg: "bg-green-200/50 text-green-600 dark:bg-green-800/50 dark:text-green-300",
  },
  {
    name: "Kelompok",
    icon: <Component size={20} />,
    href: "/group",
    bg: "bg-yellow-200/50 text-yellow-600 dark:bg-yellow-800/50 dark:text-yellow-300",
  },
  {
    name: "Desa",
    icon: <Home size={20} />,
    href: "/list-village",
    bg: "bg-purple-200/50 text-purple-600 dark:bg-purple-800/50 dark:text-purple-300",
  },
];

export { menuItems };
