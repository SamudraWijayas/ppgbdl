"use client";

import Image from "next/image";
import { Camera, MapPin } from "lucide-react";
import useJelajah from "./useJelajah";
import { IKegiatan } from "@/types/Kegiatan";

// 🟢 Definisikan tipe data untuk item kegiatan
interface Kegiatan {
  id: number;
  nama: string;
  tanggal: string;
  img: string;
  lokasi: string;
}

interface DataJelajah {
  daerah: Kegiatan[];
  desa: Kegiatan[];
  kelompok: Kegiatan[];
}

const dataJelajah: DataJelajah = {
  daerah: [
    {
      id: 1,
      nama: "Festival Santri Nusantara",
      tanggal: "10 Oktober 2025",
      img: "/bg.png",
      lokasi: "Kabupaten Cirebon",
    },
    {
      id: 2,
      nama: "Lomba Baca Kitab Kuning",
      tanggal: "7 Oktober 2025",
      img: "/foto2.jpg",
      lokasi: "Kota Bandung",
    },
  ],
  desa: [
    {
      id: 1,
      nama: "Pengajian Malam Jumat",
      tanggal: "12 Oktober 2025",
      img: "/foto3.jpg",
      lokasi: "Desa Mekarjaya",
    },
    {
      id: 2,
      nama: "Bersih Desa",
      tanggal: "6 Oktober 2025",
      img: "/foto4.jpg",
      lokasi: "Desa Wanasari",
    },
  ],
  kelompok: [
    {
      id: 1,
      nama: "Kajian Subuh Kelompok 3",
      tanggal: "3 Oktober 2025",
      img: "/foto5.jpg",
      lokasi: "Posko RT 05",
    },
    {
      id: 2,
      nama: "Pelatihan Literasi Digital",
      tanggal: "2 Oktober 2025",
      img: "/foto6.jpg",
      lokasi: "Balai RW 02",
    },
  ],
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const Jelajah = () => {
  const {
    dataKegiatan,
    isLoadingKegiatan,
    isRefetchingKegiatan,
    refetchKegiatan,
  } = useJelajah();

  const kegiatanList: IKegiatan[] = Array.isArray(dataKegiatan?.data)
    ? dataKegiatan.data
    : [];
  // 1️⃣ Pisahkan berdasarkan tingkat
  const kegiatanDaerah = kegiatanList.filter(
    (item) => item.tingkat === "DAERAH",
  );

  const kegiatanDesa = kegiatanList.filter((item) => item.tingkat === "DESA");

  const kegiatanKelompok = kegiatanList.filter(
    (item) => item.tingkat === "KELOMPOK",
  );

  // 2️⃣ Group by lokasi
  const groupBy = <T, K extends string | number>(
    array: T[],
    keyGetter: (item: T) => K,
  ) => {
    return array.reduce(
      (result, item) => {
        const key = keyGetter(item);
        if (!result[key]) {
          result[key] = [];
        }
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

  const renderCard = (item: IKegiatan) => {
    const imageUrl = item.dokumentasi?.[0]?.url || "/bg.png";

    const lokasi =
      item.daerah?.name || item.desa?.name || item.kelompok?.name || "-";

    return (
      <div
        key={item.id}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="relative w-full h-32 sm:h-40">
          <Image
            src={`${process.env.NEXT_PUBLIC_IMAGE}${imageUrl}`}
            alt={item.name ?? ""}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Camera size={10} />
            <span>Dokumentasi</span>
          </div>
        </div>

        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800 dark:text-white line-clamp-2">
            {item.name}
          </h3>

          <div className="flex items-center gap-1 text-[11px] text-gray-500 mt-1">
            <MapPin size={12} />
            <span>{lokasi}</span>
          </div>

          <p className="text-[11px] text-gray-400 mt-1">
            {formatDate(item.startDate)}
          </p>
        </div>
      </div>
    );
  };

  const renderGroupedSection = (
    title: string,
    groupedData: Record<string, IKegiatan[]>,
  ) => (
    <section className="mb-10">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {Object.entries(groupedData).map(([lokasi, kegiatan]) => (
        <div key={lokasi} className="mb-6">
          <h3 className="text-md font-medium mb-3 text-gray-700 dark:text-gray-200">
            {lokasi}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {kegiatan.map(renderCard)}
          </div>
        </div>
      ))}
    </section>
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 p-4">
      <h1 className="text-xl font-semibold mb-5 text-gray-800 dark:text-white">
        Jelajah Dokumentasi Kegiatan
      </h1>

      {renderGroupedSection("Kegiatan Daerah", groupedDaerah)}
      {renderGroupedSection("Kegiatan Desa", groupedDesa)}
      {renderGroupedSection("Kegiatan Kelompok", groupedKelompok)}
    </div>
  );
};

export default Jelajah;
