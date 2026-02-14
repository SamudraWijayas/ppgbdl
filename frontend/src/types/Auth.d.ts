import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    nama?: string;
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      nama?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user?: {
      id: string;
      nama?: string;
    };
  }
}

/* =========================
   APP TYPES
========================= */
interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  id?: string;
  nama?: string;
  tgl_lahir?: staring | DateValue;
  jenis_kelamin?: string;
  gol_darah?: string;
  nama_ortu?: string;
  hasPassword?: string;
  mahasiswa?: boolean | string;
  foto?: string | FileList;
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

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}
interface ISetPassword {
  password: string;
  confirmPassword: string;
}

export type {
  ILogin,
  IActivation,
  JWTExtended,
  SessionExtended,
  UserExtended,
  IProfile,
  IUpdatePassword,
  ISetPassword,
};
