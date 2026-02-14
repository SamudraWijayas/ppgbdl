import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface ICaberawit {
  nama: string;
  tgl_lahir: string;
  jenis_kelamin: string;
  gol_darah: string;
  nama_ortu: string;
  kelasJenjang: { name: string };
  jenjang: { name: string };
  daerah: { name: string };
  desa: { name: string };
  kelompok: { name: string };
}

interface IIndikatorItem {
  indikatorId: string;
  indikator: string;
  status: string | null;
  nilaiPengetahuan?: number | null;
  nilaiKeterampilan?: number | null;
}

interface IKategori {
  kategoriIndikator: string;
  kategoriIndikatorId: string;
  items: IIndikatorItem[];
}

interface IMataPelajaran {
  mataPelajaran: string;
  mataPelajaranId: string;
  kategoriIndikatorList: IKategori[];
}

export const exportRaport = async (
  caberawit: ICaberawit,
  indikatorData: IMataPelajaran[],
  semester: number,
  tahunAjaran: string
) => {
  try {
    const tplRes = await fetch("/templates/templates.xlsx");
    if (tplRes.ok) {
      const tplBuffer = await tplRes.arrayBuffer();
      const tplWb = new ExcelJS.Workbook();

      // load workbook
      // @ts-expect-error browser-safe
      await tplWb.xlsx.load(new Uint8Array(tplBuffer));

      // ===========================
      // 1️⃣ Replace Placeholders
      // ===========================
      const placeholders: Record<string, string> = {
        NAMA: caberawit.nama,
        TGL_LAHIR: new Date(caberawit.tgl_lahir).toLocaleDateString(),
        JENIS_KELAMIN: caberawit.jenis_kelamin,
        GOL_DARAH: caberawit.gol_darah,
        NAMA_ORTU: caberawit.nama_ortu,
        KELAS: caberawit.kelasJenjang.name,
        JENJANG: caberawit.jenjang.name,
        DAERAH: caberawit.daerah.name,
        DESA: caberawit.desa.name,
        KELOMPOK: caberawit.kelompok.name,
        SEMESTER_TAHUN: `Semester ${semester} / ${tahunAjaran}`,
      };

      tplWb.worksheets.forEach((ws) => {
        ws.eachRow((row) => {
          row.eachCell((cell) => {
            if (typeof cell.value === "string") {
              let val = cell.value;
              Object.entries(placeholders).forEach(([key, repl]) => {
                val = val.replaceAll(`{{${key}}}`, repl);
              });
              cell.value = val;
            }
          });
        });
      });

      // ===========================
      // 2️⃣ Isi Tabel Indikator (dengan Replace Placeholder)
      // ===========================

      // helper untuk replace placeholder pada cell
      function replaceInCell(cell: ExcelJS.Cell, dict: Record<string, any>) {
        if (typeof cell.value !== "string") return;

        let v = cell.value;
        Object.entries(dict).forEach(([key, val]) => {
          v = v.replaceAll(`{{${key}}}`, String(val ?? ""));
        });

        cell.value = v;
      }

      for (const ws of tplWb.worksheets) {
        let startRow: number | null = null;

        // Temukan header tabel
        ws.eachRow((row, rn) => {
          const c1 = row.getCell(1).value;
          const c2 = row.getCell(2).value;

          if (
            typeof c1 === "string" &&
            c1.toLowerCase().trim() === "no" &&
            typeof c2 === "string" &&
            c2.toLowerCase().includes("materi")
          ) {
            startRow = rn + 1;
          }
        });

        if (!startRow) continue;

        let currentRow = startRow;

        // ===============================
        // LOOP MATA PELAJARAN
        // ===============================
        for (const mp of indikatorData) {
          const mpRow = ws.insertRow(currentRow++, []);

          // Replace placeholder in entire row (if template uses them)
          mpRow.eachCell((cell) =>
            replaceInCell(cell, {
              MP_NAME: mp.mataPelajaran,
            })
          );

          mpRow.getCell("B").value =
            mpRow.getCell("B").value || mp.mataPelajaran.toUpperCase();
          mpRow.getCell("B").font = { bold: true };

          // ===============================
          // LOOP KATEGORI
          // ===============================
          for (const kategori of mp.kategoriIndikatorList) {
            const kategoriRow = ws.insertRow(currentRow++, []);

            kategoriRow.eachCell((cell) =>
              replaceInCell(cell, {
                MP_NAME: mp.mataPelajaran,
                KAT_NAME: kategori.kategoriIndikator,
              })
            );

            kategoriRow.getCell("B").value =
              kategoriRow.getCell("B").value || "" + kategori.kategoriIndikator;

            // ===============================
            // LOOP ITEM (INDIKATOR)
            // ===============================
            for (const item of kategori.items) {
              const r = ws.insertRow(currentRow++, []);

              // Replace placeholder di row (kalau template punya)
              r.eachCell((cell) =>
                replaceInCell(cell, {
                  MP_NAME: mp.mataPelajaran,
                  KAT_NAME: kategori.kategoriIndikator,
                  INDIKATOR: item.indikator,
                  NILAI_P: item.nilaiPengetahuan ?? "-",
                  NILAI_K: item.nilaiKeterampilan ?? "-",
                  STATUS: item.status ?? "-",
                })
              );

              r.getCell("C").value = r.getCell("C").value || item.indikator;
              r.getCell("J").value =
                (r.getCell("J").value || item.nilaiPengetahuan) ?? "-";
              r.getCell("L").value =
                (r.getCell("L").value || item.nilaiKeterampilan) ?? "-";
              r.getCell("N").value =
                (r.getCell("N").value || item.status) ?? "-";

              r.getCell("J").alignment = { horizontal: "center" };
              r.getCell("L").alignment = { horizontal: "center" };
              r.getCell("N").alignment = { horizontal: "center" };

              // warna status
              if (item.status === "TUNTAS") {
                r.getCell("N").fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "C6EFCE" },
                };
              } else if (item.status === "TIDAK_TUNTAS") {
                r.getCell("N").fill = {
                  type: "pattern",
                  pattern: "solid",
                  fgColor: { argb: "FFC7CE" },
                };
              }
            }
          }
        }
      }

      // ===========================
      // 3️⃣ EXPORT FILE
      // ===========================
      const out = await tplWb.xlsx.writeBuffer();
      saveAs(
        new Blob([out], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }),
        `Raport-${caberawit.nama}.xlsx`
      );

      return;
    }
  } catch (err) {
    console.error("Template error:", err);
  }
};
