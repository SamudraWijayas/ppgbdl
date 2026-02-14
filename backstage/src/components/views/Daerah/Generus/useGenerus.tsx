import useChangeUrl from "@/hooks/useChangeUrls";
import useProfile from "@/hooks/useProfile";
import desaServices from "@/services/desa.service";
import generusServices from "@/services/generus.service";
import jenjangServices from "@/services/jenjang.service";
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
    jenjang: "",
    desa: "",
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
    if (filter.jenjang) params += `&jenjang=${filter.jenjang}`;
    if (filter.desa) params += `&desa=${filter.desa}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await generusServices.getGenerusByDaerah(idDaerah, params);
    const { data } = res;
    return data;
  };

  const getJenjang = async () => {
    const { data } = await jenjangServices.getJenjang();
    return data.data;
  };

  const { data: dataJenjang } = useQuery({
    queryKey: ["Jenjangs"],
    queryFn: getJenjang,
  });

  const getDesa = async () => {
    const { data } = await desaServices.getDesa();
    return data.data;
  };

  const { data: dataDesa } = useQuery({
    queryKey: ["DesaFilter"],
    queryFn: getDesa,
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
      filter.jenjang,
      filter.minUsia,
      filter.maxUsia,
      filter.desa,
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
    dataJenjang,
    dataDesa,
  };
};

export default useGenerus;
