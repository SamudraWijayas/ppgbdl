import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { GroupedIndikator } from "@/types/Indikator";

type RaporValue = {
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
  status?: string;
};

function formatTanggalIndo(date?: string) {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function applyGlobalFont(
  ws: ExcelJS.Worksheet,
  fontName = "Bahnschrift Light SemiCondensed",
) {
  ws.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.font = {
        ...(cell.font ?? {}),
        name: fontName,
      };
    });
  });
}

/* ================= PLACEHOLDER ================= */

function replacePlaceholdersWorkbook(
  wb: ExcelJS.Workbook,
  values: Record<string, string | number | undefined>,
) {
  wb.eachSheet((ws) => {
    ws.eachRow((row) => {
      row.eachCell((cell) => {
        // ================= STRING =================
        if (typeof cell.value === "string") {
          let text = cell.value;

          Object.entries(values).forEach(([key, val]) => {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
            text = text.replace(regex, String(val ?? ""));
          });

          cell.value = text;
          return;
        }

        // ================= RICH TEXT =================
        if (
          cell.value &&
          typeof cell.value === "object" &&
          "richText" in cell.value
        ) {
          cell.value.richText.forEach((rt) => {
            Object.entries(values).forEach(([key, val]) => {
              const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
              rt.text = rt.text.replace(regex, String(val ?? ""));
            });
          });
        }

        // ================= FORMULA RESULT =================
        if (
          cell.value &&
          typeof cell.value === "object" &&
          "result" in cell.value &&
          typeof cell.value.result === "string"
        ) {
          let text = cell.value.result;

          Object.entries(values).forEach(([key, val]) => {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
            text = text.replace(regex, String(val ?? ""));
          });

          cell.value.result = text;
        }
      });
    });
  });
}

/* ================= STYLE ================= */

const borderAll: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

const center: Partial<ExcelJS.Alignment> = {
  vertical: "middle",
  horizontal: "center",
};

const left: Partial<ExcelJS.Alignment> = {
  vertical: "middle",
  horizontal: "left",
};

/* ================= HELPER ================= */

function borderRow(ws: ExcelJS.Worksheet, row: number) {
  for (let c = 65; c <= 74; c++) {
    ws.getCell(`${String.fromCharCode(c)}${row}`).border = borderAll;
  }
}

function safeMerge(ws: ExcelJS.Worksheet, range: string) {
  try {
    ws.mergeCells(range);
  } catch {
    // sudah merge → skip
  }
}

function insertMergedRow(ws: ExcelJS.Worksheet, row: number) {
  ws.insertRow(row, []);
  safeMerge(ws, `B${row}:G${row}`);
}

/* ================= EXPORT ================= */

export async function exportRapotStyledExcel(
  groupedIndikator: GroupedIndikator[],
  raporMap: Map<string, RaporValue>,
  Caberawit?: {
    nama?: string;
    jenis_kelamin?: string;
    tgl_lahir?: string;
    nama_ortu?: string;
    jenjang?: { name?: string };
    wali?: { fullName?: string };
    kelasJenjang?: { name?: string };
  },
  Rekap?: {
    HADIR?: string;
    SAKIT?: string;
    IZIN?: string;
    ALPA?: string;
  },
  CatatanWali?: {
    catatan?: string;
  },
  semester?: {
    semester?: string;
  },
) {
  const res = await fetch("/templates/templates.xlsx");
  const buffer = await res.arrayBuffer();

  const wb = new ExcelJS.Workbook();
  await wb.xlsx.load(buffer);

  /* 🔥 REPLACE PLACEHOLDER DI SEMUA SHEET */
  replacePlaceholdersWorkbook(wb, {
    nama: Caberawit?.nama,
    jenjang: Caberawit?.jenjang?.name,
    kelas: Caberawit?.kelasJenjang?.name,
    kelamin: Caberawit?.jenis_kelamin,
    tglLahir: formatTanggalIndo(Caberawit?.tgl_lahir),
    ortu: Caberawit?.nama_ortu,
    wali: Caberawit?.wali?.fullName,
    hadir: Rekap?.HADIR,
    sakit: Rekap?.SAKIT,
    izin: Rekap?.IZIN,
    alpa: Rekap?.ALPA,
    catatan: CatatanWali?.catatan,
    semester: semester?.semester,
  });

  const ws = wb.getWorksheet("Cetak Rapot");
  if (!ws) throw new Error("Sheet tidak ditemukan");

  /* ================= HEADER ================= */

  const headerRow = 7;

  safeMerge(ws, "B7:G7");

  ws.getCell("A7").value = "No";
  ws.getCell("B7").value = "Materi Pengajian";
  ws.getCell("H7").value = "Pengetahuan";
  ws.getCell("I7").value = "Keterampilan";
  ws.getCell("J7").value = "Status";

  ["A7", "B7", "H7", "I7", "J7"].forEach((c) => {
    const cell = ws.getCell(c);
    cell.font = {
      name: "Bahnschrift Light SemiCondensed",
      bold: true,
    };
    cell.alignment = center;
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE5E7EB" },
    };
  });

  borderRow(ws, headerRow);
  ws.getRow(headerRow).height = 23;

  /* ================= DATA ================= */

  let row = 8;
  let no = 1;

  groupedIndikator.forEach((mata) => {
    /* ===== MAPEL ===== */
    insertMergedRow(ws, row);

    ws.getCell(`A${row}`).value = no++;
    ws.getCell(`A${row}`).alignment = center;
    ws.getCell(`B${row}`).value = mata.name.toUpperCase();
    ws.getCell(`B${row}`).font = { bold: true };
    ws.getCell(`B${row}`).alignment = left;
    ws.getCell(`B${row}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF3F4F6" },
    };

    borderRow(ws, row);
    ws.getRow(row).height = 20;
    row++;

    mata.kategori.forEach((kat) => {
      /* ===== KATEGORI ===== */
      insertMergedRow(ws, row);

      ws.getCell(`B${row}`).value = kat.name;
      ws.getCell(`B${row}`).font = { bold: true };
      ws.getCell(`B${row}`).alignment = left;

      borderRow(ws, row);
      ws.getRow(row).height = 16;

      row++;

      kat.indikator.forEach((ind, i) => {
        const rapor = raporMap.get(ind.id);

        /* ===== INDIKATOR ===== */
        insertMergedRow(ws, row);

        ws.getCell(`B${row}`).value =
          `${String.fromCharCode(97 + i)}. ${ind.name}`;
        ws.getCell(`B${row}`).alignment = left;

        ws.getCell(`H${row}`).value = rapor?.nilaiPengetahuan ?? "";
        ws.getCell(`I${row}`).value = rapor?.nilaiKeterampilan ?? "";
        ws.getCell(`H${row}`).alignment = center;
        ws.getCell(`I${row}`).alignment = center;

        const status =
          rapor?.status === "TUNTAS"
            ? "Tuntas"
            : rapor?.status === "TIDAK_TUNTAS"
              ? "Tidak Tuntas"
              : "";

        ws.getCell(`J${row}`).value = status;
        ws.getCell(`J${row}`).alignment = center;

        borderRow(ws, row);
        // ws.getRow(row).height = 20;

        row++;
      });
    });
  });
  applyGlobalFont(ws);
  /* ================= EXPORT ================= */

  const out = await wb.xlsx.writeBuffer();
  saveAs(new Blob([out]), "Raport-Caberawit.xlsx");
}
