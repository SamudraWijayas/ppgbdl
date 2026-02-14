import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IMapel } from "@/types/Mapel";

const mapelServices = {
  getMapel: () => instance.get(`${endpoint.MAPEL}`),
  addMapel: (payload: IMapel) => instance.post(endpoint.MAPEL, payload),
  getMapelById: (id: string) => instance.get(`${endpoint.MAPEL}/${id}`),
  deleteMapel: (id: string) => instance.delete(`${endpoint.MAPEL}/${id}`),
  updateMapel: (id: string, payload: IMapel) =>
    instance.put(`${endpoint.MAPEL}/${id}`, payload),
};

export default mapelServices;
