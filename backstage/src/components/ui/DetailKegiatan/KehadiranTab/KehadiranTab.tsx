"use client";

import React, { ReactNode, useCallback } from "react";
import { Card, CardHeader, Chip, Avatar } from "@heroui/react";
import { IKegiatan, Peserta } from "@/types/Kegiatan";
import DataTable from "@/components/ui/DataTable";
import { exportPesertaToExcel } from "@/utils/exportPesertaToExel";

interface PropTypes {
  dataKegiatan: {
    kegiatan: IKegiatan;
    peserta: Peserta[];
  } | null;
  isLoading?: boolean;
}

const COLUMN_LIST_PESERTA = [
  { name: "FOTO", uid: "foto" },
  { name: "NAMA", uid: "nama" },
  { name: "JENJANG", uid: "jenjang" },
  { name: "JENIS KELAMIN", uid: "jenis_kelamin" },
  { name: "USIA", uid: "usia" },
  { name: "KELOMPOK", uid: "kelompok" },
  { name: "DESA", uid: "desa" },
  { name: "STATUS MAHASISWA", uid: "mahasiswa" },
  { name: "STATUS", uid: "status" },
];

const KehadiranTab = ({ dataKegiatan, isLoading = false }: PropTypes) => {
  const kegiatan = dataKegiatan?.kegiatan;
  const peserta = dataKegiatan?.peserta || [];

  type StatusAbsen = "HADIR" | "TERLAMBAT" | "TIDAK_HADIR";
  // interface Item {
  //   status: StatusAbsen;
  // }
  // 🔹 renderCell sesuai kolom
  const renderCell = useCallback((item: Peserta, columnKey: React.Key) => {
    const cellValue = item[columnKey as keyof Peserta];

    const statusColorMap: Record<
      StatusAbsen,
      "success" | "warning" | "danger"
    > = {
      HADIR: "success",
      TERLAMBAT: "warning",
      TIDAK_HADIR: "danger",
    };

    switch (columnKey) {
      case "foto":
        return item.foto ? (
          <Avatar src={item.foto} alt={item.nama} size="md" radius="full" />
        ) : (
          <Avatar
            name={item.nama?.charAt(0) ?? "?"}
            size="md"
            radius="full"
            color="default"
            className="bg-blue-100 text-blue-600 border-blue-200"
          />
        );

      case "jenjang":
        return item.jenjang?.name || "-";

      case "kelompok":
        return item.kelompok?.name || "-";

      case "desa":
        return item.desa?.name || "-";

      case "usia":
        return (
          <span className="text-xs text-gray-500">
            {item.tgl_lahir
              ? `${Math.floor(
                  (Date.now() - new Date(item.tgl_lahir).getTime()) /
                    (1000 * 60 * 60 * 24 * 365),
                )} tahun`
              : "-"}
          </span>
        );

      case "mahasiswa":
        return (
          <Chip
            color={cellValue === true ? "success" : "danger"}
            variant="flat"
            size="sm"
          >
            {cellValue === true ? "Aktif" : "Tidak Aktif"}
          </Chip>
        );

      case "status":
        return (
          <Chip
            color={statusColorMap[item.status as keyof typeof statusColorMap]}
            variant="flat"
            size="sm"
          >
            {item.status}
          </Chip>
        );

      default:
        return cellValue as ReactNode;
    }
  }, []);

  return (
    <div className="py-6 space-y-8">
      {/* 🔹 Info Kegiatan */}
      <Card shadow="sm" className="bg-linear-to-br from-blue-50 to-white">
        <CardHeader className="px-6 py-5">
          {isLoading ? (
            <div className="space-y-3 animate-pulse w-full">
              <div className="h-6 w-56 bg-gray-300 rounded-lg" />
              <div className="h-4 w-72 bg-gray-200 rounded-lg" />
              <div className="h-4 w-48 bg-gray-200 rounded-lg" />
            </div>
          ) : kegiatan ? (
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* LEFT SIDE */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-blue-700 tracking-tight">
                  {kegiatan.name}
                </h2>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    {kegiatan.startDate
                      ? new Date(kegiatan.startDate).toLocaleDateString(
                          "id-ID",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          },
                        )
                      : "-"}{" "}
                    —{" "}
                    {kegiatan.endDate
                      ? new Date(kegiatan.endDate).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })
                      : "-"}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1">
                      
                      <span className="font-medium">
                        {kegiatan.desa?.name || "-"}
                      </span>
                    </span>

                    <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-700 rounded-full">
                      {kegiatan.tingkat}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex justify-start md:justify-end">
                <button
                  onClick={() => exportPesertaToExcel(peserta, kegiatan?.name)}
                  className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium"
                >
                  Export Peserta
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Data kegiatan tidak ditemukan.</p>
          )}
        </CardHeader>
      </Card>

      <DataTable
        columns={COLUMN_LIST_PESERTA}
        data={peserta as unknown as Record<string, unknown>[]} // ✅ cast aman
        renderCell={
          renderCell as unknown as (
            item: Record<string, unknown>,
            columnKey: React.Key,
          ) => ReactNode
        } // ✅ cast biar cocok sama prop
        emptyContent="Belum ada peserta terdaftar."
        isLoading={isLoading}
        totalPages={1}
        showSearch={false}
      />
    </div>
  );
};

export default KehadiranTab;
