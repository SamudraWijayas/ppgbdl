import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IKegiatan, IKegiatanForm } from "@/types/Kegiatan";

const kegiatanServices = {
  getKegiatan: () => instance.get(`${endpoint.KEGIATAN}`),
  getKegiatanByFilter: (params: string) =>
    instance.get(`${endpoint.KEGIATAN}/filter?${params}`),
  addKegiatan: (payload: IKegiatanForm) =>
    instance.post(endpoint.KEGIATAN, payload),
  getKegiatanById: (id: string) => instance.get(`${endpoint.KEGIATAN}/${id}`),
  deleteKegiatan: (id: string) => instance.delete(`${endpoint.KEGIATAN}/${id}`),
  updateKegiatan: (id: string, payload: IKegiatanForm) =>
    instance.put(`${endpoint.KEGIATAN}/${id}`, payload),
  updateKegiatanDok: (id: string, payload: IKegiatanForm) =>
    instance.put(`${endpoint.KEGIATAN}/${id}/dokumentasi`, payload),
};

export default kegiatanServices;
