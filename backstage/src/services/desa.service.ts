import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IDesa } from "@/types/Desa";

const desaServices = {
  getDesa: (params?: string) => instance.get(`${endpoint.DESA}?${params}`),
  getDesaByDaerah: (daerahId: string, params?: string) =>
    instance.get(`${endpoint.DESA}/daerah/${daerahId}?${params}`),
  addDesa: (payload: IDesa) => instance.post(endpoint.DESA, payload),
  getDesaById: (id: string) => instance.get(`${endpoint.DESA}/${id}`),
  deleteDesa: (id: string) => instance.delete(`${endpoint.DESA}/${id}`),
  updateDesa: (id: string, payload: IDesa) =>
    instance.put(`${endpoint.DESA}/${id}`, payload),
};

export default desaServices;
