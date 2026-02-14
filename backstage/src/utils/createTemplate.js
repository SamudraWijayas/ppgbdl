import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

async function createTemplate() {
  const workbook = new ExcelJS.Workbook();

  // Cover sheet
  const cover = workbook.addWorksheet("Cover");
  cover.mergeCells("B2", "E2");
  cover.getCell("B2").value = "LAPORAN PENCAPAIAN KOMPETENSI SANTRI";
  cover.getCell("B2").font = { bold: true, size: 16 };
  cover.getCell("B2").alignment = { horizontal: "center" };

  // Identitas sheet
  const identitas = workbook.addWorksheet("Identitas");
  identitas.addRow(["Identitas Caberawit"]).font = { bold: true, size: 16 };

  // Nilai sheet
  const nilai = workbook.addWorksheet("Nilai");
  const header = nilai.addRow(["No", "Indikator", "Status"]);
  header.font = { bold: true };
  header.eachCell((cell) => {
    cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    cell.alignment = { horizontal: "center" };
  });

  // Lebar kolom
  [cover, identitas, nilai].forEach((sheet) => {
    sheet.columns.forEach((col) => (col.width = 25));
  });

  // Simpan file
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

  const filePath = path.join(publicDir, "rapot.xlsx");
  const buffer = await workbook.xlsx.writeBuffer();
  fs.writeFileSync(filePath, buffer);

  console.log("Template Excel berhasil dibuat di:", filePath);
}

createTemplate().catch(console.error);
