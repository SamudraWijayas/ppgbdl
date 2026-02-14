import chatService from "@/service/chat.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useMessage = () => {
  const params = useParams();
  const id = params?.id as string;
  const getMessages = async () => {
    const res = await chatService.getMessage(id);
    return res.data;
  };

  const {
    data: dataMessage,
    isLoading: isLoadingMessage,
    isRefetching: isRefetchingMessage,
    refetch: refetchMessage,
  } = useQuery({
    queryKey: ["messages", id], // ✅ penting pakai id & type
    queryFn: getMessages,
    enabled: !!id, // ✅ hanya fetch kalau id ada
  });

  return {
    dataMessage,
    isLoadingMessage,
    isRefetchingMessage,
    refetchMessage,
  };
};

export default useMessage;
