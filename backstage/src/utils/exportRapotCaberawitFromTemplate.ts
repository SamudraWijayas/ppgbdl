import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { GroupedIndikator } from "@/types/Indikator";

type RaporMap = Map<
  string,
  {
    nilaiPengetahuan: number | null;
    nilaiKeterampilan: number | null;
    status: string;
  }
>;

export async function exportRapotCaberawitExcel(
  groupedIndikator: GroupedIndikator[],
  raporMap: RaporMap,
  caberawit: any
) {
  const res = await fetch("/template/rapor-caberawit.xlsx");
  const buffer = await res.arrayBuffer();

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);

  const ws = workbook.worksheets[0];

  /* ======================
     ISI IDENTITAS (TIDAK MERUSAK STYLE)
     ====================== */
  ws.getCell("C4").value = caberawit.nama;
  ws.getCell("C5").value = caberawit.jenjang?.name || "-";

  /* ======================
     ISI NILAI
     ====================== */
  let row = 9;
  let no = 1;

  groupedIndikator.forEach((mata) => {
    ws.getCell(`A${row}`).value = no++;
    ws.getCell(`B${row}`).value = mata.name.toUpperCase();
    row++;

    mata.kategori.forEach((kat) => {
      ws.getCell(`B${row}`).value = kat.name;
      row++;

      kat.indikator.forEach((ind, idx) => {
        const rapor = raporMap.get(ind.id);

        ws.getCell(`B${row}`).value =
          `${String.fromCharCode(97 + idx)}. ${ind.name}`;
        ws.getCell(`C${row}`).value = rapor?.nilaiPengetahuan ?? "";
        ws.getCell(`D${row}`).value = rapor?.nilaiKeterampilan ?? "";
        ws.getCell(`E${row}`).value = rapor?.status ?? "-";

        row++;
      });
    });
  });

  /* ======================
     EXPORT
     ====================== */
  const blob = await workbook.xlsx.writeBuffer();
  saveAs(
    new Blob([blob]),
    `Rapor-${caberawit.nama}.xlsx`
  );
}
