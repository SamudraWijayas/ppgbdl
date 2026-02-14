import chatService from "@/service/chat.service";
import useChangeUrl from "@/hooks/useChangeUrls";
import { useQuery } from "@tanstack/react-query";

const useChat = () => {
  const { currentSearch } = useChangeUrl();
  const getChatList = async () => {
    let params = ``;
    if (currentSearch) {
      params += `search=${currentSearch}`;
    }
    const res = await chatService.getListChat(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataChatList,
    isLoading: isLoadingChatList,
    isRefetching: isRefetchingChatList,
    refetch: refetchChatList,
  } = useQuery({
    queryKey: ["ChatList", currentSearch],
    queryFn: getChatList,
  });

  return {
    dataChatList,
    isLoadingChatList,
    isRefetchingChatList,
    refetchChatList,
  };
};

export default useChat;
