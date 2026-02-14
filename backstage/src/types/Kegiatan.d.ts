import { DateValue } from "@nextui-org/react";

interface IKegiatanForm {
  id?: string;

  name?: string;
  startDate?: DateValue | null;
  endDate?: DateValue | null;
  jenisKelamin?: string;

  tingkat?: "DAERAH" | "DESA" | "KELOMPOK";

  targetType?: "JENJANG" | "MAHASISWA" | "USIA";

  daerahId?: string | null;
  desaId?: string | null;
  kelompokId?: string | null;

  daerah?: {
    id?: string;
    name?: string;
  };
  desa?: {
    id?: string;
    name?: string;
  };
  kelompok?: {
    id?: string;
    name?: string;
  };

  jenjangIds?: string[];
  dokumentasi?: string[];
  minUsia?: number | null;
  maxUsia?: number | null;
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

interface Peserta {
  id: number;
  nama: string;
  jenis_kelamin: string;
  gol_darah: string;
  tgl_lahir: string;
  nama_ortu: string;
  mahasiswa: boolean;
  foto: string | null;
  jenjang: { name: string };
  daerah: { name: string };
  desa: { name: string };
  kelompok: { name: string };
  status: string;
}

interface IDataKegiatan {
  kegiatan: IKegiatan;
  peserta: Peserta[];
}

export type { IKegiatanForm, IKegiatan, Peserta, IDataKegiatan };
