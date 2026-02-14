import raporServices from "@/services/rapor.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import absenServices from "@/services/absen.service";
import { useParams } from "next/navigation";
import cabrawitServices from "@/services/caberawit.service";
import indikatorServices from "@/services/indikator.service";
import catatanServices from "@/services/catatan.service";

const useRapor = () => {
  const params = useParams();
  const id = params?.id as string;

  const getGenerus = async () => {
    const res = await cabrawitServices.getcaberawitById(id);
    const { data } = res;
    return data;
  };

  const {
    data: dataGenerus,
    isLoading: isLoadingGenerus,
    isRefetching: isRefetchingGenerus,
    refetch: refetchGenerus,
  } = useQuery({
    queryKey: ["Generus", id],
    queryFn: getGenerus,
    enabled: !!id,
  });

  const idKelas = dataGenerus?.data.kelasJenjangId;

  // indikator

  const getIndikator = async () => {
    const res = await indikatorServices.getIndikatorByKelas(idKelas);
    const { data } = res;
    return data;
  };

  const {
    data: dataIndikator,
    isLoading: isLoadingIndikator,
    isRefetching: isRefetchingIndikator,
    refetch: refetchIndikator,
  } = useQuery({
    queryKey: ["Indikator", idKelas],
    queryFn: getIndikator,
    enabled: !!idKelas,
  });

  // Rapor

  const getRapor = async () => {
    const res = await raporServices.getRapor(id);
    const { data } = res;
    return data;
  };

  const {
    data: dataRapor,
    isLoading: isLoadingRapor,
    refetch: refetchRapor,
  } = useQuery({
    queryKey: ["Rapor", id],
    queryFn: getRapor,
    enabled: !!id,
  });

  const { data: RekapAbsen } = useQuery({
    queryKey: ["RekapAbsen", id],
    queryFn: () => absenServices.getAbsenRekap(id),
  });
  const { data: Catatan } = useQuery({
    queryKey: ["CatatanWali", id],
    queryFn: () => catatanServices.getCatatan(id),
  });
  return {
    dataGenerus,
    isLoadingGenerus,
    dataIndikator,
    isLoadingIndikator,
    isRefetchingIndikator,
    dataRapor,
    isLoadingRapor,
    refetchRapor,
    RekapAbsen,
    Catatan,
  };
};

export default useRapor;
