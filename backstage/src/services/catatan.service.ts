import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";

const catatanServices = {
  getCatatan: (caberawitId?: string) =>
    instance.get(`${endpoint.CATATAN}/caberawit/${caberawitId}`),
};

export default catatanServices;
