import countServices from "@/services/count.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  const totalDaerah = async () => {
    const res = await countServices.CountDaerahForAdmin();
    return res.data.data;
  };

  const { data: dataTotalDaerah, isLoading: isLoadingTotalDaerah } = useQuery({
    queryKey: ["TotalDaerah"],
    queryFn: totalDaerah,
  });

  // desa
  const totalDesa = async () => {
    const res = await countServices.CountDesaForAdmin();
    return res.data.data;
  };

  const { data: dataTotalDesa, isLoading: isLoadingTotalDesa } = useQuery({
    queryKey: ["TotalDesa"],
    queryFn: totalDesa,
  });

  //   kelompok
  const totalKelompok = async () => {
    const res = await countServices.CountKelompokForAdmin();
    return res.data.data;
  };

  const { data: dataTotalKelompok, isLoading: isLoadingTotalKelompok } =
    useQuery({
      queryKey: ["TotalKelompok"],
      queryFn: totalKelompok,
    });

  return {
    dataTotalDaerah,
    isLoadingTotalDaerah,
    dataTotalDesa,
    isLoadingTotalDesa,
    dataTotalKelompok,
    isLoadingTotalKelompok,
  };
};

export default useDashboard;
