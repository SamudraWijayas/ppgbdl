import apiServices from "@/service/api.service";
import { useQuery } from "@tanstack/react-query";

const useHome = (tanggal?: string) => {
  const getKegiatanDaerah = async () => {
    const res = await apiServices.getKegiatanDaerah(tanggal);
    const { data } = res;
    return data;
  };

  const {
    data: dataKegiatanDaerah,
    isLoading: isLoadingKegiatanDaerah,
    isRefetching: isRefetchingKegiatanDaerah,
    refetch: refetchKegiatanDaerah,
  } = useQuery({
    queryKey: ["KegiatanDaerah", tanggal],
    queryFn: getKegiatanDaerah,
  });
  //   desa
  const getKegiatanDesa = async () => {
    const res = await apiServices.getKegiatanDesa(tanggal);
    const { data } = res;
    return data;
  };

  const {
    data: dataKegiatanDesa,
    isLoading: isLoadingKegiatanDesa,
    isRefetching: isRefetchingKegiatanDesa,
    refetch: refetchKegiatanDesa,
  } = useQuery({
    queryKey: ["KegiatanDesa", tanggal],
    queryFn: getKegiatanDesa,
  });

  return {
    dataKegiatanDaerah,
    isLoadingKegiatanDaerah,
    isRefetchingKegiatanDaerah,
    refetchKegiatanDaerah,
    dataKegiatanDesa,
    isLoadingKegiatanDesa,
    isRefetchingKegiatanDesa,
    refetchKegiatanDesa,
  };
};

export default useHome;
