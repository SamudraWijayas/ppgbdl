import useChangeUrl from "@/hooks/useChangeUrls";
import indikatorServices from "@/services/indikator.service";
import KateServices from "@/services/kateindikator.service";
import kelasJenjangServices from "@/services/kelasJenjang.service";
import { IIndikator } from "@/types/Indikator";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useIndikator = () => {
  const [selectedId, setSelectedId] = useState<IIndikator | null>(null);
  const [filter, setFilter] = useState({
    kelasJenjangId: "",
    kategoriIndikatorId: "",
  });

  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getIndikator = async () => {
    let queryParams = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
    if (filter.kelasJenjangId)
      queryParams += `&kelasJenjangId=${filter.kelasJenjangId}`;
    if (filter.kategoriIndikatorId)
      queryParams += `&kategoriIndikatorId=${filter.kategoriIndikatorId}`;

    const res = await indikatorServices.getIndikator(queryParams);
    const { data } = res;
    return data;
  };

  const getKelas = async () => {
    const { data } = await kelasJenjangServices.getKelas();
    return data.data;
  };

  const { data: dataKelas } = useQuery({
    queryKey: ["Kelas"],
    queryFn: getKelas,
  });

  const getKate = async () => {
    const { data } = await KateServices.getKate();
    return data.data;
  };

  const { data: dataKate } = useQuery({
    queryKey: ["Kate"],
    queryFn: getKate,
  });

  const {
    data: dataIndikator,
    isLoading: isLoadingIndikator,
    isRefetching: isRefetchingIndikator,
    refetch: refetchIndikator,
  } = useQuery({
    queryKey: ["Indikator", currentLimit, currentPage, currentSearch, filter],
    queryFn: getIndikator,
    enabled: isParamsReady && !!currentPage && !!currentLimit,
  });

  return {
    dataIndikator,
    isLoadingIndikator,
    isRefetchingIndikator,
    refetchIndikator,
    selectedId,
    setSelectedId,
    filter,
    setFilter,
    dataKelas,
    dataKate,
  };
};

export default useIndikator;
