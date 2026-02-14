import kegiatanServices from "@/services/kegiatan.service";
import { IKegiatan } from "@/types/Kegiatan";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useKegiatan = () => {
  const [selectedId, setSelectedId] = useState<IKegiatan | null>(null);
  const getKegiatan = async () => {
    const res = await kegiatanServices.getKegiatan();
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

    selectedId,
    setSelectedId,
  };
};

export default useKegiatan;
