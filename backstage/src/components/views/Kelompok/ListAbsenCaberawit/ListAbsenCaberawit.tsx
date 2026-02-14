"use client";

import { AbsenItem } from "@/types/Absen";
import { IGenerus } from "@/types/Generus";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input, Pagination, Skeleton } from "@heroui/react";
import { ChevronRight, FolderPlus, Search } from "lucide-react";
import useChangeUrl from "@/hooks/useChangeUrls";
import Link from "next/link";
import useListAbsenCaberawit from "./useListAbsenCaberawit";

type StatusAbsen = "HADIR" | "IZIN" | "SAKIT" | "ALPA";

const ListAbsenCaberawit = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("tanggal")) {
      router.replace(`?tanggal=${getToday()}`);
    }
  }, [searchParams, router]);
  const tanggal = searchParams.get("tanggal") ?? undefined;
  const hasTanggal = !!tanggal;
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  const {
    dataMurid,
    isLoadingMurid,

    dataAbsen,
  } = useListAbsenCaberawit(tanggal);

  const [attendance, setAttendance] = useState<Record<number, StatusAbsen>>({});
  // 🔒 biar tidak reset pas refetch

  /* =========================
     INIT ABSEN (ONCE)
  ========================= */
  useEffect(() => {
    if (!dataMurid?.data || !dataAbsen) return;

    const next: Record<number, StatusAbsen> = {};

    // default ALPA untuk generus di page ini
    dataMurid.data.forEach((g: IGenerus) => {
      if (!g.id) return;
      next[g.id] = "ALPA";
    });

    // override dari data absen
    dataAbsen.forEach((absen: AbsenItem) => {
      if (absen.caberawitId && next[absen.caberawitId] !== undefined) {
        next[absen.caberawitId] = absen.status;
      }
    });

    setAttendance((prev) => ({
      ...prev,
      ...next,
    }));
  }, [dataMurid, dataAbsen]);

  console.log("GENERUS:", dataMurid?.data);
  console.log("ABSEN:", dataAbsen?.data);

  const onSelectDate = (day: number) => {
    const formatted = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;

    router.push(`?tanggal=${formatted}`);
  };

  const getToday = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(now.getDate()).padStart(2, "0")}`;
  };
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const STATUS_BADGE: Record<
    StatusAbsen,
    { label: string; className: string }
  > = {
    HADIR: {
      label: "Hadir",
      className: "bg-green-100 text-green-700",
    },
    IZIN: {
      label: "Izin",
      className: "bg-purple-100 text-purple-700",
    },
    SAKIT: {
      label: "Sakit",
      className: "bg-yellow-100 text-yellow-700",
    },
    ALPA: {
      label: "Alpa",
      className: "bg-red-100 text-red-700",
    },
  };

  const {
    handleSearch,
    handleClearSearch,
    currentLimit,
    currentPage,
    handleChangePage,
  } = useChangeUrl();

  const pagination = dataMurid?.pagination;

  const totalEntries = pagination?.total ?? 0;
  const totalPages = pagination?.totalPages ?? 0;

  const page = pagination?.current ?? 1;
  const limit = Number(currentLimit);

  // hitung range tampil
  const from = totalEntries === 0 ? 0 : (page - 1) * limit + 1;
  const to = Math.min(page * limit, totalEntries);

  if (isLoadingMurid) {
    return (
      <div className="bg-gray-50 min-h-screen p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Skeleton */}
          <div className="lg:col-span-3">
            <SidebarSkeleton />
          </div>

          {/* Main Content Skeleton */}
          <section className="lg:col-span-9 space-y-4">
            <HeaderSkeleton />

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </th>
                    <th className="px-6 py-4 text-left">
                      <Skeleton className="h-4 w-32 rounded-md" />
                    </th>
                    <th className="px-6 py-4 text-left">
                      <Skeleton className="h-4 w-20 rounded-md" />
                    </th>
                    <th className="px-6 py-4 text-right">
                      <Skeleton className="h-4 w-16 rounded-md ml-auto" />
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRowSkeleton key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {dataMurid?.data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[60vh]">
          <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <FolderPlus className="text-white w-6 h-6" />
          </div>

          <h2 className="text-lg font-semibold text-black">Belum ada Siswa</h2>

          <p className="text-gray-600 mt-1 max-w-sm">
            Kamu belum menambahkan data siswa. Silakan tambahkan murid dihalaman Siswa.
          </p>

          <Link href="/group/student" className="mt-6 px-5 py-2 rounded-lg bg-blue-500 text-white font-medium cursor-pointer">
            Tambah Murid
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow p-4">
            <h2 className="font-semibold mb-3 text-center lg:text-left">
              Pilih Tanggal
            </h2>

            {/* BULAN & TAHUN */}
            <div className="flex gap-2 mb-4">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              >
                {[
                  "Januari",
                  "Februari",
                  "Maret",
                  "April",
                  "Mei",
                  "Juni",
                  "Juli",
                  "Agustus",
                  "September",
                  "Oktober",
                  "November",
                  "Desember",
                ].map((m, i) => (
                  <option key={i + 1} value={i + 1}>
                    {m}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const y = today.getFullYear() - 2 + i;
                  return (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* GRID HARI */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="font-semibold text-gray-500">
                  {d}
                </div>
              ))}

              {Array.from({
                length: getDaysInMonth(selectedYear, selectedMonth),
              }).map((_, i) => {
                const day = i + 1;
                const isActive =
                  tanggal ===
                  `${selectedYear}-${String(selectedMonth).padStart(
                    2,
                    "0",
                  )}-${String(day).padStart(2, "0")}`;

                return (
                  <div
                    key={day}
                    onClick={() => onSelectDate(day)}
                    className={`p-1 rounded cursor-pointer ${
                      isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <section className="lg:col-span-9">
            <div className="flex flex-col gap-4 mb-3">
              {/* Search + Filter Button */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Input
                    isClearable
                    startContent={<Search className="text-gray-400" />}
                    placeholder="Cari generus..."
                    className="w-full"
                    onClear={handleClearSearch}
                    onChange={handleSearch}
                  />
                </div>
                <div className="flex gap-2">
                  {hasTanggal && (
                    <Link
                      href={`/group/absent-caberawit?tanggal=${tanggal}`}
                      className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md text-sm"
                    >
                      Absen Sekarang
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className=" bg-white rounded-xl shadow-sm overflow-hidden">
              {/* responsive wrapper */}
              <div className="overflow-x-auto">
                <table className=" w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr className="text-gray-500">
                      <th className="px-6 py-4 text-left font-medium">Nama</th>
                      <th className="px-6 py-4 text-left font-medium">
                        Status Kehadiran
                      </th>
                      <th className="px-6 py-4 text-left font-medium">
                        Jenjang
                      </th>
                      <th className="px-6 py-4 text-right font-medium">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {dataMurid?.data.map((g: IGenerus) => {
                      if (!g.id) return null;

                      const current = attendance[g.id] ?? "ALPA";
                      const badge = STATUS_BADGE[current];

                      return (
                        <tr
                          key={g.id}
                          className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
                        >
                          {/* Nama */}
                          <td className="px-6 py-4 text-gray-800">
                            {g.nama ?? "-"}
                          </td>

                          {/* STATUS KEHADIRAN (READ ONLY) */}
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${badge.className}`}
                            >
                              {badge.label}
                            </span>
                          </td>

                          {/* Jenjang */}
                          <td className="px-6 py-4 text-gray-600">
                            {g.jenjang?.name ?? "-"}
                          </td>

                          {/* Action */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end">
                              <Link
                                href={`/group/absent-caberawit/${g.id}?source=attendance-page`}
                                className=" inline-flex items-center gap-3 px-2 py-1.5 rounded-lg text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 active:scale-95 transition-all"
                              >
                                <span>Lihat Absen</span>
                                <ChevronRight className="w-4 h-4" />
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* mobile hint */}
              <p className="px-4 py-2 text-xs text-gray-400 md:hidden">
                Geser ke samping untuk melihat tabel →
              </p>
            </div>
            {/* Bottom Table Content */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 py-3 bg-white mt-4 rounded-xl">
              {/* Left: Show limit + info */}
              <div className="flex items-center gap-4 w-full">
                <span className="text-gray-700 text-sm">
                  Showing{" "}
                  <span className="font-medium">
                    {from}-{to}
                  </span>{" "}
                  of <span className="font-medium">{totalEntries}</span> entries
                </span>
              </div>

              {totalPages > 1 && (
                <Pagination
                  isCompact
                  showControls
                  color="primary"
                  page={Number(currentPage)}
                  total={totalPages}
                  onChange={handleChangePage}
                  loop
                />
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

const SidebarSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <Skeleton className="h-5 w-32 rounded-md" />

      <div className="flex gap-2">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

const TableRowSkeleton = () => {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-40 rounded-md" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="h-4 w-24 rounded-md" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-3">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      </td>
    </tr>
  );
};

const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 mb-3">
      <Skeleton className="h-10 w-64 rounded-md" />
      <Skeleton className="h-10 w-40 rounded-md" />
    </div>
  );
};

export default ListAbsenCaberawit;
