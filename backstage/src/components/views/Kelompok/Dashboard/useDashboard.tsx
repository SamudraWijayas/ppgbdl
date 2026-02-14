import useProfile from "@/hooks/useProfile";
import authServices from "@/services/auth.service";
import countServices from "@/services/count.service";
import generusServices from "@/services/generus.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const useDashboard = () => {
  const { profile } = useProfile();
  const idKelompok = profile?.kelompokId;
  console.log("kelompk", idKelompok)

  //   kelompok
  const totalKelompok = async () => {
    const query = `desaId=${idKelompok}`;
    const res = await countServices.CountKelompokByDesa(query);
    return res.data.data;
  };

  const { data: dataTotalKelompok, isLoading: isLoadingTotalKelompok } =
    useQuery({
      queryKey: ["TotalKelompok", idKelompok],
      queryFn: totalKelompok,
    });

  //   mumi
  const totalMumi = async () => {
    const query = `kelompokId=${idKelompok}`;
    const res = await countServices.CountMumi(query);
    return res.data.data;
  };

  const { data: dataTotalMumi, isLoading: isLoadingTotalMumi } = useQuery({
    queryKey: ["TotalMumi", idKelompok],
    queryFn: totalMumi,
  });
  //   caberawit
  const totalCaberawit = async () => {
    const query = `kelompokId=${idKelompok}`;
    const res = await countServices.CountCaberawit(query);
    return res.data.data;
  };

  const { data: dataTotalCaberawit, isLoading: isLoadingTotalCaberawit } =
    useQuery({
      queryKey: ["TotalCaberawit", idKelompok],
      queryFn: totalCaberawit,
    });

  // desa
  const StatistikByDesa = async () => {
    const res = await generusServices.getStatistikByKelompok(idKelompok);
    return res.data.data;
  };

  const { data: dataStatistikByDesa, isLoading: isLoadingStatistikByDesa } =
    useQuery({
      queryKey: ["StatistikByKelompok", idKelompok],
      queryFn: StatistikByDesa,
      enabled: !!idKelompok,
    });

  return {
    dataTotalCaberawit,
    dataTotalKelompok,
    isLoadingTotalKelompok,
    dataStatistikByDesa,
    isLoadingStatistikByDesa,
    dataTotalMumi,
    isLoadingTotalMumi,
  };
};

export default useDashboard;
