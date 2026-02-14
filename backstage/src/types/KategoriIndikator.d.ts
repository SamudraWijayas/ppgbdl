interface IKateIndikator {
  id?: string;
  name?: string;
  mataPelajaranId?: string;
  mataPelajaran?: {
    name: string;
  };
}

export type { IKateIndikator };
