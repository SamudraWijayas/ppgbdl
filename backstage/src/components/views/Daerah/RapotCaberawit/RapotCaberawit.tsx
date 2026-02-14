"use client";
import React from "react";
import useRapotCaberawit from "./useRapotCaberawit";
import { GroupedIndikator, IndikatorItem } from "@/types/Indikator";
import { Button, useDisclosure } from "@heroui/react";
import AddRapor from "./addRapor/addRapor";
import { RaporItem } from "@/types/Rapor";
import { exportRapotStyledExcel } from "@/utils/exportRapotToExcel";

const RapotCaberawit = () => {
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
    return <p className="text-sm text-gray-500">Loading...</p>;
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
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Penilaian Caberawit
        </h2>

        {Caberawit ? (
          <div className="flex items-center justify-between text-gray-700">
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Nama:</span> {Caberawit.nama}
              </p>
              <p>
                <span className="font-semibold">Jenjang:</span>{" "}
                {Caberawit.jenjang?.name || "-"}
              </p>
            </div>

            <Button color="primary" variant="solid" onPress={addRapor.onOpen}>
              Isi Nilai
            </Button>
            <Button
              color="secondary"
              variant="flat"
              onPress={handleExportExcel}
            >
              Export Excel
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Data Caberawit tidak ditemukan
          </p>
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

export default RapotCaberawit;
