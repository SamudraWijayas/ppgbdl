import { ToasterContext } from "@/contexts/ToasterContext";
import useProfile from "@/hooks/useProfile";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import kelompokServices from "@/services/kelompok.service";
import { IKelompok } from "@/types/Kelompok";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  desaId: yup.string().required("Please select desa"),
});
const useAddKelompok = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;
  const { setToaster } = useContext(ToasterContext);

  // Desa tergantung pada daerah yang dipilih
  const getDesa = async () => {
    const params = `limit=999`;
    const res = await desaServices.getDesaByDaerah(idDaerah, params);
    const { data } = res;
    return data;
  };

  const { data: dataDesa } = useQuery({
    queryKey: ["Desa for add kelompok", idDaerah],
    queryFn: getDesa,
    enabled: !!idDaerah,
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addKelompok = async (payload: IKelompok) => {
    const res = await kelompokServices.addKelompok(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addKelompok,
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

  const handleAddKelompok = (data: IKelompok) => {
    const payload = {
      ...data,
      daerahId: idDaerah,
    };
    mutateAddEvent(payload);
  };

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddKelompok,

    dataDesa,
  };
};

export default useAddKelompok;
