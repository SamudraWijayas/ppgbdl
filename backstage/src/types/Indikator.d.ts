interface IIndikator {
  id?: string;
  kelasJenjangId?: string;
  kelasJenjang?: {
    id: string;
    name: string;
  };
  kategoriIndikatorId?: string;
  kategoriIndikator?: {
    id: string;
    name: string;
  };
  indikator?: string;
  semester?: string;
  jenisPenilaian?: string;
}

interface IndikatorItem {
  id: string;
  indikator: string;
  semester: "GANJIL" | "GENAP";
  jenisPenilaian: "PENGETAHUAN" | "KETERAMPILAN" | "KEDUANYA";
  kategoriIndikator: {
    id: string;
    name: string;
    mataPelajaran: {
      id: string;
      name: string;
    };
  };
}

interface GroupedIndikator {
  id: string;
  name: string;
  kategori: {
    id: string;
    name: string;
    indikator: {
      id: string;
      name: string;
      semester: string;
      jenisPenilaian: string;
    }[];
  }[];
}

export type { IIndikator, IndikatorItem, GroupedIndikator };
