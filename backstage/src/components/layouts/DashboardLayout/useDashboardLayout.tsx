import authServices from "@/services/auth.service";
import kelompokServices from "@/services/kelompok.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useDashboardLayout = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Di App Router, router selalu tersedia, jadi ini opsional
    setIsReady(true);
  }, []);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });

  const idDesa = dataProfile?.desaId;
  console.log("id desa", idDesa);

  // klompok
  const getKelompok = async () => {
    const res = await kelompokServices.getKelompokByDesa(idDesa);
    const { data } = res;
    return data;
  };

  const {
    data: dataKelompok,
    isLoading: isLoadingKelompok,
    isRefetching: isRefetchingKelompok,
    refetch: refetchKelompok,
  } = useQuery({
    queryKey: ["KelompokByDesa", idDesa],
    queryFn: getKelompok,
    enabled: !!idDesa,
  });
  return {
    dataProfile,
    dataKelompok,
    isLoadingKelompok,
    isRefetchingKelompok,
    refetchKelompok,
  };
};

export default useDashboardLayout;
