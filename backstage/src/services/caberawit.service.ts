import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { ICaberawit } from "@/types/Caberawit";

const cabrawitServices = {
  getcaberawit: (params?: string) =>
    instance.get(`${endpoint.CABERAWIT}?${params}`),
  getCaberawitByDaerah: (daerahId: string, params?: string) =>
    instance.get(`${endpoint.CABERAWIT}/daerah/${daerahId}?${params}`),
  getCaberawitByKelompok: (kelompokId: string, params?: string) =>
    instance.get(
      `${endpoint.CABERAWIT}/${kelompokId}${params ? `?${params}` : ""}`,
    ),
  addcaberawit: (payload: ICaberawit) =>
    instance.post(endpoint.CABERAWIT, payload),
  getcaberawitById: (id: string) =>
    instance.get(`${endpoint.CABERAWIT}-one/${id}`),
  deletecaberawit: (id: string) =>
    instance.delete(`${endpoint.CABERAWIT}/${id}`),
  updatecaberawit: (id: string, payload: ICaberawit) =>
    instance.put(`${endpoint.CABERAWIT}/${id}`, payload),

  assignwali: (caberawitIds: number[]) =>
    instance.patch(`${endpoint.CABERAWIT}/assign-wali`, {
      caberawitIds,
    }),
  unassignWali: (caberawitIds: number[]) => {
    console.log("UNASSIGN URL:", `${endpoint.CABERAWIT}/unassign-wali`);
    return instance.patch(`${endpoint.CABERAWIT}/unassign-wali`, {
      caberawitIds,
    });
  },

  getCaberawitByWali: (params?: string) =>
    instance.get(`${endpoint.CABERAWIT}/by-wali?${params}`),
};

export default cabrawitServices;
