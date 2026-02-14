import kelasJenjangServices from "@/services/kelasJenjang.service";
import { IKelasJenjang } from "@/types/KelasJenjang";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useListKelasJenjang = () => {
  const [selectedId, setSelectedId] = useState<IKelasJenjang | null>(null);


  const getKelasJenjang = async () => {

    const res = await kelasJenjangServices.getKelas();
    const { data } = res;
    return data;
  };

  const {
    data: dataKelasJenjang,
    isLoading: isLoadingKelasJenjang,
    isRefetching: isRefetchingKelasJenjang,
    refetch: refetchKelasJenjang,
  } = useQuery({
    queryKey: ["KelasJenjang"],
    queryFn: getKelasJenjang,
  });

  return {
    dataKelasJenjang,
    isLoadingKelasJenjang,
    isRefetchingKelasJenjang,
    refetchKelasJenjang,
    selectedId,
    setSelectedId,
  };
};

export default useListKelasJenjang;
