"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import kegiatanServices from "@/services/kegiatan.service";
import { DateValue } from "@internationalized/date";

import { IDataKegiatan, IKegiatan, IKegiatanForm } from "@/types/Kegiatan";
import { toDateStandard } from "@/utils/date";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const defaultKegiatan: IKegiatan = {
  id: "",
  name: "",
  startDate: "",
  endDate: "",
  jenisKelamin: "",
  tingkat: "DESA",
  targetType: "JENJANG",
  kelompokId: null,
  desaId: null,
  daerahId: null,
  dokumentasi: [],
};

const useDetailKegiatan = () => {
  const { setToaster } = useContext(ToasterContext);
  const params = useParams();
  const id = params?.id as string | undefined;

  const getKegiatanById = async (): Promise<IDataKegiatan | null> => {
    if (!id) return null;
    const { data } = await kegiatanServices.getKegiatanById(id);

    const hasil = data.data;
    return {
      kegiatan: hasil.kegiatan || hasil,
      peserta: hasil.peserta || [],
    };
  };

  const {
    data: dataKegiatanRaw,
    refetch: refetchKegiatan,
    isLoading: isLoadingKegiatan,
  } = useQuery<IDataKegiatan | null>({
    queryKey: ["Kegiatan", id],
    queryFn: getKegiatanById,
    enabled: !!id,
  });

  // ✅ Kasih default biar gak undefined (fix error "undefined not assignable")
  const dataKegiatan: IDataKegiatan = dataKegiatanRaw ?? {
    kegiatan: defaultKegiatan,
    peserta: [],
  };  

  const updateKegiatan = async (payload: IKegiatanForm) => {
    const kegiatanId = dataKegiatan?.kegiatan?.id || id;
    if (!kegiatanId) throw new Error("Kegiatan ID tidak ditemukan");

    const { data } = await kegiatanServices.updateKegiatan(
      `${kegiatanId}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKegiatan,
    isPending: isPendingMutateUpdateKegiatan,
    isSuccess: isSuccessMutateUpdateKegiatan,
  } = useMutation({
    mutationFn: (payload: IKegiatanForm) => updateKegiatan(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Terjadi kesalahan",
      });
    },
    onSuccess: () => {
      refetchKegiatan();
      setToaster({
        type: "success",
        message: "Update Kegiatan successfully",
      });
    },
  });

  const handleUpdateKegiatan = (data: IKegiatanForm) => {
    const payload = {
      ...data,
      startDate: toDateStandard(data.startDate as DateValue),
      endDate: toDateStandard(data.endDate as DateValue),
    };
    mutateUpdateKegiatan(payload);
  };

  const handleUpdateDok = (data: IKegiatanForm) => mutateUpdateKegiatan(data);

  return {
    dataKegiatan,
    isLoadingKegiatan,
    isPendingMutateUpdateKegiatan,
    isSuccessMutateUpdateKegiatan,
    handleUpdateKegiatan,
    handleUpdateDok,
  };
};

export default useDetailKegiatan;
