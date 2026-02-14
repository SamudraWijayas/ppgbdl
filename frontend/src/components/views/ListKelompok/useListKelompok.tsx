import apiServices from "@/service/api.service";
import { useQuery } from "@tanstack/react-query";

const useListKelompok = () => {
  const getKelompok = async () => {
    let params = `limit=999`;

    const res = await apiServices.getKelompok(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataKelompok,
    isLoading: isLoadingKelompok,
    isRefetching: isRefetchingKelompok,
    refetch: refetchKelompok,
  } = useQuery({
    queryKey: ["Kelompok"],
    queryFn: getKelompok,
  });

  return {
    dataKelompok,
    isLoadingKelompok,
    isRefetchingKelompok,
    refetchKelompok,
  };
};

export default useListKelompok;
