import useChangeUrl from "@/hooks/useChangeUrls";
import cabrawitServices from "@/services/caberawit.service";
import absenServices from "@/services/absen.service";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import { IGenerus } from "@/types/Generus";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useAbsenCaberawit = (tanggal?: string) => {
  const [selectedId, setSelectedId] = useState<IGenerus | null>(null);
  const [filter, setFilter] = useState({
    daerah: "",
    desa: "",
    kelompok: "",
  });
  const { currentLimit, currentPage, currentSearch, isParamsReady } =
    useChangeUrl();

  const getGenerus = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }

    if (filter.daerah) params += `&daerah=${filter.daerah}`;
    if (filter.desa) params += `&desa=${filter.desa}`;
    if (filter.kelompok) params += `&kelompok=${filter.kelompok}`;

    const res = await cabrawitServices.getcaberawit(params);
    const { data } = res;
    return data;
  };

  const getDesa = async () => {
    const { data } = await desaServices.getDesa();
    return data.data;
  };

  const {
    data: dataDesa,
    refetch: refetchDesa,
    isPending: isPendingDesa,
    isRefetching: isRefetchingDesa,
  } = useQuery({
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
      filter.daerah,
      filter.desa,
      filter.kelompok,
    ],
    queryFn: getGenerus,
    enabled: isParamsReady && !!currentPage && !!currentLimit,
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
    dataGenerus,
    isLoadingGenerus,
    isRefetchingGenerus,
    refetchGenerus,
    selectedId,
    setSelectedId,

    filter,
    setFilter,
    dataDesa,
    dataDaerah,
    dataAbsen,
  };
};

export default useAbsenCaberawit;
