import indikatorServices from "@/services/indikator.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useContext } from "react";
import useRapotCaberawit from "../useRapotCaberawit";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IRapor } from "@/types/Rapor";
import raporServices from "@/services/rapor.service";
import { ToasterContext } from "@/contexts/ToasterContext";

const schema = yup.object({
  semester: yup
    .string()
    .oneOf(["GANJIL", "GENAP"])
    .required("Semester wajib diisi"),
  raporItems: yup.array().of(
    yup.object({
      indikatorKelasId: yup.string().required("Indikator wajib diisi"),
      nilaiPengetahuan: yup
        .number()
        .nullable()
        .min(0, "Nilai minimal 0")
        .max(100, "Nilai maksimal 100"),
      nilaiKeterampilan: yup
        .number()
        .nullable()
        .min(0, "Nilai minimal 0")
        .max(100, "Nilai maksimal 100"),
    }),
  ),
});

const useAddRapor = () => {
  const { setToaster } = useContext(ToasterContext);
  const { dataGenerus } = useRapotCaberawit();
  const params = useParams();
  const id = params?.id as string;
  const idKelas = dataGenerus?.data.kelasJenjangId;
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

  // add rapor

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addRapor = async (payload: IRapor) => {
    const res = await raporServices.addRapor(payload);
    return res;
  };

  const {
    mutate: mutateAddRapor,
    isPending: isPendingMutateAddRapor,
    isSuccess: isSuccessMutateAddRapor,
  } = useMutation({
    mutationFn: addRapor,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success add category",
      });
      reset();
    },
  });

  const handleAddRapor = (data: any) => {
    const payload: IRapor & { caberawitId: number } = {
      caberawitId: Number(id),
      semester: data.semester,
      raporItems: (data.raporItems ?? []).map((item: any) => ({
        indikatorKelasId: item.indikatorKelasId,
        kelasJenjangId: idKelas,
        nilaiPengetahuan: item.nilaiPengetahuan ?? null,
        nilaiKeterampilan: item.nilaiKeterampilan ?? null,
      })),
    };

    mutateAddRapor(payload);
  };

  return {
    dataIndikator,
    isLoadingIndikator,

    mutateAddRapor,
    isPendingMutateAddRapor,
    isSuccessMutateAddRapor,
    control,
    handleSubmitForm,
    errors,
    getValues,
    setValue,
    handleAddRapor,
  };
};

export default useAddRapor;
