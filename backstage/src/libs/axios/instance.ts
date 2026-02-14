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


// ✅ TAMBAHKAN INI
clientInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 503) {
      // redirect ke halaman maintenance
      if (typeof window !== "undefined") {
        window.location.href = "/maintenance";
      }
    }

    return Promise.reject(error);
  }
);

export default clientInstance;


// import axios from "axios";
// import { getSession } from "next-auth/react";
// import environment from "@/config/environment";

// const clientInstance = axios.create({
//   baseURL: environment.API_URL,
//   timeout: 60 * 1000,
// });

// clientInstance.interceptors.request.use(async (request) => {
//   if (typeof window !== "undefined") {
//     const session = await getSession();
//     if (session?.accessToken) {
//       request.headers.Authorization = `Bearer ${session.accessToken}`;
//     }
//   }
//   return request;
// });

// export default clientInstance;