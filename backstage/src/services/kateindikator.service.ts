import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IKateIndikator } from "@/types/KategoriIndikator";

const KateServices = {
  getKate: () => instance.get(`${endpoint.KATE}`),
  addKate: (payload: IKateIndikator) => instance.post(endpoint.KATE, payload),
  getKateById: (id: string) => instance.get(`${endpoint.KATE}/${id}`),
  deleteKate: (id: string) => instance.delete(`${endpoint.KATE}/${id}`),
  updateKate: (id: string, payload: IKateIndikator) =>
    instance.put(`${endpoint.KATE}/${id}`, payload),
};

export default KateServices;
