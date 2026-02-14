import useChangeUrl from "@/hooks/useChangeUrls";
import useProfile from "@/hooks/useProfile";
import userServices from "@/services/user.service";
import { IUser } from "@/types/User";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useAccess = () => {
  const [selectedId, setSelectedId] = useState<IUser | null>(null);
  const { profile } = useProfile();
  const idKelompok = profile?.kelompokId;

  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getUsers = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await userServices.getUserByKelompok(idKelompok, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataUsers,
    isLoading: isLoadingUsers,
    isRefetching: isRefetchingUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["Users", currentLimit, currentPage, currentSearch, idKelompok],
    queryFn: getUsers,
    enabled: isParamsReady && !!currentPage && !!currentLimit && !!idKelompok,
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

export default useAccess;
