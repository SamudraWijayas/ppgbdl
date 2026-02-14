"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import useAbsenCaberawit from "./useAbsenCaberawit";
import { IGenerus } from "@/types/Generus";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import DataTable from "@/components/ui/DataTable";
import { Avatar, Input, Select, SelectItem } from "@heroui/react";
import { COLUMN_LIST_GENERUS } from "./Absen.constant";
import { Search } from "lucide-react";
import useChangeUrl from "@/hooks/useChangeUrls";
import { IDaerah } from "@/types/Daerah";
import { IDesa } from "@/types/Desa";
import { AbsenItem } from "@/types/Absen";

/* =========================
   TYPE & CONSTANT
========================= */
type StatusAbsen = "HADIR" | "IZIN" | "SAKIT" | "ALPA";
const STATUS_LIST: StatusAbsen[] = ["HADIR", "IZIN", "SAKIT", "ALPA"];

/* =========================
   HELPER
========================= */
const getInitials = (name?: string) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0].toUpperCase()
    : (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")}`;
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month, 0).getDate();
};

/* =========================
   COMPONENT
========================= */
const AbsenCaberawit: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);

  /* =========================
     AUTO SET TANGGAL HARI INI
  ========================= */
  useEffect(() => {
    if (!searchParams.get("tanggal")) {
      router.replace(`?tanggal=${getToday()}`);
    }
  }, [searchParams, router]);

  const tanggal = searchParams.get("tanggal") ?? undefined;
  const hasTanggal = !!tanggal;

  const {
    dataGenerus,
    isLoadingGenerus,
    dataDaerah,
    dataDesa,
    filter,
    setFilter,
    dataAbsen,
  } = useAbsenCaberawit(tanggal);
  /* =========================
     BULAN & TAHUN STATE
  ========================= */
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  /* sync month & year dengan URL */
  useEffect(() => {
    if (!tanggal) return;
    const [y, m] = tanggal.split("-").map(Number);
    if (!y || !m) return;

    setSelectedYear(y);
    setSelectedMonth(m);
  }, [tanggal]);

  /* =========================
     STATE ABSEN
  ========================= */
  const [attendance, setAttendance] = useState<Record<number, StatusAbsen>>({});
  const lastTanggalRef = useRef<string | null>(null);

  /* =========================
     INIT ABSEN (PER TANGGAL)
  ========================= */
  useEffect(() => {
    if (!dataGenerus?.data || !tanggal) return;

    const initial: Record<number, StatusAbsen> = {};

    // default ALPA
    dataGenerus.data.forEach((g: IGenerus) => {
      if (!g.id) return;
      initial[g.id] = "ALPA";
    });

    // override dari DB
    const absenList = dataAbsen?.data?.data;
    if (Array.isArray(absenList)) {
      absenList.forEach((absen: AbsenItem) => {
        if (absen.caberawitId) {
          initial[absen.caberawitId] = absen.status;
        }
      });
    }

    // 🔥 MERGE, JANGAN RESET
    setAttendance((prev) => {
      const merged = { ...prev };
      Object.entries(initial).forEach(([id, status]) => {
        const numId = Number(id);
        if (!merged[numId]) {
          merged[numId] = status;
        }
      });
      return merged;
    });
  }, [tanggal, dataGenerus, dataAbsen]);

  /* =========================
     HANDLE CHANGE STATUS
  ========================= */
  const onChangeStatus = useCallback((id: number, status: StatusAbsen) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: status,
    }));
    console.log("CLICKED", id, status);
  }, []);

  /* =========================
     PILIH TANGGAL
  ========================= */
  const onSelectDate = (day: number) => {
    const formatted = `${selectedYear}-${String(selectedMonth).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    router.push(`?tanggal=${formatted}`);
  };

  /* =========================
     RENDER CELL DATATABLE
  ========================= */
  const renderCell = useCallback(
    (generus: IGenerus, columnKey: React.Key): ReactNode => {
      if (!generus.id) return null;
      const current = attendance[generus.id] ?? "ALPA";

      switch (columnKey) {
        case "nama":
          return (
            <div className="flex items-center gap-3">
              <Avatar
                src={
                  generus.foto
                    ? `${process.env.NEXT_PUBLIC_IMAGE}${generus.foto}`
                    : undefined
                }
                name={getInitials(generus.nama)}
                showFallback
                className="bg-blue-100 text-blue-700 font-bold"
              />
              <span className="font-medium text-gray-800">{generus.nama}</span>
            </div>
          );

        case "jenjang":
          return generus.jenjang?.name ?? "-";

        case "kehadiran":
          return (
            <div
              className="flex justify-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              {STATUS_LIST.map((status) => (
                <label key={status} className="flex items-center gap-1 text-sm">
                  <input
                    type="radio"
                    name={`absen-${generus.id}`}
                    checked={current === status}
                    onChange={() => onChangeStatus(generus.id!, status)}
                  />
                  {status}
                </label>
              ))}
            </div>
          );

          return (
            <div className="flex justify-center gap-4">
              {STATUS_LIST.map((status) => (
                <label
                  key={status}
                  className="flex items-center gap-1 cursor-pointer text-sm"
                >
                  <input
                    type="radio"
                    checked={current === status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => onChangeStatus(generus.id!, status)}
                  />

                  {status}
                </label>
              ))}
            </div>
          );

        default:
          return null;
      }
    },
    [attendance, onChangeStatus]
  );

  const { handleClearSearch, handleSearch } = useChangeUrl();
  /* =========================
     RENDER
  ========================= */
  return (
    <section className="min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Attendance Caberawit</h1>

        <div className="flex flex-wrap items-center gap-3">
          {/* SEARCH */}
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

          {/* FILTER BUTTON */}
          <button
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className={`px-4 py-2 rounded-md text-sm border transition ${
              showFilter
                ? "bg-blue-50 text-blue-600 border-blue-400"
                : "hover:bg-gray-100"
            }`}
          >
            Filter
          </button>

          {/* SAVE */}
          {hasTanggal && (
            <Link
              href={`/admin/absent-caberawit/absent?tanggal=${tanggal}`}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-md text-sm"
            >
              Save Attendance
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* LEFT SIDEBAR */}
        <div className="col-span-3 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">Pilih Tanggal</h2>

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
                  "0"
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

        {/* MAIN CONTENT */}
        <div className="col-span-9 bg-white rounded-lg shadow p-4">
          {showFilter && (
            <div className="mb-4">
              {/* Content */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Select
                  label="Daerah"
                  selectedKeys={filter.daerah ? [filter.daerah] : []}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      daerah: e.target.value,
                    }))
                  }
                >
                  <SelectItem key="">Semua</SelectItem>
                  {dataDaerah?.map((item: IDaerah) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
                <Select
                  label="Desa"
                  selectedKeys={filter.desa ? [filter.desa] : []}
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      desa: e.target.value,
                    }))
                  }
                >
                  <SelectItem key="">Semua</SelectItem>
                  {dataDesa?.map((item: IDesa) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>
            </div>
          )}
          <DataTable
            columns={COLUMN_LIST_GENERUS}
            data={dataGenerus?.data || []}
            emptyContent="Data generus kosong"
            isLoading={isLoadingGenerus}
            renderCell={renderCell}
            totalPages={0}
            showSearch={false}
          />
        </div>
      </div>
    </section>
  );
};

export default AbsenCaberawit;
