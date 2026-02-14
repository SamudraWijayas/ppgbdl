"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import useJelajah from "./useJelajah";
import { IKegiatan } from "@/types/Kegiatan";
import { Skeleton } from "@heroui/react";

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const Jelajah = () => {
  const { dataKegiatan, isLoadingKegiatan } = useJelajah();

  const kegiatanList: IKegiatan[] = Array.isArray(dataKegiatan?.data)
    ? dataKegiatan.data
    : [];

  // =============================
  // Pisahkan berdasarkan tingkat
  // =============================
  const kegiatanDaerah = kegiatanList.filter(
    (item) => item.tingkat === "DAERAH",
  );
  const kegiatanDesa = kegiatanList.filter((item) => item.tingkat === "DESA");
  const kegiatanKelompok = kegiatanList.filter(
    (item) => item.tingkat === "KELOMPOK",
  );

  // =============================
  // Group by lokasi
  // =============================
  const groupBy = <T, K extends string | number>(
    array: T[],
    keyGetter: (item: T) => K,
  ) => {
    return array.reduce(
      (result, item) => {
        const key = keyGetter(item);
        if (!result[key]) result[key] = [];
        result[key].push(item);
        return result;
      },
      {} as Record<K, T[]>,
    );
  };

  const groupedDaerah = groupBy(
    kegiatanDaerah,
    (item) => item.daerah?.name || "Tanpa Daerah",
  );

  const groupedDesa = groupBy(
    kegiatanDesa,
    (item) => item.desa?.name || "Tanpa Desa",
  );

  const groupedKelompok = groupBy(
    kegiatanKelompok,
    (item) => item.kelompok?.name || "Tanpa Kelompok",
  );

  // =============================
  // Skeleton Card
  // =============================
  const SkeletonCard = () => (
    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <Skeleton className="w-full h-32 sm:h-40 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4 rounded-lg" />
        <Skeleton className="h-3 w-1/2 rounded-lg" />
        <Skeleton className="h-3 w-1/3 rounded-lg" />
      </div>
    </div>
  );

  // =============================
  // Card
  // =============================
  const renderCard = (item: IKegiatan) => {
    const imageUrl = item.dokumentasi?.[0]?.url || "/bg.png";

    // const lokasi =
    //   item.daerah?.name || item.desa?.name || item.kelompok?.name || "-";

    return (
      <div
        key={item.id}
        className="group bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="relative w-full h-32 sm:h-40 overflow-hidden">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE}${imageUrl}`}
            alt={item.name ?? ""}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Camera size={12} />
            Dokumentasi
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white line-clamp-2">
            {item.name}
          </h3>

          {/* <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
            <MapPin size={12} />
            {lokasi}
          </div> */}

          <p className="text-xs text-gray-400 mt-1">
            {formatDate(item.startDate)}
          </p>
        </div>
      </div>
    );
  };

  // =============================
  // Section
  // =============================
  const renderGroupedSection = (
    title: string,
    groupedData: Record<string, IKegiatan[]>,
  ) => {
    if (Object.keys(groupedData).length === 0) return null;

    return (
      <section className="mb-10">
        <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white border-l-4 border-primary pl-3">
          {title}
        </h2>

        {Object.entries(groupedData).map(([lokasi, kegiatan]) => (
          <div key={lokasi} className="mb-8">
            <h3 className="text-md font-semibold mb-4 text-gray-700 dark:text-gray-300">
              {lokasi}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {kegiatan.map(renderCard)}
            </div>
          </div>
        ))}
      </section>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 p-4">
      <h1 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Jelajah Dokumentasi Kegiatan
      </h1>

      {isLoadingKegiatan ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <>
          {renderGroupedSection("Kegiatan Daerah", groupedDaerah)}
          {renderGroupedSection("Kegiatan Desa", groupedDesa)}
          {renderGroupedSection("Kegiatan Kelompok", groupedKelompok)}

          {kegiatanList.length === 0 && (
            <div className="text-center text-gray-400 mt-20">
              Belum ada dokumentasi kegiatan
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jelajah;
