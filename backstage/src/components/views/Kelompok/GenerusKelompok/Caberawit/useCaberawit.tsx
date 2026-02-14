import useChangeUrl from "@/hooks/useChangeUrls";
import { IGenerus } from "@/types/Generus";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import cabrawitServices from "@/services/caberawit.service";
import useProfile from "@/hooks/useProfile";
import kelasJenjangServices from "@/services/kelasJenjang.service";

const useCaberawit = () => {
  const { profile } = useProfile();
  const idKelompok = profile?.kelompokId;
  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
  const [filter, setFilter] = useState({
    jenis_kelamin: "",
    minUsia: "",
    maxUsia: "",
    kelasjenjang: "",
  });

  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getCaberawit = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (filter.jenis_kelamin)
      params += `&jenis_kelamin=${filter.jenis_kelamin}`;
    if (filter.kelasjenjang) params += `&kelasjenjang=${filter.kelasjenjang}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await cabrawitServices.getCaberawitByKelompok(
      idKelompok,
      params,
    );
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
      "Caberawit",
      currentLimit,
      currentPage,
      currentSearch,
      filter.jenis_kelamin,
      filter.kelasjenjang,
      filter.minUsia,
      filter.maxUsia,
    ],
    queryFn: getCaberawit,
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
    dataKelas,
  };
};

export default useCaberawit;
