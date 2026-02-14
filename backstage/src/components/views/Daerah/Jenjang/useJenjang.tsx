import jenjangServices from "@/services/jenjang.service";
import { IJenjang } from "@/types/Jenjang";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useListJenjang = () => {
  const [selectedId, setSelectedId] = useState<IJenjang | null>(null);


  const getJenjang = async () => {

    const res = await jenjangServices.getJenjang();
    const { data } = res;
    return data;
  };

  const {
    data: dataJenjang,
    isLoading: isLoadingJenjang,
    isRefetching: isRefetchingJenjang,
    refetch: refetchJenjang,
  } = useQuery({
    queryKey: ["Jenjang"],
    queryFn: getJenjang,
  });

  return {
    dataJenjang,
    isLoadingJenjang,
    isRefetchingJenjang,
    refetchJenjang,
    selectedId,
    setSelectedId,
  };
};

export default useListJenjang;
