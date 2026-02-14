"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface PropTypes {
  span?: string; // ✅ teks di samping ikon
}

const NavBack = ({ span = "Kembali" }: PropTypes) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition cursor-pointer"
      >
        <ChevronLeft size={18} />
        <span className="text-[15px]">{span}</span>
      </button>
    </div>
  );
};

export default NavBack;
