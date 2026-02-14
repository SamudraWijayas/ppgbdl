import { ToasterContext } from "@/contexts/ToasterContext";
import KateServices from "@/services/kateindikator.service";
import mapelServices from "@/services/mapel.service";
import { IKateIndikator } from "@/types/KategoriIndikator";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  mataPelajaranId: yup.string().required("Please select mataPelajaran"),
});
const useAddKate = () => {
  const { setToaster } = useContext(ToasterContext);

  const { data: dataMapel } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => mapelServices.getMapel(),
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addKate = async (payload: IKateIndikator) => {
    const res = await KateServices.addKate(payload);
    return res;
  };

  const {
    mutate: mutateAddKate,
    isPending: isPendingMutateAddKate,
    isSuccess: isSuccessMutateAddKate,
  } = useMutation({
    mutationFn: addKate,
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

  const handleAddKate = (data: IKateIndikator) => mutateAddKate(data);

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddKate,
    isSuccessMutateAddKate,
    handleAddKate,

    dataMapel,
  };
};

export default useAddKate;
