import authServices from "@/service/auth.service";
import { useQuery } from "@tanstack/react-query";

const useProfile = () => {
  const fetchProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    isLoading,
    isError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: fetchProfile,
    enabled: typeof window !== "undefined",
  });

  return {
    dataProfile,
    isLoading,
    isError,
    refetchProfile,
  };
};

export default useProfile;
