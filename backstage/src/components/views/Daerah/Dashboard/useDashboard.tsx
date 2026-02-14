import useProfile from "@/hooks/useProfile";
import countServices from "@/services/count.service";
import generusServices from "@/services/generus.service";
import { useQuery } from "@tanstack/react-query";

const useDashboard = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;

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
    const res = await countServices.CountDesaByDaerah(idDaerah);
    return res.data.data;
  };

  const { data: dataTotalDesa, isLoading: isLoadingTotalDesa } = useQuery({
    queryKey: ["TotalDesa", idDaerah],
    queryFn: totalDesa,
  });

  //   kelompok
  const totalKelompok = async () => {
    const res = await countServices.CountKelompokByDaerah(idDaerah);
    return res.data.data;
  };

  const { data: dataTotalKelompok, isLoading: isLoadingTotalKelompok } =
    useQuery({
      queryKey: ["TotalKelompok", idDaerah],
      queryFn: totalKelompok,
    });

  //   mumi
  const totalMumi = async () => {
    const query = `daerahId=${idDaerah}`;
    const res = await countServices.CountMumi(query);
    return res.data.data;
  };

  const { data: dataTotalMumi, isLoading: isLoadingTotalMumi } = useQuery({
    queryKey: ["TotalMumi", idDaerah],
    queryFn: totalMumi,
  });
  //   caberawit
  const totalCaberawit = async () => {
    const query = `daerahId=${idDaerah}`;
    const res = await countServices.CountCaberawit(query);
    return res.data.data;
  };
  const { data: dataTotalCaberawit, isLoading: isLoadingTotalCaberawit } =
    useQuery({
      queryKey: ["TotalCaberawit", idDaerah],
      queryFn: totalCaberawit,
    });

  // statistik
  const StatistikByDaerah = async () => {
    const res = await generusServices.getStatistikByDaerah(idDaerah);
    return res.data.data;
  };

  const { data: dataStatistikByDaerah, isLoading: isLoadingStatistikByDaerah } =
    useQuery({
      queryKey: ["StatistikByDaerah", idDaerah],
      queryFn: StatistikByDaerah,
      enabled: !!idDaerah,
    });

  // count statistik
  const countStatistikByDaerah = async () => {
    const res = await generusServices.getCountStatistikByDaerah(idDaerah);
    return res.data.data;
  };

  const { data: dataStatistikByDesa, isLoading: isLoadingStatistikByDesa } =
    useQuery({
      queryKey: ["CountStatistikByKelompok", idDaerah],
      queryFn: countStatistikByDaerah,
      enabled: !!idDaerah,
    });

  return {
    dataTotalDaerah,
    isLoadingTotalDaerah,
    dataTotalDesa,
    isLoadingTotalDesa,
    dataTotalKelompok,
    isLoadingTotalKelompok,

    dataStatistikByDaerah,
    isLoadingStatistikByDaerah,

    dataStatistikByDesa,
    isLoadingStatistikByDesa,

    dataTotalMumi,
    isLoadingTotalMumi,
    dataTotalCaberawit,
    isLoadingTotalCaberawit,
  };
};

export default useDashboard;
