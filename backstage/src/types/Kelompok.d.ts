interface IKelompok {
  id?: string;
  name?: string;
  daerahId?: string;
  daerah?: {
    id?: string;
    name?: string;
  };
  desaId?: string;
  desa?: {
    id?: string;
    name?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type { IKelompok };
