import authServices from "@/services/auth.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useProfile = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: profile,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  return {
    profile,
    isLoading,
    isFetching,
    refetch,
  };
};

export default useProfile;
