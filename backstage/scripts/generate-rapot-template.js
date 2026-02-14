const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

async function generate() {
  const outDir = path.join(__dirname, "..", "public", "templates");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "rapot-cls-template.xlsx");

  const wb = new ExcelJS.Workbook();

  // Cover sheet with placeholders
  const cover = wb.addWorksheet("Cover");
  cover.mergeCells("B2", "E2");
  cover.getCell("B2").value = "LAPORAN PENCAPAIAN KOMPETENSI SANTRI";
  cover.getCell("B2").font = { bold: true, size: 16 };
  cover.getCell("B2").alignment = { horizontal: "center" };

  cover.mergeCells("B3", "E3");
  cover.getCell("B3").value = "TAMAN PENDIDIKAN ALQURAN";
  cover.getCell("B3").font = { bold: true, size: 14 };
  cover.getCell("B3").alignment = { horizontal: "center" };

  cover.addRow([]);
  cover.addRow(["Nama TPQ / TPA", ":", "{{NAMA}}"]);
  cover.addRow(["Alamat", ":", "{{DESA}}, {{DAERAH}}"]);
  cover.addRow(["Kelas / Jenjang", ":", "{{KELAS}} / {{JENJANG}}"]);
  cover.addRow(["Semester / Tahun", ":", "{{SEMESTER_TAHUN}}"]);

  // Identitas sheet with placeholders
  const identitas = wb.addWorksheet("Identitas");
  identitas.addRow(["Identitas Caberawit"]);
  identitas.getRow(1).font = { bold: true, size: 14 };
  identitas.addRow([]);
  identitas.addRow(["Nama", "{{NAMA}}"]);
  identitas.addRow(["Tanggal Lahir", "{{TGL_LAHIR}}"]);
  identitas.addRow(["Jenis Kelamin", "{{JENIS_KELAMIN}}"]);
  identitas.addRow(["Golongan Darah", "{{GOL_DARAH}}"]);
  identitas.addRow(["Nama Orang Tua", "{{NAMA_ORTU}}"]);
  identitas.addRow(["Kelas", "{{KELAS}}"]);
  identitas.addRow(["Jenjang", "{{JENJANG}}"]);
  identitas.addRow(["Daerah", "{{DAERAH}}"]);
  identitas.addRow(["Desa", "{{DESA}}"]);
  identitas.addRow(["Kelompok", "{{KELOMPOK}}"]);

  // Nilai sheet with header ready for indikator rows
  const nilai = wb.addWorksheet("Nilai");
  const header = nilai.addRow(["No", "Indikator", "Status"]);
  header.font = { bold: true };
  header.eachCell((cell) => {
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { horizontal: "center" };
  });

  // Pre-fill a couple of rows as example (they will be overwritten)
  nilai.addRow([1, "{{INDIKATOR_1}}", "{{STATUS_1}}"]);
  nilai.addRow([2, "{{INDIKATOR_2}}", "{{STATUS_2}}"]);

  // Save
  await wb.xlsx.writeFile(outPath);
  console.log("Template written to", outPath);
}

generate().catch((err) => {
  console.error("Failed to generate template", err);
  process.exit(1);
});
