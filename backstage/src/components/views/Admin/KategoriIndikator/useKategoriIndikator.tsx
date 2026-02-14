import KateServices from "@/services/kateindikator.service";
import { IKateIndikator } from "@/types/KategoriIndikator";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const UseKategoriIndikator = () => {
  const [selectedId, setSelectedId] = useState<IKateIndikator | null>(null);

  const getKate = async () => {
    const res = await KateServices.getKate();
    const { data } = res;
    return data;
  };

  const {
    data: dataKate,
    isLoading: isLoadingKate,
    isRefetching: isRefetchingKate,
    refetch: refetchKate,
  } = useQuery({
    queryKey: ["Kate"],
    queryFn: getKate,
  });

  return {
    dataKate,
    isLoadingKate,
    isRefetchingKate,
    refetchKate,
    selectedId,
    setSelectedId,
  };
};

export default UseKategoriIndikator;
