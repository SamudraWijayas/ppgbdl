import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IKelompok } from "@/types/Kelompok";

const kelompokServices = {
  getKelompok: (params?: string) =>
    instance.get(`${endpoint.KELOMPOK}?${params}`),
  getKelompokByDaerah: (daerahId: string, params?: string) =>
    instance.get(`${endpoint.KELOMPOK}/daerah/${daerahId}?${params}`),
  getKelompokByDesa: (desaId: string) =>
    instance.get(`${endpoint.KELOMPOK}/${desaId}`),
  addKelompok: (payload: IKelompok) =>
    instance.post(endpoint.KELOMPOK, payload),
  getKelompokById: (id: string) => instance.get(`${endpoint.KELOMPOK}/${id}`),
  deleteKelompok: (id: string) => instance.delete(`${endpoint.KELOMPOK}/${id}`),
  updateKelompok: (id: string, payload: IKelompok) =>
    instance.put(`${endpoint.KELOMPOK}/${id}`, payload),
};

export default kelompokServices;
