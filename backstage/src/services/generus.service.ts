import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IGenerus } from "@/types/Generus";

const generusServices = {
  getGenerus: (params?: string) =>
    instance.get(`${endpoint.GENERUS}?${params}`),
  getGenerusByDaerah: (daerahId: string, params?: string) =>
    instance.get(`${endpoint.GENERUS}/daerah/${daerahId}?${params}`),
  getGenerusByKelompok: (kelompokId: string, params?: string) =>
    instance.get(
      `${endpoint.GENERUS}/${kelompokId}/mumi${params ? `?${params}` : ""}`,
    ),
  getGenerusByMahasiswaDesa: (desaId: string, params?: string) =>
    instance.get(
      `${endpoint.GENERUS}/${desaId}/mahasiswa${params ? `?${params}` : ""}`,
    ),
  getGenerusByMahasiswaDaerah: (daerahId: string, params?: string) =>
    instance.get(
      `${endpoint.GENERUS}/${daerahId}/mahasiswa${params ? `?${params}` : ""}`,
    ),
  getGenerusByMahasiswaKelompok: (kelompokId: string, params?: string) =>
    instance.get(
      `${endpoint.GENERUS}/${kelompokId}/mahasiswa/kelompok${params ? `?${params}` : ""}`,
    ),
  addGenerus: (payload: IGenerus) => instance.post(endpoint.GENERUS, payload),
  getGenerusById: (id: string) => instance.get(`${endpoint.GENERUS}/${id}`),
  getStatistikByDaerah: (daerahId: string) =>
    instance.get(`${endpoint.GENERUS}/statistik/jenjang/daerah/${daerahId}`),
  getCountStatistikByDaerah: (daerahId: string) =>
    instance.get(
      `${endpoint.GENERUS}/count/statistik/jenjang/daerah/${daerahId}`,
    ),
  getStatistikByDesa: (desaId: string) =>
    instance.get(`${endpoint.GENERUS}/statistik/jenjang/desa/${desaId}`),
  getStatistikByKelompok: (kelompokId: string) =>
    instance.get(
      `${endpoint.GENERUS}/statistik/jenjang/kelompok/${kelompokId}`,
    ),
  deleteGenerus: (id: string) => instance.delete(`${endpoint.GENERUS}/${id}`),
  updateGenerus: (id: string, payload: IGenerus) =>
    instance.put(`${endpoint.GENERUS}/${id}`, payload),
};

export default generusServices;
