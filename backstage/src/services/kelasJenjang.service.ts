import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IKelasJenjang } from "@/types/KelasJenjang";

const kelasJenjangServices = {
  getKelas: (params?: string) => instance.get(`${endpoint.KELAS}?${params}`),
  addKelas: (payload: IKelasJenjang) => instance.post(endpoint.KELAS, payload),
  getKelasById: (id: string) => instance.get(`${endpoint.KELAS}/${id}`),
  deleteKelas: (id: string) => instance.delete(`${endpoint.KELAS}/${id}`),
  updateKelas: (id: string, payload: IKelasJenjang) =>
    instance.put(`${endpoint.JENJANG}/${id}`, payload),
};

export default kelasJenjangServices;
