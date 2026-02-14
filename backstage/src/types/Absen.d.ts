type StatusAbsen = "HADIR" | "IZIN" | "SAKIT" | "ALPA";

interface IAbsen {
  tanggal: string;
  list: {
    caberawitId: number;
    status: StatusAbsen;
  }[];
}

type AbsenItem = {
  caberawitId: number;
  status: StatusAbsen;
};

type AbsenByTanggalResponse = {
  data: AbsenItem[];
};

interface IAbsenByGenerus {
  id: string;
  caberawitId: string;
  tanggal: string;
  status: string;
}

export type {
  IAbsen,
  StatusAbsen,
  AbsenItem,
  AbsenByTanggalResponse,
  IAbsenByGenerus,
};
