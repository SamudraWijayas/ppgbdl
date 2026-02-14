import { DateValue } from "@nextui-org/react";

interface IKegiatanForm {
  id?: string;
  name: string;
  startDate: DateValue;
  endDate: DateValue;
  tingkat: string;
  kelompokId?: string | null;
  kelompok?: {
    id?: string;
    name?: string;
  };
  desaId?: string | null;
  desa?: {
    id?: string;
    name?: string;
  };
  daerahId?: string | null;
  daerah?: {
    id?: string;
    name?: string;
  };
}

interface IKegiatan {
  id?: string;
  name?: string;
  startDate?: string | DateValue;
  endDate?: string | DateValue;
  jenisKelamin?: string;
  tingkat?: "DAERAH" | "DESA" | "KELOMPOK";
  targetType?: "JENJANG" | "MAHASISWA" | "USIA";
  kelompokId?: string | null;
  kelompok?: {
    id?: string;
    name?: string;
  };
  desaId?: string | null;
  desa?: {
    id?: string;
    name?: string;
  };
  daerahId?: string | null;
  daerah?: {
    id?: string;
    name?: string;
  };
  jenjangIds?: string[];
  minUsia?: number | null;
  maxUsia?: number | null;
  sasaran?: {
    jenjang?: {
      id?: string;
      name?: string;
      minUsia?: number;
      maxUsia?: number;
      keterangan?: string;
    };
  }[];
  dokumentasi: IDokumentasi[];
}

interface IDokumentasi {
  id: string;
  kegiatanId: string;
  url: string;
}

export type { IKegiatanForm, IKegiatan, Peserta, IDataKegiatan };
