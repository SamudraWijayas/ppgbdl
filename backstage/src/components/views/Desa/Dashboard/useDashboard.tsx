import useProfile from "@/hooks/useProfile";
import countServices from "@/services/count.service";
import generusServices from "@/services/generus.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  const { profile } = useProfile();
  const idDesa = profile?.desaId;

  //   kelompok
  const totalKelompok = async () => {
    const query = `desaId=${idDesa}`;
    const res = await countServices.CountKelompokByDesa(query);
    return res.data.data;
  };

  const { data: dataTotalKelompok, isLoading: isLoadingTotalKelompok } =
    useQuery({
      queryKey: ["TotalKelompok", idDesa],
      queryFn: totalKelompok,
    });

  //   mumi
  const totalMumi = async () => {
    const query = `desaId=${idDesa}`;
    const res = await countServices.CountMumi(query);
    return res.data.data;
  };

  const { data: dataTotalMumi, isLoading: isLoadingTotalMumi } = useQuery({
    queryKey: ["TotalMumi", idDesa],
    queryFn: totalMumi,
  });
  //   caberawit
  const totalCaberawit = async () => {
    const query = `desaId=${idDesa}`;
    const res = await countServices.CountCaberawit(query);
    return res.data.data;
  };

  const { data: dataTotalCaberawit, isLoading: isLoadingTotalCaberawit } =
    useQuery({
      queryKey: ["TotalCaberawit", idDesa],
      queryFn: totalCaberawit,
    });

  // desa
  const StatistikByDesa = async () => {
    const res = await generusServices.getStatistikByDesa(idDesa);
    return res.data.data;
  };

  const { data: dataStatistikByDesa, isLoading: isLoadingStatistikByDesa } =
    useQuery({
      queryKey: ["StatistikByDesa", idDesa],
      queryFn: StatistikByDesa,
      enabled: !!idDesa,
    });

  return {
    dataTotalCaberawit,
    isLoadingTotalCaberawit,
    dataTotalMumi,
    isLoadingTotalMumi,
    dataTotalKelompok,
    isLoadingTotalKelompok,
    dataStatistikByDesa,
    isLoadingStatistikByDesa,
  };
};

export default useDashboard;
