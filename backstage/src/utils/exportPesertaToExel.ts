import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { Peserta } from "@/types/Kegiatan";

export const exportPesertaToExcel = async (
  peserta: Peserta[],
  namaKegiatan?: string,
) => {
  if (!peserta || peserta.length === 0) return;

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Peserta");

  // Header
  worksheet.columns = [
    { header: "Nama", key: "nama", width: 25 },
    { header: "Jenjang", key: "jenjang", width: 20 },
    { header: "Jenis Kelamin", key: "jenis_kelamin", width: 15 },
    { header: "Usia", key: "usia", width: 10 },
    { header: "Kelompok", key: "kelompok", width: 20 },
    { header: "Desa", key: "desa", width: 20 },
    { header: "Mahasiswa", key: "mahasiswa", width: 15 },
    { header: "Status", key: "status", width: 15 },
  ];

  // Style Header
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

  // Add Rows
  peserta.forEach((p) => {
    const usia = p.tgl_lahir
      ? Math.floor(
          (Date.now() - new Date(p.tgl_lahir).getTime()) /
            (1000 * 60 * 60 * 24 * 365),
        )
      : "-";

    worksheet.addRow({
      nama: p.nama ?? "-",
      jenjang: p.jenjang?.name ?? "-",
      jenis_kelamin: p.jenis_kelamin ?? "-",
      usia,
      kelompok: p.kelompok?.name ?? "-",
      desa: p.desa?.name ?? "-",
      mahasiswa: p.mahasiswa ? "Aktif" : "Tidak Aktif",
      status: p.status ?? "-",
    });
  });

  // Add table style
  worksheet.addTable({
    name: "PesertaTable",
    ref: "A1",
    headerRow: true,
    style: {
      theme: "TableStyleMedium2",
      showRowStripes: true,
    },
    columns: worksheet.columns.map((col) => ({
      name: col.header as string,
      filterButton: true,
    })),
    rows: peserta.map((p) => {
      const usia = p.tgl_lahir
        ? Math.floor(
            (Date.now() - new Date(p.tgl_lahir).getTime()) /
              (1000 * 60 * 60 * 24 * 365),
          )
        : "-";

      return [
        p.nama ?? "-",
        p.jenjang?.name ?? "-",
        p.jenis_kelamin ?? "-",
        usia,
        p.kelompok?.name ?? "-",
        p.desa?.name ?? "-",
        p.mahasiswa ? "Aktif" : "Tidak Aktif",
        p.status ?? "-",
      ];
    }),
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `Peserta_${namaKegiatan ?? "Kegiatan"}.xlsx`);
};
