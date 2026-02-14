import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IDaerah } from "@/types/Daerah";

const daerahServices = {
  getDaerah: (params?: string) => instance.get(`${endpoint.DAERAH}?${params}`),
  addDaerah: (payload: IDaerah) => instance.post(endpoint.DAERAH, payload),
  getDaerahById: (id: string) => instance.get(`${endpoint.DAERAH}/${id}`),
  deleteDaerah: (id: string) => instance.delete(`${endpoint.DAERAH}/${id}`),
  updateDaerah: (id: string, payload: IDaerah) =>
    instance.put(`${endpoint.DAERAH}/${id}`, payload),
};

export default daerahServices;
