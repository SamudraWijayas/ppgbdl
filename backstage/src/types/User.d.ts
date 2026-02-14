interface IUser {
  id?: string;
  fullName?: string;
  username?: string;
  role?: string;
  avatar?: string;
  daerahId?: string | number;
  desaId?: string | number;
  kelompokId?: string | number;
  daerah?: { id: string; name: string } | null;
  desa?: { id: string; name: string } | null;
  kelompok?: { id: string; name: string } | null;
}

interface IUserForm {
  id?: string;
  // Required untuk create
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: string;

  // Optional
  avatar?: string;
  daerahId?: number | string;
  desaId?: number | string;
  kelompokId?: number | string;
}

export type { IUser, IUserForm };
