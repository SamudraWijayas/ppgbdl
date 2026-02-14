interface IDesa {
  id?: string;
  name?: string;
  daerahId?: string;
  daerah?: {
    id?: string;
    name?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export type { IDesa };
