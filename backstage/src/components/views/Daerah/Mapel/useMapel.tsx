import mapelServices from "@/services/mapel.service";
import { IMapel } from "@/types/Mapel";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useListMapel = () => {
  const [selectedId, setSelectedId] = useState<IMapel | null>(null);

  const getMapel = async () => {
    const res = await mapelServices.getMapel();
    const { data } = res;
    return data;
  };

  const {
    data: dataMapel,
    isLoading: isLoadingMapel,
    isRefetching: isRefetchingMapel,
    refetch: refetchMapel,
  } = useQuery({
    queryKey: ["Mapel"],
    queryFn: getMapel,
  });

  return {
    dataMapel,
    isLoadingMapel,
    isRefetchingMapel,
    refetchMapel,
    selectedId,
    setSelectedId,
  };
};

export default useListMapel;
