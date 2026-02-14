import axios from "axios";
import { getSession } from "next-auth/react";
import environment from "@/config/environment";

const clientInstance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60 * 1000,
});

clientInstance.interceptors.request.use(async (request) => {
  if (typeof window !== "undefined") {
    const session = await getSession();
    if (session?.accessToken) {
      request.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  }
  return request;
});

export default clientInstance;
