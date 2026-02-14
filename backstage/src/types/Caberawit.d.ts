import { DateValue } from "@nextui-org/react";

interface IMurid {
  id: number;
  nama?: string;
  kelasJenjangId?: string;
  kelasJenjang?: {
    id?: string;
    name?: string;
  };
  jenis_kelamin?: string;
  nama_ortu?: string;
  jenjangId?: string;
  jenjang?: {
    id?: string;
    name?: string;
  };
  waliId?: string;

  wali?: {
    id?: string;
    fullName?: string;
  };
}

interface ICaberawit {
  id?: string;
  nama?: string;
  jenjangId?: string;
  tgl_lahir?: staring | DateValue;
  jenis_kelamin?: string;
  nama_ortu?: string;
  gol_darah?: string;
  foto?: string | FileList | null | undefined;
  kelasJenjangId?: string;
  kelasJenjang?: {
    id?: string;
    name?: string;
  };
  jenjangId?: string;
  jenjang?: {
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
  waliId?: string;

  wali?: {
    id?: string;
    fullName?: string;
  };
}

export type { ICaberawit, IMurid };
