import instance from "@/libs/axios/instance";
import endpoint from "@/service/endpoint.constant";
import { ApiResponse } from "@/types/api";

const apiServices = {
  getKegiatanDaerah: (tanggal?: string) =>
    instance.get(`${endpoint.KEGIATAN}/daerah`, {
      params: { tanggal },
    }),

  getKegiatanDesa: (tanggal?: string) =>
    instance.get(`${endpoint.KEGIATAN}/desa`, {
      params: { tanggal },
    }),

  scanBarcode: (kegiatanId: string) =>
    instance.post<ApiResponse>(`${endpoint.ABSEN}/scan`, { kegiatanId }),

  // Desa
  getDesa: (params?: string) => instance.get(`${endpoint.DESA}?${params}`),
  getKelompok: (params?: string) =>
    instance.get(`${endpoint.KELOMPOK}?${params}`),

  // kegiatab
  getKegiatan: () => instance.get(`${endpoint.KEGIATAN}`),
};

export default apiServices;
