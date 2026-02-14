import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const chatService = {
  getListChat: (params?: string) =>
    instance.get(`${endpoint.CHAT}/list?${params}`),
  getMessage: (conversationId: string) =>
    instance.get(`${endpoint.MESSAGE}/${conversationId}`),
};

export default chatService;
