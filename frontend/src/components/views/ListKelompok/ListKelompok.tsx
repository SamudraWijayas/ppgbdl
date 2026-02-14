"use client";

import React from "react";
import { Users, MapPin, ChevronRight } from "lucide-react";
import useListKelompok from "./useListKelompok";
import { IKelompok } from "@/types/Kelompok";
import { Skeleton } from "@heroui/react";

const ListKelompok = () => {
  const { dataKelompok, isLoadingKelompok } = useListKelompok();
  const kelompokList = dataKelompok?.data ?? [];

  if (isLoadingKelompok) {
    return (
      <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 px-4 pt-17.5">
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <KelompokSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 px-4 pt-17.5">
      <div className="space-y-3">
        {kelompokList.map((item: IKelompok) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center gap-4">
              {/* Avatar bulat dengan ikon */}
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="text-blue-600" size={22} />
              </div>

              {/* Info kelompok */}
              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {item.name}
                </h2>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <MapPin size={12} />
                  <span>Desa</span> <span>{item.desa?.name}</span>
                </div>
              </div>
            </div>

            {/* Aksi */}
            <button className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition">
              <ChevronRight className="text-blue-600" size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const KelompokSkeleton = () => {
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4 w-full">
        {/* Avatar */}
        <Skeleton className="rounded-full w-12 h-12" />

        {/* Text */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2 rounded-lg" />
          <Skeleton className="h-3 w-2/3 rounded-lg" />
        </div>
      </div>

      {/* Icon kanan */}
      <Skeleton className="w-8 h-8 rounded-full" />
    </div>
  );
};

export default ListKelompok;
