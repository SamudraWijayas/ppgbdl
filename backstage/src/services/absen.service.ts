import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IAbsen } from "@/types/Absen";

const cabrawitServices = {
  AbsenMasal: (payload: IAbsen) =>
    instance.post(`${endpoint.ABSEN}/massal`, payload),
  getAbsenByTanggal: (tanggal: string) =>
    instance.get(`${endpoint.ABSEN}?tanggal=${tanggal}`),
  getAbsenByCaberawit: (caberawitId: string, params?: string) =>
    instance.get(
      `${endpoint.ABSEN}/caberawit/bulanan/${caberawitId}?${params}`,
    ),
  getAbsenRekap: (caberawitId: string) =>
    instance.get(`${endpoint.ABSEN}/caberawit/rekap/${caberawitId}`),
};

export default cabrawitServices;
