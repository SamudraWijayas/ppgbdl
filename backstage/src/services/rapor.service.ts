import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IKelompok } from "@/types/Kelompok";
import { IRapor } from "@/types/Rapor";

const raporServices = {
  // di rapor.service.ts
  getRaporByCaberawit: (caberawitId: string, query?: string) =>
    instance.get(
      `${endpoint.RAPOR}/caberawit/${caberawitId}${query ? `?${query}` : ""}`
    ),

  getRaporLengkapByCaberawit: (caberawitId: string, query?: string) =>
    instance.get(
      `${endpoint.RAPOR}/caberawit/${caberawitId}${
        query ? `?${query}` : ""
      }`
    ),

  getTA: () => instance.get(`${endpoint.TAHUN_AJARAN}`),
  addRapor: (payload: IRapor) => instance.post(endpoint.RAPOR, payload),
    getRapor: (caberawitId: string) => instance.get(`${endpoint.RAPOR}/caberawit/${caberawitId}`),
  
  getKelompokById: (id: string) => instance.get(`${endpoint.KELOMPOK}/${id}`),
  deleteKelompok: (id: string) => instance.delete(`${endpoint.KELOMPOK}/${id}`),
  updateKelompok: (id: string, payload: IKelompok) =>
    instance.put(`${endpoint.KELOMPOK}/${id}`, payload),
};

export default raporServices;
