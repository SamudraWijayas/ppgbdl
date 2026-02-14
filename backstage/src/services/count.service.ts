import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";

const countServices = {
  CountDaerahForAdmin: () => instance.get(`${endpoint.COUNT}/daerah`),
  CountDesaForAdmin: () => instance.get(`${endpoint.COUNT}/desa`),
  CountKelompokForAdmin: () => instance.get(`${endpoint.COUNT}/kelompok`),
  CountKelompokByDesa: (params?: string) =>
    instance.get(`${endpoint.COUNT}/kelompok?${params}`),
  CountMumi: (params?: string) =>
    instance.get(`${endpoint.COUNT}/mumi?${params}`),
  CountCaberawit: (params?: string) =>
    instance.get(`${endpoint.COUNT}/caberawit?${params}`),

  CountDesaByDaerah: (daerahId: string) =>
    instance.get(`${endpoint.COUNT}/desa-bydaerah/${daerahId}`),
  CountKelompokByDaerah: (daerahId: string) =>
    instance.get(`${endpoint.COUNT}/kelompok-bydaerah/${daerahId}`),
};

export default countServices;
