import useChangeUrl from "@/hooks/useChangeUrls";
import useProfile from "@/hooks/useProfile";
import kelompokServices from "@/services/kelompok.service";
import { IKelompok } from "@/types/Kelompok";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useListKelompok = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;
  const [selectedId, setSelectedId] = useState<IKelompok | null>(null);
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getKelompok = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await kelompokServices.getKelompokByDaerah(idDaerah, params);
    const { data } = res;
    return data;
  };

  const {
    data: dataKelompok,
    isLoading: isLoadingKelompok,
    isRefetching: isRefetchingKelompok,
    refetch: refetchKelompok,
  } = useQuery({
    queryKey: ["Kelompok", currentLimit, currentPage, currentSearch, idDaerah],
    queryFn: getKelompok,
    enabled: isParamsReady && !!currentPage && !!currentLimit && !!idDaerah,
  });

  return {
    dataKelompok,
    isLoadingKelompok,
    isRefetchingKelompok,
    refetchKelompok,
    selectedId,
    setSelectedId,
  };
};

export default useListKelompok;
