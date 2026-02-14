import apiServices from "@/service/api.service";
import { useQuery } from "@tanstack/react-query";

const useJelajah = () => {
  const getKegiatan = async () => {
    const res = await apiServices.getKegiatan();
    const { data } = res;
    return data;
  };

  const {
    data: dataKegiatan,
    isLoading: isLoadingKegiatan,
    isRefetching: isRefetchingKegiatan,
    refetch: refetchKegiatan,
  } = useQuery({
    queryKey: ["Kegiatan"],
    queryFn: getKegiatan,
  });
  return {
    dataKegiatan,
    isLoadingKegiatan,
    isRefetchingKegiatan,
    refetchKegiatan,
  };
};

export default useJelajah;
