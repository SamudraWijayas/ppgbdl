import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role:
      | "ADMIN"
      | "SUBADMIN"
      | "DAERAH"
      | "SUBDAERAH"
      | "DESA"
      | "SUBDESA"
      | "KELOMPOK"
      | "SUBKELOMPOK";
    fullName?: string;
    email?: string;
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      role:
        | "ADMIN"
        | "SUBADMIN"
        | "DAERAH"
        | "SUBDAERAH"
        | "DESA"
        | "SUBDESA"
        | "KELOMPOK"
        | "SUBKELOMPOK";
      fullName?: string;
      email?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?:
      | "ADMIN"
      | "DAERAH"
      | "SUBDAERAH"
      | "DESA"
      | "SUBDESA"
      | "KELOMPOK"
      | "SUBKELOMPOK";
    user?: {
      id: string;
      role:
        | "ADMIN"
        | "DAERAH"
        | "SUBDAERAH"
        | "DESA"
        | "SUBDESA"
        | "KELOMPOK"
        | "SUBKELOMPOK";
      fullName?: string;
      email?: string;
    };
  }
}

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  fullName?: string;
  avatar?: string | FileList;
  role?: string;
  username?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export type {
  IRegister,
  IActivation,
  JWTExtended,
  SessionExtended,
  UserExtended,
  ILogin,
  IProfile,
  IUpdatePassword,
};
