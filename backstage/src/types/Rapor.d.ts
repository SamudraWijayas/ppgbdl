export interface IRaporGenerus {
  caberawit: {
    id: number;
    nama: string;
    jenjangId: string;
    kelasJenjangId: string;
    tgl_lahir: string;
    jenis_kelamin: string;
    gol_darah: string;
    nama_ortu: string;
    foto: string | null;
    kelompokId: string;
    desaId: string;
    daerahId: string;
    createdAt: string;
    updatedAt: string;
    kelasJenjang: {
      id: string;
      jenjangId: string;
      name: string;
      urutan: number | null;
      createdAt: string;
      updatedAt: string;
    };
  };

  indikator: {
    id: string;
    indikator: string;
    status: string | null;
    raporId: string | null;
  }[];
}

export interface IRapor {
  caberawitId: number;
  semester: "GANJIL" | "GENAP";
  raporItems: {
    indikatorKelasId: string;
    kelasJenjangId: string;
    nilaiPengetahuan: number | null;
    nilaiKeterampilan: number | null;
  }[];
}

export interface RaporFormValues {
  semester: "GANJIL" | "GENAP";
  raporItems?: {
    indikatorKelasId: string;
    nilaiPengetahuan?: number | null;
    nilaiKeterampilan?: number | null;
  }[];
}


export interface RaporItem  {
  id_indikator: string;
  indikator: string;
  semester: "GANJIL" | "GENAP";
  status: "TUNTAS" | "TIDAK_TUNTAS";
  nilaiPengetahuan: number | null;
  nilaiKeterampilan: number | null;
};
