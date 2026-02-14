import * as XLSX from "xlsx-js-style";
import { GroupedIndikator } from "@/types/Indikator";
import { RaporItem } from "@/types/Rapor";

type RaporValue = {
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
  status: RaporItem["status"];
};

const borderAll = {
  top: { style: "thin" },
  bottom: { style: "thin" },
  left: { style: "thin" },
  right: { style: "thin" },
};

export function exportRapotStyledExcel(
  groupedIndikator: GroupedIndikator[],
  raporMap: Map<string, RaporValue>,
  fileName = "rapot-caberawit.xlsx"
) {
  const rows: any[][] = [];
  const styles: Record<string, any> = {};
  const merges: XLSX.Range[] = [];

  // ===== HEADER =====
  rows.push(["NO", "MATERI PENGAJIAN", "PENGETAHUAN", "KETERAMPILAN", "STATUS"]);

  const headerStyle = {
    font: { bold: true, size: 12 },
    alignment: { horizontal: "center", vertical: "center" },
    fill: { fgColor: { rgb: "E5E7EB" } },
    border: borderAll,
  };

  for (let c = 0; c < 5; c++) {
    styles[XLSX.utils.encode_cell({ r: 0, c })] = headerStyle;
  }

  let rowIndex = 1;
  let no = 1;

  groupedIndikator.forEach((mata) => {
    const mapelStartRow = rowIndex;

    // ===== MATA PELAJARAN =====
    rows.push([no, mata.name.toUpperCase(), "", "", ""]);
    merges.push({ s: { r: rowIndex, c: 1 }, e: { r: rowIndex, c: 4 } });

    for (let c = 0; c < 5; c++) {
      styles[XLSX.utils.encode_cell({ r: rowIndex, c })] = {
        font: { bold: true, size: 12 },
        fill: { fgColor: { rgb: "F3F4F6" } },
        alignment: { vertical: "center" },
        border: borderAll,
      };
    }

    rowIndex++;

    mata.kategori.forEach((kat) => {
      // ===== KATEGORI =====
      rows.push(["", kat.name, "", "", ""]);
      merges.push({ s: { r: rowIndex, c: 1 }, e: { r: rowIndex, c: 4 } });

      for (let c = 0; c < 5; c++) {
        styles[XLSX.utils.encode_cell({ r: rowIndex, c })] = {
          font: { bold: true, size: 12 },
          border: borderAll,
        };
      }

      rowIndex++;

      kat.indikator.forEach((ind, idx) => {
        const rapor = raporMap.get(ind.id);
        const status =
          rapor?.status === "TUNTAS"
            ? "Tuntas"
            : rapor?.status === "TIDAK_TUNTAS"
            ? "Tidak Tuntas"
            : "";

        rows.push([
          "",
          `${String.fromCharCode(97 + idx)}. ${ind.name}`,
          rapor?.nilaiPengetahuan ?? "",
          rapor?.nilaiKeterampilan ?? "",
          status,
        ]);

        for (let c = 0; c < 5; c++) {
          styles[XLSX.utils.encode_cell({ r: rowIndex, c })] = {
            font: { size: 12 },
            border: borderAll,
            alignment:
              c >= 2
                ? { horizontal: "center", vertical: "center" }
                : { vertical: "center" },
          };
        }

        // WARNA STATUS
        styles[XLSX.utils.encode_cell({ r: rowIndex, c: 4 })].fill =
          status === "Tuntas"
            ? { fgColor: { rgb: "DCFCE7" } }
            : status === "Tidak Tuntas"
            ? { fgColor: { rgb: "FEE2E2" } }
            : undefined;

        rowIndex++;
      });
    });

    // ===== MERGE NO (VERTIKAL) =====
    merges.push({
      s: { r: mapelStartRow, c: 0 },
      e: { r: rowIndex - 1, c: 0 },
    });

    no++;
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  ws["!merges"] = merges;
  ws["!cols"] = [
    { wch: 5 },
    { wch: 65 },
    { wch: 15 },
    { wch: 15 },
    { wch: 18 },
  ];

  Object.keys(styles).forEach((cell) => {
    ws[cell].s = styles[cell];
  });

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rapot");
  XLSX.writeFile(wb, fileName);
}
