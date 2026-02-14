import useChangeUrl from "@/hooks/useChangeUrls";
import userServices from "@/services/user.service";
import { IUser } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const useUser = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<IUser | null>(null);

  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getUsers = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await userServices.getUser(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isRefetching: isRefetchingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["Users", currentLimit, currentPage, currentSearch],
    queryFn: getUsers,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataUsers,
    isLoadingUsers,

    isRefetchingUsers,
    refetchUsers,

    selectedId,
    setSelectedId,
  };
};

export default useUser;
