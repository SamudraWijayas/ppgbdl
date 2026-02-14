import * as XLSX from "xlsx-js-style";
import { GroupedIndikator } from "@/types/Indikator";
import { RaporItem } from "@/types/Rapor";

type RaporValue = {
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
  status: RaporItem["status"];
};

export async function exportRapotFromTemplate(
  groupedIndikator: GroupedIndikator[],
  raporMap: Map<string, RaporValue>
) {
  // 1. LOAD TEMPLATE
  const res = await fetch("/template-rapot.xlsx");
  const buffer = await res.arrayBuffer();

  const wb = XLSX.read(buffer, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];

  let row = 4; // mulai isi data (sesuaikan dg template)
  let no = 1;

  groupedIndikator.forEach((mata) => {
    const mapelStart = row;

    // === MATA PELAJARAN ===
    XLSX.utils.sheet_add_aoa(
      ws,
      [[no, mata.name.toUpperCase(), "", "", ""]],
      { origin: `A${row}` }
    );

    row++;

    mata.kategori.forEach((kat) => {
      // === KATEGORI ===
      XLSX.utils.sheet_add_aoa(ws, [["", kat.name, "", "", ""]], {
        origin: `A${row}`,
      });

      row++;

      kat.indikator.forEach((ind, idx) => {
        const rapor = raporMap.get(ind.id);

        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              "",
              `${String.fromCharCode(97 + idx)}. ${ind.name}`,
              rapor?.nilaiPengetahuan ?? "",
              rapor?.nilaiKeterampilan ?? "",
              rapor?.status === "TUNTAS"
                ? "Tuntas"
                : rapor?.status === "TIDAK_TUNTAS"
                ? "Tidak Tuntas"
                : "",
            ],
          ],
          { origin: `A${row}` }
        );

        row++;
      });
    });

    // === MERGE NO (VERTIKAL) ===
    ws["!merges"] = ws["!merges"] || [];
    ws["!merges"].push({
      s: { r: mapelStart - 1, c: 0 },
      e: { r: row - 2, c: 0 },
    });

    no++;
  });

  XLSX.writeFile(wb, "rapot-caberawit.xlsx");
}
