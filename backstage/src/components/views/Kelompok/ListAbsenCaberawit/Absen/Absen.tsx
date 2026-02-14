"use client";

import React, { useCallback, useEffect, useState } from "react";
import { IGenerus } from "@/types/Generus";
import { useRouter, useSearchParams } from "next/navigation";
import useAbsenMassal from "./useAbsenMassal";
import { IAbsen, AbsenItem } from "@/types/Absen";
import useAbsenByTanggal from "./useAbsenByTanggal";
import { ChevronLeft } from "lucide-react";
import useListAbsenCaberawit from "../useListAbsenCaberawit";
import { Skeleton } from "@heroui/react";

type StatusAbsen = "HADIR" | "IZIN" | "SAKIT" | "ALPA";

const STATUS_LIST: StatusAbsen[] = ["HADIR", "IZIN", "SAKIT", "ALPA"];

const STATUS_META: Record<
  StatusAbsen,
  {
    label: string;
    short: string;
    active: string;
    inactive: string;
  }
> = {
  HADIR: {
    label: "Hadir",
    short: "H",
    active: "bg-green-100 border-green-600 text-green-600",
    inactive: "border-green-300 text-green-600",
  },
  IZIN: {
    label: "Izin",
    short: "I",
    active: "bg-purple-100 border-purple-600 text-purple-600",
    inactive: "border-purple-300 text-purple-600",
  },
  SAKIT: {
    label: "Sakit",
    short: "S",
    active: "bg-yellow-100 border-yellow-500 text-yellow-600",
    inactive: "border-yellow-300 text-yellow-600",
  },
  ALPA: {
    label: "Alpa",
    short: "A",
    active: "bg-red-100 border-red-600 text-red-600",
    inactive: "border-red-300 text-red-600",
  },
};

const Absen: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tanggal = searchParams.get("tanggal") ?? undefined;
  const hasParams = !!tanggal;

  const { dataMurid, isLoadingMurid } = useListAbsenCaberawit();
  const { mutateAbsenMassal, isPending } = useAbsenMassal();
  const { data: dataAbsen } = useAbsenByTanggal(tanggal);

  const [attendance, setAttendance] = useState<Record<number, StatusAbsen>>({});

  /* =========================
     INIT ABSEN
  ========================= */
  useEffect(() => {
    if (!dataMurid?.data) return;

    const initial: Record<number, StatusAbsen> = {};

    dataMurid.data.forEach((g: IGenerus) => {
      if (!g.id) return;
      initial[g.id] = "ALPA";
    });

    const absenList = dataAbsen?.data?.data;
    if (Array.isArray(absenList)) {
      absenList.forEach((absen: AbsenItem) => {
        if (absen.caberawitId) {
          initial[absen.caberawitId] = absen.status;
        }
      });
    }

    setAttendance(initial);
  }, [dataMurid, dataAbsen]);

  /* =========================
     CHANGE STATUS
  ========================= */
  const onChangeStatus = useCallback((id: number, status: StatusAbsen) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
  }, []);

  /* =========================
     SUBMIT
  ========================= */
  const handleSubmit = () => {
    if (!tanggal) return;

    const payload: IAbsen = {
      tanggal,
      list: Object.entries(attendance).map(([id, status]) => ({
        caberawitId: Number(id),
        status,
      })),
    };

    mutateAbsenMassal(payload);
  };

  if (!hasParams) return null;

  const formatTanggal = (dateStr: string) => {
    const date = new Date(dateStr);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center gap-3 mb-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 p-1 rounded-lg bg-gray-200 text-sm text-gray-600 cursor-pointer
      hover:text-blue-600 transition"
        >
          <ChevronLeft />
        </button>

        <p className="text-sm text-gray-500">
          Tanggal: <b>{formatTanggal(tanggal!)}</b>
        </p>
      </div>

      {isLoadingMurid ? (
        <AbsenTableSkeleton />
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full min-w-175">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Nama</th>
                <th className="px-4 py-3 text-left font-medium">Jenjang</th>
                <th className="px-4 py-3 text-center font-medium">Kehadiran</th>
              </tr>
            </thead>

            <tbody>
              {dataMurid?.data?.map((g: IGenerus) => {
                if (!g.id) return null;

                const current = attendance[g.id] ?? "ALPA";

                return (
                  <tr
                    key={g.id}
                    className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{g.nama ?? "-"}</td>
                    <td className="px-4 py-3">{g.jenjang?.name ?? "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-3">
                        {STATUS_LIST.map((status) => {
                          const meta = STATUS_META[status];
                          const isActive = current === status;

                          return (
                            <button
                              key={status}
                              type="button"
                              title={meta.label}
                              onClick={() => onChangeStatus(g.id!, status)}
                              className={`
                                w-9 h-9 rounded-full border
                                flex items-center justify-center
                                text-sm font-semibold transition
                                ${
                                  isActive
                                    ? meta.active
                                    : `bg-white ${meta.inactive} hover:bg-gray-50`
                                }
                              `}
                            >
                              {meta.short}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ACTION */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg
            hover:bg-blue-700 active:scale-95 transition
            disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Menyimpan..." : "Simpan Absen"}
        </button>
      </div>

      {/* DEBUG (DEV ONLY) */}
      {/* {process.env.NODE_ENV === "development" && (
        <pre className="mt-4 text-xs bg-black text-green-400 p-3 rounded">
          {JSON.stringify(attendance, null, 2)}
        </pre>
      )} */}
    </div>
  );
};

const AbsenRowSkeleton = () => {
  return (
    <tr className="border-b border-gray-200">
      {/* Nama */}
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-36 rounded-md" />
      </td>

      {/* Jenjang */}
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-24 rounded-md" />
      </td>

      {/* Kehadiran */}
      <td className="px-4 py-3">
        <div className="flex justify-center gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-9 h-9 rounded-full" />
          ))}
        </div>
      </td>
    </tr>
  );
};

const AbsenTableSkeleton = () => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">
      <table className="w-full min-w-175">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-16 rounded-md" />
            </th>
            <th className="px-4 py-3 text-left">
              <Skeleton className="h-4 w-20 rounded-md" />
            </th>
            <th className="px-4 py-3 text-center">
              <Skeleton className="h-4 w-24 rounded-md mx-auto" />
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, i) => (
            <AbsenRowSkeleton key={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Absen;
