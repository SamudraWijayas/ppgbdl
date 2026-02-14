import useChangeUrl from "@/hooks/useChangeUrls";
import { IGenerus } from "@/types/Generus";
import React, { useState } from "react";
import generusServices from "@/services/generus.service";
import { useQuery } from "@tanstack/react-query";
import jenjangServices from "@/services/jenjang.service";
import { useParams } from "next/navigation";
import cabrawitServices from "@/services/caberawit.service";
import kelasJenjangServices from "@/services/kelasJenjang.service";

const useCaberawit = () => {
  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
  const [filter, setFilter] = useState({
    jenis_kelamin: "",
    minUsia: "",
    maxUsia: "",
    kelasjenjang: "",
  });
  const params = useParams();
  const id = params?.id as string;
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getMumi = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (filter.jenis_kelamin)
      params += `&jenis_kelamin=${filter.jenis_kelamin}`;
    if (filter.kelasjenjang) params += `&kelasjenjang=${filter.kelasjenjang}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await cabrawitServices.getCaberawitByKelompok(id, params);
    const { data } = res;
    return data;
  };

  const getKelas = async () => {
    const { data } = await kelasJenjangServices.getKelas();
    return data.data;
  };

  const {
    data: dataKelas,
  } = useQuery({
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
      filter.jenis_kelamin,
      filter.kelasjenjang,
      filter.minUsia,
      filter.maxUsia,
    ],
    queryFn: getMumi,
    enabled: !!id && isParamsReady && !!currentPage && !!currentLimit,
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
