import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IJenjang } from "@/types/Jenjang";

const jenjangServices = {
  getJenjang: (params?: string) => instance.get(`${endpoint.JENJANG}?${params}`),
  addJenjang: (payload: IJenjang) => instance.post(endpoint.JENJANG, payload),
  getJenjangById: (id: string) => instance.get(`${endpoint.JENJANG}/${id}`),
  deleteJenjang: (id: string) => instance.delete(`${endpoint.JENJANG}/${id}`),
  updateJenjang: (id: string, payload: IJenjang) =>
    instance.put(`${endpoint.JENJANG}/${id}`, payload),
};

export default jenjangServices;
