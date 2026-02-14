import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ILogin, IProfile, ISetPassword, IUpdatePassword } from "@/types/Auth";

const authServices = {
  login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
  getProfileWithToken: (token: string) =>
    instance.get(`${endpoint.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  getProfile: () => instance.get(`${endpoint.AUTH}/me`),
  updateProfile: (payload: IProfile) =>
    instance.put(`${endpoint.AUTH}/update-profile`, payload),
  updatePassword: (payload: IUpdatePassword) =>
    instance.put(`${endpoint.AUTH}/update-password`, payload),
  setPassword: (payload: ISetPassword) =>
    instance.put(`${endpoint.AUTH}/set-password`, payload),
};

export default authServices;
