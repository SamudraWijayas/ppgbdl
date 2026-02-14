import apiServices from "@/service/api.service";
import { useQuery } from "@tanstack/react-query";

const useListDesa = () => {
  const getDesa = async () => {
    let params = `limit=999`;

    const res = await apiServices.getDesa(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataDesa,
    isLoading: isLoadingDesa,
    isRefetching: isRefetchingDesa,
    refetch: refetchDesa,
  } = useQuery({
    queryKey: ["Desa"],
    queryFn: getDesa,
  });

  return {
    dataDesa,
    isLoadingDesa,
    isRefetchingDesa,
    refetchDesa,
  };
};

export default useListDesa;
