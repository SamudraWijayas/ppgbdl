import { ToasterContext } from "@/contexts/ToasterContext";
import indikatorServices from "@/services/indikator.service";
import KateServices from "@/services/kateindikator.service";
import kelasJenjangServices from "@/services/kelasJenjang.service";
import { IIndikator } from "@/types/Indikator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  kelasJenjangId: yup.string().required("Please select kelasJenjangId"),
  kategoriIndikatorId: yup.string().required("Please select kelasJenjangId"),
  indikator: yup.string().required("Please select indikator"),
  semester: yup.string().required("Please select semester"),
  jenisPenilaian: yup.string().required("Please select jenisPenilaian"),
});
const useAddIndikator = () => {
  const { setToaster } = useContext(ToasterContext);

  const { data: dataKelas } = useQuery({
    queryKey: ["Kelas"],
    queryFn: () => kelasJenjangServices.getKelas(),
  });

  const { data: dataKategori } = useQuery({
    queryKey: ["Kategori"],
    queryFn: () => KateServices.getKate(),
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addIndikator = async (payload: IIndikator) => {
    const res = await indikatorServices.addIndikator(payload);
    return res;
  };

  const {
    mutate: mutateAddIndikator,
    isPending: isPendingMutateAddIndikator,
    isSuccess: isSuccessMutateAddIndikator,
  } = useMutation({
    mutationFn: addIndikator,
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

  const handleAddIndikator = (data: IIndikator) => mutateAddIndikator(data);

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddIndikator,
    isSuccessMutateAddIndikator,
    handleAddIndikator,

    dataKelas,
    dataKategori,
  };
};

export default useAddIndikator;
