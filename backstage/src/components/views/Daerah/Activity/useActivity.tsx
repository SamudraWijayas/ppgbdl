import useProfile from "@/hooks/useProfile";
import kegiatanServices from "@/services/kegiatan.service";
import { IKegiatan } from "@/types/Kegiatan";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useActivity = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;
  const [selectedId, setSelectedId] = useState<IKegiatan | null>(null);
  const getKegiatan = async () => {
    const query = `daerahId=${idDaerah}`;
    const res = await kegiatanServices.getKegiatanByFilter(query);
    const { data } = res;
    return data;
  };

  const {
    data: dataKegiatan,
    isLoading: isLoadingKegiatan,
    isRefetching: isRefetchingKegiatan,
    refetch: refetchKegiatan,
  } = useQuery({
    queryKey: ["Kegiatan", idDaerah],
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

export default useActivity;
