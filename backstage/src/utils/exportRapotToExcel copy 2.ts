import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { GroupedIndikator } from "@/types/Indikator";

type RaporValue = {
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
  status?: string;
};

export async function exportRapotStyledExcel(
  groupedIndikator: GroupedIndikator[],
  raporMap: Map<string, RaporValue>,
) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Rapor");

  /* ================= HEADER RAPOR ================= */
  sheet.mergeCells("A1:E1");
  sheet.getCell("A1").value = "LAPORAN HASIL BELAJAR";
  sheet.getCell("A1").font = { bold: true, size: 14 };
  sheet.getCell("A1").alignment = { horizontal: "center" };

  sheet.mergeCells("A2:E2");
  sheet.getCell("A2").value = "CABERAWIT";
  sheet.getCell("A2").alignment = { horizontal: "center" };

  sheet.addRow([]);

  /* ================= HEADER TABLE ================= */
  const headerRow = sheet.addRow([
    "No",
    "Materi Pengajian",
    "Pengetahuan",
    "Keterampilan",
    "Status",
  ]);

  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE5E7EB" },
    };
  });

  sheet.columns = [
    { width: 6 },
    { width: 45 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
  ];

  /* ================= ISI DATA ================= */
  let no = 1;

  groupedIndikator.forEach((mata) => {
    // Baris Mapel
    const mapelRow = sheet.addRow([no++, mata.name, "", "", ""]);
    sheet.mergeCells(
      `B${mapelRow.number}:E${mapelRow.number}`,
    );

    mapelRow.font = { bold: true };
    mapelRow.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF3F4F6" },
      };
    });

    mata.kategori.forEach((kat) => {
      // Baris Kategori
      const katRow = sheet.addRow(["", kat.name, "", "", ""]);
      sheet.mergeCells(
        `B${katRow.number}:E${katRow.number}`,
      );

      katRow.font = { italic: true };
      katRow.eachCell((cell) => {
        cell.border = {
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      kat.indikator.forEach((ind, idx) => {
        const rapor = raporMap.get(ind.id);

        const row = sheet.addRow([
          "",
          `${String.fromCharCode(97 + idx)}. ${ind.name}`,
          rapor?.nilaiPengetahuan ?? "-",
          rapor?.nilaiKeterampilan ?? "-",
          rapor?.status ?? "-",
        ]);

        row.eachCell((cell, col) => {
          cell.border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          if (col >= 3) {
            cell.alignment = { horizontal: "center" };
          }
        });
      });
    });
  });

  /* ================= FOOTER ================= */
  sheet.addRow([]);
  const waliRow = sheet.addRow(["", "Wali Kelas,", "", "", ""]);
  sheet.mergeCells(`B${waliRow.number}:E${waliRow.number}`);

  const namaWaliRow = sheet.addRow(["", "____________________", "", "", ""]);
  sheet.mergeCells(`B${namaWaliRow.number}:E${namaWaliRow.number}`);

  /* ================= EXPORT ================= */
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([buffer]),
    "Raport_Caberawit.xlsx",
  );
}
