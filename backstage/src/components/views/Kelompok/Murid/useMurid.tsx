import useChangeUrl from "@/hooks/useChangeUrls";
import cabrawitServices from "@/services/caberawit.service";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const useMurid = () => {
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const [filter, setFilter] = useState({
    jenis_kelamin: "",
    minUsia: "",
    maxUsia: "",
    kelasjenjang: "",
  });
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getMurid = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    if (filter.jenis_kelamin)
      params += `&jenis_kelamin=${filter.jenis_kelamin}`;
    if (filter.kelasjenjang) params += `&kelasjenjang=${filter.kelasjenjang}`;
    if (filter.minUsia) params += `&minUsia=${filter.minUsia}`;
    if (filter.maxUsia) params += `&maxUsia=${filter.maxUsia}`;

    const res = await cabrawitServices.getCaberawitByWali(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataMurid,
    isLoading: isLoadingMurid,
    isRefetching: isRefetchingMurid,
    refetch: refetchMurid,
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
    queryFn: getMurid,
    enabled: isParamsReady && !!currentPage && !!currentLimit,
  });

  return {
    dataMurid,
    isLoadingMurid,
    isRefetchingMurid,
    refetchMurid,

    filter,
    setFilter,

    selectedIds,
    setSelectedIds,
    selectedId,
    setSelectedId,
  };
};

export default useMurid;
