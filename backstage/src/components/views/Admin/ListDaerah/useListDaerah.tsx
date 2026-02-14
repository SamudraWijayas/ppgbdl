import useChangeUrl from "@/hooks/useChangeUrls";
import daerahServices from "@/services/daerah.service";
import { IDaerah } from "@/types/Daerah";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useListDaerah = () => {
  const [selectedId, setSelectedId] = useState<IDaerah | null>(null);
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getDaerah = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await daerahServices.getDaerah(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataDaerah,
    isLoading: isLoadingDaerah,
    isRefetching: isRefetchingDaerah,
    refetch: refetchDaerah,
  } = useQuery({
    queryKey: ["Daerah", currentLimit, currentPage, currentSearch],
    queryFn: getDaerah,
    enabled: isParamsReady && !!currentPage && !!currentLimit,
  });

  return {
    dataDaerah,
    isLoadingDaerah,
    isRefetchingDaerah,
    refetchDaerah,
    selectedId,
    setSelectedId,
  };
};

export default useListDaerah;
