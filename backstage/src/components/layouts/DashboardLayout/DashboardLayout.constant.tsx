import {
  LayoutDashboard,
  Users,
  KeyRound,
  Activity,
  Blinds,
  Group,
  LogOut,
  LandPlot,
  User,
  Book,
  CircleGauge,
  UserPen,
  ActivityIcon,
  BookText,
} from "lucide-react";

const SIDEBAR_ADMIN = [
  {
    group: "Dashboard",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        key: "user",
        label: "Users",
        href: "/admin/users",
        icon: <User />,
      },
    ],
  },
  {
    group: "Daerah, Desa & Kelompok",
    items: [
      {
        key: "daerah",
        label: "Daerah",
        href: "/admin/area",
        icon: <LandPlot />,
      },
      {
        key: "desa",
        label: "Desa",
        href: "/admin/village",
        icon: <Blinds />,
      },
      {
        key: "kelompok",
        label: "Kelompok",
        href: "/admin/group",
        icon: <Group />,
      },
    ],
  },
  {
    group: "Generus & Kegiatan",
    items: [
      {
        key: "generus",
        label: "Generus",
        icon: <Users />,
        children: [
          {
            key: "muda-mudi",
            label: "Muda - Mudi",
            href: "/admin/generus",
          },
          {
            key: "caberawit",
            label: "Caberawit",
            href: "/admin/caberawit",
          },
        ],
      },
      {
        key: "kegiatan",
        label: "Kegiatan",
        href: "/admin/kegiatan",
        icon: <Activity />,
      },
      {
        key: "absen",
        label: "Absen Caberawit",
        href: "/admin/absent-caberawit",
        icon: <Activity />,
      },
    ],
  },
  {
    group: "Jenjang & Kurikulum",
    items: [
      {
        key: "kurikulum",
        label: "Kurikulum",
        icon: <Book />,
        children: [
          {
            key: "mapel",
            label: "Mata Pelajaran",
            href: "/admin/mapel",
          },
          {
            key: "sub-kategori",
            label: "Kategori",
            href: "/admin/kategori",
          },
          {
            key: "indikator",
            label: "Indikator",
            href: "/admin/indikator",
          },
        ],
      },
      {
        key: "jenjang",
        label: "Jenjang",
        icon: <CircleGauge />,
        children: [
          {
            key: "jenjang",
            label: "Jenjang",
            href: "/admin/jenjang",
          },
          {
            key: "kelas-jenjang",
            label: "Kelas Jenjang",
            href: "/admin/kelas-jenjang",
          },
        ],
      },
    ],
  },
  {
    group: "KEAMANAN",
    items: [
      {
        key: "profile",
        label: "Profile",
        href: "/admin/profile",
        icon: <UserPen />,
      },
      {
        key: "logout",
        label: "Logout",
        href: "/lo",
        icon: <LogOut />,
      },
    ],
  },
];
const SIDEBAR_DAERAH = [
  {
    group: "Dashboard",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/area/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        key: "user",
        label: "Users",
        href: "/area/users",
        icon: <User />,
      },
    ],
  },
  {
    group: "Desa & Kelompok",
    items: [
      {
        key: "desa",
        label: "Desa",
        href: "/area/village",
        icon: <Blinds />,
      },
      {
        key: "kelompok",
        label: "Kelompok",
        href: "/area/group",
        icon: <Group />,
      },
    ],
  },
  {
    group: "Generus & Kegiatan",
    items: [
      {
        key: "generus",
        label: "Generus",
        icon: <Users />,
        children: [
          {
            key: "muda-mudi",
            label: "Muda - Mudi",
            href: "/area/generus",
          },
          {
            key: "caberawit",
            label: "Caberawit",
            href: "/area/caberawit",
          },
          {
            key: "mahasiswa",
            label: "Mahasiswa",
            href: "/area/student",
          },
        ],
      },
      {
        key: "kegiatan",
        label: "Kegiatan",
        href: "/area/activity",
        icon: <Activity />,
      },
    ],
  },

  {
    group: "KEAMANAN",
    items: [
      {
        key: "profile",
        label: "Profile",
        href: "/area/profile",
        icon: <UserPen />,
      },
      {
        key: "logout",
        label: "Logout",
        href: "/",
        icon: <LogOut />,
      },
    ],
  },
];

const SIDEBAR_DESA = [
  {
    group: "Dashboard",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        icon: <LayoutDashboard />,
      },
    ],
  },
];

const SIDEBAR_KELOMPOK = [
  {
    group: "Dashboard",
    items: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/group/dashboard",
        icon: <LayoutDashboard />,
      },
      {
        key: "user",
        label: "Users",
        href: "/group/users",
        icon: <User />,
      },
    ],
  },

  {
    group: "DATA MANAGEMENT",
    items: [
      {
        key: "generus",
        label: "Generus",
        href: "/group/generus",
        icon: <Users />,
      },
      {
        key: "murid",
        label: "Siswa",
        href: "/group/student",
        icon: <BookText />,
      },
    ],
  },

  {
    group: "ACTIVITIES",
    items: [
      {
        key: "kegiatan",
        label: "Kegiatan",
        href: "/group/activity",
        icon: <ActivityIcon />,
      },
      {
        key: "absen",
        label: "Kehadiran Caberawit",
        href: "/group/attendance",
        icon: <BookText />,
      },
    ],
  },

  {
    group: "ACCOUNT",
    items: [
      {
        key: "profile",
        label: "Profile",
        href: "/group/profile",
        icon: <UserPen />,
      },
      {
        key: "logout",
        label: "Logout",
        href: "/",
        icon: <LogOut />,
      },
    ],
  },
];

export { SIDEBAR_ADMIN, SIDEBAR_DAERAH, SIDEBAR_DESA, SIDEBAR_KELOMPOK };
