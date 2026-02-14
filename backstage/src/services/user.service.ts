import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IUserForm } from "@/types/User";

const userServices = {
  getUser: (params?: string) => instance.get(`${endpoint.USER}?${params}`),
  getUserByKelompok: (kelompokId: string, params?: string) =>
    instance.get(
      `${endpoint.USER}/kelompok/${kelompokId}?${params}`,
    ),
  getUserByDesa: (desaId: string, params?: string) =>
    instance.get(
      `${endpoint.USER}/desa/${desaId}?${params}`,
    ),
  addUser: (payload: IUserForm) => instance.post(endpoint.USER, payload),
  updateUser: (id: string, payload: Partial<IUserForm>) =>
    instance.put(`${endpoint.USER}/${id}`, payload),
  deleteUser: (id: string) => instance.delete(`${endpoint.USER}/${id}`),
  getUserById: (id: string) => instance.get(`${endpoint.USER}/${id}`),
};

export default userServices;
