import { DateValue } from "@nextui-org/react";

interface IGenerus {
  id?: number;
  nama?: string;
  tgl_lahir?: staring | DateValue;
  jenis_kelamin?: string;
  gol_darah?: string;
  nama_ortu?: string;
  mahasiswa?: boolean | string;
  foto?: string | FileList | null | undefined;
  jenjangId?: string;
  jenjang?: {
    id?: string;
    name?: string;
  };
  kelasJenjangId?: string;
  kelasJenjang?: {
    id?: string;
    name?: string;
  };
  kelompokId?: string;
  kelompok?: {
    id?: string;
    name?: string;
  };
  desaId?: string;
  desa?: {
    id?: string;
    name?: string;
  };
  daerahId?: string;
  daerah?: {
    id?: string;
    name?: string;
  };
}

export type { IGenerus };
