import useChangeUrl from "@/hooks/useChangeUrls";
import useProfile from "@/hooks/useProfile";
import cabrawitServices from "@/services/caberawit.service";
import kelasJenjangServices from "@/services/kelasJenjang.service";
import { IGenerus } from "@/types/Generus";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useGenerus = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;
  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
  const [filter, setFilter] = useState({
    jenis_kelamin: "",
    minUsia: "",
    maxUsia: "",
    kelasjenjang: "",
  });
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getGenerus = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (filter.jenis_kelamin)
      params += `&jenis_kelamin=${filter.jenis_kelamin}`;
    if (filter.kelasjenjang) params += `&kelasjenjang=${filter.kelasjenjang}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await cabrawitServices.getCaberawitByDaerah(idDaerah, params);
    const { data } = res;
    return data;
  };

  const getKelas = async () => {
    const { data } = await kelasJenjangServices.getKelas();
    return data.data;
  };

  const { data: dataKelas } = useQuery({
    queryKey: ["Kelass"],
    queryFn: getKelas,
  });

  const {
    data: dataGenerus,
    isLoading: isLoadingGenerus,
    isRefetching: isRefetchingGenerus,
    refetch: refetchGenerus,
  } = useQuery({
    queryKey: [
      "Generus",
      currentLimit,
      currentPage,
      currentSearch,
      idDaerah,
      filter.jenis_kelamin,
      filter.kelasjenjang,
      filter.minUsia,
      filter.maxUsia,
    ],
    queryFn: getGenerus,
    enabled: isParamsReady && !!currentPage && !!currentLimit && !!idDaerah,
  });

  return {
    dataGenerus,
    isLoadingGenerus,
    isRefetchingGenerus,
    refetchGenerus,
    selectedId,
    setSelectedId,

    filter,
    setFilter,
    dataKelas,
  };
};

export default useGenerus;
