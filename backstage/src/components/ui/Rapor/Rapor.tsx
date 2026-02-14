"use client";

import useRapotCaberawit from "@/components/views/Admin/RapotCaberawit/useRapotCaberawit";
import { GroupedIndikator, IndikatorItem } from "@/types/Indikator";
import { RaporItem } from "@/types/Rapor";
import { exportRapotStyledExcel } from "@/utils/exportRapotToExcel";
import { Button, Skeleton, useDisclosure } from "@heroui/react";
import React from "react";
import AddRapor from "./addRapor/addRapor";

const Rapor = () => {
  const {
    dataGenerus,
    isLoadingGenerus,
    dataIndikator,
    isLoadingIndikator,
    dataRapor,
    refetchRapor,
    RekapAbsen,
    Catatan,
  } = useRapotCaberawit();
  const Rekap = RekapAbsen?.data.data ?? 0;
  const CatatanWali = Catatan?.data.data ?? "";
  const addRapor = useDisclosure();
  const semester = dataIndikator?.data?.[0];
  console.log("semster", semester);

  const Caberawit = dataGenerus?.data;
  const handleExportExcel = () => {
    if (!Caberawit) return;

    exportRapotStyledExcel(
      groupedIndikator,
      raporMap,
      Caberawit,
      Rekap,
      CatatanWali,
      semester,
    );
  };

  const groupedIndikator: GroupedIndikator[] = React.useMemo(() => {
    const source = dataIndikator?.data as IndikatorItem[] | undefined;
    if (!source) return [];

    const map = new Map<string, GroupedIndikator>();

    source.forEach((item) => {
      const mata = item.kategoriIndikator.mataPelajaran;
      if (!map.has(mata.id)) {
        map.set(mata.id, { id: mata.id, name: mata.name, kategori: [] });
      }
      const rw = map.get(mata.id)!;
      const kategori = item.kategoriIndikator;

      let cat = rw.kategori.find((x) => x.id === kategori.id);
      if (!cat) {
        cat = { id: kategori.id, name: kategori.name, indikator: [] };
        rw.kategori.push(cat);
      }

      cat.indikator.push({
        id: item.id,
        name: item.indikator.trim(),
        semester: item.semester,
        jenisPenilaian: item.jenisPenilaian,
      });
    });

    return Array.from(map.values());
  }, [dataIndikator]);

  type RaporValue = {
    nilaiPengetahuan: number | null;
    nilaiKeterampilan: number | null;
    status: RaporItem["status"];
  };

  const raporMap = React.useMemo(() => {
    const list: RaporItem[] = dataRapor?.data ?? [];
    return new Map<string, RaporValue>(
      list.map((r) => [
        r.id_indikator,
        {
          nilaiPengetahuan: r.nilaiPengetahuan,
          nilaiKeterampilan: r.nilaiKeterampilan,
          status: r.status,
        },
      ]),
    );
  }, [dataRapor]);

  if (isLoadingGenerus || isLoadingIndikator) {
    return <RaporSkeleton />;
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "TUNTAS":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
            Tuntas
          </span>
        );
      case "TIDAK_TUNTAS":
        return (
          <span className="px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
            Tidak Tuntas
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 rounded-full">
            -
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Card Info Caberawit */}
      <div
        className="
    bg-white p-6 rounded-2xl
    shadow-sm hover:shadow-lg
    transition-all duration-300
  "
      >
        {/* ===== HEADER ===== */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Penilaian Caberawit
          </h2>

          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
            Rapor
          </span>
        </div>

        {Caberawit ? (
          <div
            className="
        flex flex-col gap-5
        sm:flex-row sm:items-center sm:justify-between
      "
          >
            {/* ===== INFO ===== */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className="
            w-14 h-14 rounded-full
            bg-linear-to-br from-[#293c88] to-indigo-500
            text-white flex items-center justify-center
            text-xl font-semibold shadow-md
          "
              >
                {Caberawit.nama?.charAt(0).toUpperCase()}
              </div>

              {/* Text */}
              <div className="space-y-1">
                <p className="text-lg font-semibold text-gray-900">
                  {Caberawit.nama}
                </p>
                <p className="text-sm text-gray-500">
                  Jenjang:{" "}
                  <span className="font-medium text-gray-700">
                    {Caberawit.jenjang?.name || "-"}
                  </span>
                </p>
              </div>
            </div>

            {/* ===== ACTIONS ===== */}
            <div className="flex gap-2">
              <Button
                color="primary"
                variant="solid"
                className="font-medium"
                onPress={addRapor.onOpen}
              >
                Isi Nilai
              </Button>

              <Button
                color="secondary"
                variant="flat"
                className="font-medium"
                onPress={handleExportExcel}
              >
                Export Excel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-gray-500 italic">
            Data Caberawit tidak ditemukan
          </div>
        )}
      </div>

      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
        <div className="flex-1 px-4 py-3 text-center">
          <p className="text-xs text-gray-500">Hadir</p>
          <p className="text-xl font-semibold text-gray-800">{Rekap.HADIR}</p>
        </div>

        <div className="w-px bg-gray-200" />

        <div className="flex-1 px-4 py-3 text-center">
          <p className="text-xs text-gray-500">Sakit</p>
          <p className="text-xl font-semibold text-gray-800">{Rekap.SAKIT}</p>
        </div>

        <div className="w-px bg-gray-200" />

        <div className="flex-1 px-4 py-3 text-center">
          <p className="text-xs text-gray-500">Izin</p>
          <p className="text-xl font-semibold text-gray-800">{Rekap.IZIN}</p>
        </div>

        <div className="w-px bg-gray-200" />

        <div className="flex-1 px-4 py-3 text-center">
          <p className="text-xs text-red-500">Tidak hadir</p>
          <p className="text-xl font-semibold text-red-600">{Rekap.ALPA}</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white divide-y divide-gray-200 rounded-xl text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold w-10">
                NO
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-semibold">
                MATERI PENGAJIAN
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-semibold w-24">
                PENGETAHUAN
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-semibold w-24">
                KETERAMPILAN
              </th>
              <th className="px-4 py-3 text-center text-gray-600 font-semibold">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {groupedIndikator.map((mata, i) => (
              <React.Fragment key={mata.id}>
                <tr className="bg-gray-100">
                  <td className="px-4 py-2 font-bold text-center">{i + 1}</td>
                  <td className="px-4 py-2 font-bold uppercase" colSpan={4}>
                    {mata.name}
                  </td>
                </tr>

                {mata.kategori.map((kat) => (
                  <React.Fragment key={kat.id}>
                    <tr className="bg-gray-50 font-semibold">
                      <td></td>
                      <td className="px-4 py-2" colSpan={4}>
                        {kat.name}
                      </td>
                    </tr>

                    {kat.indikator.map((ind, idx) => (
                      <tr
                        key={ind.id}
                        className="hover:bg-gray-100 transition-colors"
                      >
                        <td></td>
                        <td className="px-4 py-2 flex gap-1">
                          <span>{String.fromCharCode(97 + idx)}.</span>
                          <span>{ind.name}</span>
                        </td>
                        <td className="px-4 py-2 text-center">
                          {raporMap.get(ind.id)?.nilaiPengetahuan ?? "-"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {raporMap.get(ind.id)?.nilaiKeterampilan ?? "-"}
                        </td>
                        <td className="px-4 py-2 text-center">
                          {getStatusBadge(raporMap.get(ind.id)?.status)}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-xl border border-gray-200 bg-white rounded-md p-4 text-sm text-gray-700 leading-relaxed whitespace-pre-line">
        <p className="mb-2 font-medium text-gray-800">Catatan Wali Kelas</p>

        <div className="mb-4">
          {CatatanWali.catatan || (
            <span className="italic text-gray-400">
              Belum ada catatan dari wali kelas
            </span>
          )}
        </div>

        <div className="pt-2 border-t border-gray-300 text-right text-xs text-gray-500">
          Wali Kelas,
          <br />
          <span className="font-medium text-gray-700">
            {Caberawit?.wali?.fullName || "Belum ada guru"}
          </span>
        </div>
      </div>

      <AddRapor {...addRapor} refetchRapor={refetchRapor} />
    </div>
  );
};

const RaporSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Card Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-48 rounded-lg" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40 rounded-md" />
            <Skeleton className="h-3 w-28 rounded-md" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
      </div>

      {/* Rekap Absen */}
      <div className="flex border border-gray-200 rounded-lg bg-white overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 px-4 py-3 text-center space-y-2">
            <Skeleton className="h-3 w-16 mx-auto rounded-md" />
            <Skeleton className="h-6 w-10 mx-auto rounded-md" />
          </div>
        ))}
      </div>

      {/* Table Skeleton */}
      <div className="bg-white rounded-xl shadow-md p-4 space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-4 w-full rounded-md" />
        ))}
      </div>

      {/* Catatan */}
      <div className="bg-white rounded-md p-4 space-y-3">
        <Skeleton className="h-4 w-40 rounded-md" />
        <Skeleton className="h-20 w-full rounded-md" />
        <Skeleton className="h-3 w-32 ml-auto rounded-md" />
      </div>
    </div>
  );
};

export default Rapor;
