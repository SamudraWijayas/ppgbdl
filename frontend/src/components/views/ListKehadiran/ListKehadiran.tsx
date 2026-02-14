import React from "react";
import { CalendarDays, CheckCircle2, XCircle, Clock } from "lucide-react";

const dataKehadiran = [
  {
    id: 1,
    tanggal: "14 Oktober 2025",
    acara: "Pengajian Akhir Tahun",
    status: "Hadir",
  },
  {
    id: 2,
    tanggal: "10 Oktober 2025",
    acara: "Gotong Royong Desa",
    status: "Tidak Hadir",
  },
  {
    id: 3,
    tanggal: "7 Oktober 2025",
    acara: "Kajian Subuh Rutin",
    status: "Terlambat",
  },
  {
    id: 4,
    tanggal: "7 Oktober 2025",
    acara: "Kajian Subuh Rutin",
    status: "Terlambat",
  },
  {
    id: 5,
    tanggal: "7 Oktober 2025",
    acara: "Kajian Subuh Rutin",
    status: "Terlambat",
  },
  {
    id: 6,
    tanggal: "7 Oktober 2025",
    acara: "Kajian Subuh Rutin",
    status: "Terlambat",
  },
  {
    id: 7,
    tanggal: "7 Oktober 2025",
    acara: "Kajian Subuh Rutin",
    status: "Terlambat",
  },
  {
    id: 8,
    tanggal: "7 Oktober 2025",
    acara: "Kajian Subuh Rutin",
    status: "Terlambat",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Hadir":
      return "bg-green-100 text-green-600 border-green-200";
    case "Tidak Hadir":
      return "bg-red-100 text-red-600 border-red-200";
    case "Terlambat":
      return "bg-yellow-100 text-yellow-600 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Hadir":
      return <CheckCircle2 size={18} />;
    case "Tidak Hadir":
      return <XCircle size={18} />;
    case "Terlambat":
      return <Clock size={18} />;
    default:
      return <CalendarDays size={18} />;
  }
};

const ListKehadiran = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-black/10 px-4 pt-[70px] pb-5">
      <div className="space-y-3">
        {dataKehadiran.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-between hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <CalendarDays className="text-blue-600" size={20} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-800 dark:text-white leading-tight">
                  {item.acara}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.tanggal}</p>
              </div>
            </div>

            <div
              className={`flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full border ${getStatusStyle(
                item.status
              )}`}
            >
              {getStatusIcon(item.status)}
              <span>{item.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListKehadiran;
