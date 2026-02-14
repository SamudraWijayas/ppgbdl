import useChangeUrl from "@/hooks/useChangeUrls";
import useProfile from "@/hooks/useProfile";
import desaServices from "@/services/desa.service";
import { IDesa } from "@/types/Desa";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useListDesa = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;
  const [selectedId, setSelectedId] = useState<IDesa | null>(null);
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getDesa = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await desaServices.getDesaByDaerah(idDaerah, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataDesa,
    isLoading: isLoadingDesa,
    isRefetching: isRefetchingDesa,
    refetch: refetchDesa,
  } = useQuery({
    queryKey: ["Desa", currentLimit, currentPage, currentSearch, idDaerah],
    queryFn: getDesa,
    enabled: isParamsReady && !!currentPage && !!currentLimit && !!idDaerah,
  });

  return {
    dataDesa,
    isLoadingDesa,
    isRefetchingDesa,
    refetchDesa,
    selectedId,
    setSelectedId,
  };
};

export default useListDesa;
