"use client";
import React from "react";
import useRapotCaberawit from "./useRapotCaberawit";
import { GroupedIndikator, IndikatorItem } from "@/types/Indikator";
import { Button, useDisclosure } from "@heroui/react";
import AddRapor from "./addRapor/addRapor";
import { RaporItem } from "@/types/Rapor";

const RapotCaberawit = () => {
  const {
    dataGenerus,
    isLoadingGenerus,
    dataIndikator,
    isLoadingIndikator,
    isRefetchingIndikator,
    dataRapor,
    isLoadingRapor,
    refetchRapor,
  } = useRapotCaberawit();
  const addRapor = useDisclosure();
  console.log("data", dataRapor);

  const caberawit = dataGenerus?.data;

  const groupedIndikator: GroupedIndikator[] = React.useMemo(() => {
    const source = dataIndikator?.data as IndikatorItem[] | undefined;
    if (!source) return [];

    const map = new Map<string, GroupedIndikator>();

    source.forEach((item) => {
      const mata = item.kategoriIndikator.mataPelajaran;

      if (!map.has(mata.id)) {
        map.set(mata.id, {
          id: mata.id,
          name: mata.name,
          kategori: [],
        });
      }

      const rw = map.get(mata.id)!;
      const kategori = item.kategoriIndikator;

      let cat = rw.kategori.find((x) => x.id === kategori.id);
      if (!cat) {
        cat = {
          id: kategori.id,
          name: kategori.name,
          indikator: [],
        };
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

  return (
    <div className="space-y-6">
      {/* Card Info Caberawit */}
      <div className="bg-white p-5 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Rapor Caberawit</h2>

        {caberawit ? (
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              Nama: <span className="font-semibold">{caberawit.nama}</span>
            </p>
            <p>
              Jenjang:{" "}
              <span className="font-semibold">
                {caberawit.jenjang?.name || "-"}
              </span>
            </p>
            <Button color="primary" variant="solid" onPress={addRapor.onOpen}>
              Tambah Rapot
            </Button>
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            Data caberawit tidak ditemukan
          </p>
        )}
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto ">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg text-sm divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 px-4 py-2 w-10 text-left">
                NO
              </th>
              <th className="border-b border-gray-200 px-4 py-2 text-left">
                MATERI PENGAJIAN
              </th>
              <th className="border-b border-gray-200 px-4 py-2 w-24 text-center">
                PENGETAHUAN
              </th>
              <th className="border-b border-gray-200 px-4 py-2 w-24 text-center">
                KETERAMPILAN
              </th>
              <th className="border-b border-gray-200 px-4 py-2  text-center">
                STATUS
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {groupedIndikator.map((mata, i) => (
              <React.Fragment key={mata.id}>
                <tr className="bg-cyan-100">
                  <td className="px-4 py-2 font-bold text-center">{i + 1}</td>
                  <td className="px-4 py-2 font-bold uppercase" colSpan={4}>
                    {mata.name}
                  </td>
                </tr>

                {mata.kategori.map((kat) => (
                  <React.Fragment key={kat.id}>
                    <tr className="bg-cyan-50 font-semibold">
                      <td></td>
                      <td className="px-4 py-2" colSpan={4}>
                        {kat.name}
                      </td>
                    </tr>

                    {kat.indikator.map((ind, idx) => (
                      <tr
                        key={ind.id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td></td>
                        <td className="px-4 py-2 flex gap-1">
                          <span>{String.fromCharCode(97 + idx)}.</span>
                          <span>{ind.name}</span>
                        </td>
                        {(() => {
                          const rapor = raporMap.get(ind.id);

                          return (
                            <>
                              <td className="px-4 py-2 text-center">
                                {rapor?.nilaiPengetahuan ?? "-"}
                              </td>

                              <td className="px-4 py-2 text-center">
                                {rapor?.nilaiKeterampilan ?? "-"}
                              </td>

                              <td
                                className={`px-4 py-2 text-center font-semibold ${
                                  rapor?.status === "TUNTAS"
                                    ? "text-green-600"
                                    : rapor?.status === "TIDAK_TUNTAS"
                                      ? "text-red-600"
                                      : "text-gray-500"
                                }`}
                              >
                                {rapor?.status
                                  ? rapor.status.replace("_", " ")
                                  : "-"}
                              </td>
                            </>
                          );
                        })()}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <AddRapor {...addRapor} refetchRapor={refetchRapor} />
    </div>
  );
};

export default RapotCaberawit;
