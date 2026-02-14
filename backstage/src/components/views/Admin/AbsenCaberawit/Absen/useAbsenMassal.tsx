// hooks/useAbsenMassal.ts
import { useMutation, useQuery } from "@tanstack/react-query";
import absenServices from "@/services/absen.service";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { IAbsen } from "@/types/Absen";

const useAbsenMassal = (tanggal?: string) => {
  const { setToaster } = useContext(ToasterContext);

  const absenMassal = async (payload: IAbsen) => {
    return absenServices.AbsenMasal(payload);
  };

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: absenMassal,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Absensi berhasil disimpan",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Gagal menyimpan absensi",
      });
    },
  });

  //

  const useAbsenByTanggal = () => {
    return useQuery({
      queryKey: ["AbsenByTanggal", tanggal],
      queryFn: () => absenServices.getAbsenByTanggal(tanggal!),
      enabled: !!tanggal,
    });
  };

  return {
    mutateAbsenMassal: mutate,
    isPending,
    isSuccess,
    useAbsenByTanggal,
  };
};

export default useAbsenMassal;
