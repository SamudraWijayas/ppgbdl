import useChangeUrl from "@/hooks/useChangeUrls";
import { IGenerus } from "@/types/Generus";
import { useState } from "react";
import generusServices from "@/services/generus.service";
import { useQuery } from "@tanstack/react-query";
import jenjangServices from "@/services/jenjang.service";
import useProfile from "@/hooks/useProfile";

const useMumi = () => {
  const { profile } = useProfile();
  const idKelompok = profile?.kelompokId;

  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
  const [filter, setFilter] = useState({
    jenis_kelamin: "",
    minUsia: "",
    maxUsia: "",
    jenjang: "",
  });
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getMumi = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (filter.jenis_kelamin)
      params += `&jenis_kelamin=${filter.jenis_kelamin}`;
    if (filter.jenjang) params += `&jenjang=${filter.jenjang}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await generusServices.getGenerusByKelompok(idKelompok, params);
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
      filter.jenis_kelamin,
      filter.jenjang,
      filter.minUsia,
      filter.maxUsia,
    ],
    queryFn: getMumi,
    enabled: !!idKelompok && isParamsReady && !!currentPage && !!currentLimit,
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
  };
};

export default useMumi;
