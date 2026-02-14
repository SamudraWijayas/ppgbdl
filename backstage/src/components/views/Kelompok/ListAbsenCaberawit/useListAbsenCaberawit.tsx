import useChangeUrl from "@/hooks/useChangeUrls";
import cabrawitServices from "@/services/caberawit.service";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import absenServices from "@/services/absen.service";
import { IGenerus } from "@/types/Generus";

const useListAbsenCaberawit = (tanggal?: string) => {
  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
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

  const getDesa = async () => {
    const { data } = await desaServices.getDesa();
    return data.data;
  };

  const { data: dataDesa } = useQuery({
    queryKey: ["Desas"],
    queryFn: getDesa,
  });

  const getDaerah = async () => {
    const { data } = await daerahServices.getDaerah();
    return data.data;
  };

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerahs"],
    queryFn: getDaerah,
  });

  const getAbsen = async () => {
    const { data } = await absenServices.getAbsenByTanggal(tanggal!);
    return data.data;
  };

  const { data: dataAbsen } = useQuery({
    queryKey: ["Absens", tanggal],
    enabled: !!tanggal,
    queryFn: getAbsen,
  });

  return {
    dataMurid,
    isLoadingMurid,
    isRefetchingMurid,
    refetchMurid,
    selectedId,
    setSelectedId,

    filter,
    setFilter,
    dataDesa,
    dataDaerah,
    dataAbsen,
  };
};

export default useListAbsenCaberawit;
