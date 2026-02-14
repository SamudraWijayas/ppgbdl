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
  mataPelajaranId: yup.string().required("Please input mataPelajaran"),
});

const useUpdateKate = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const { data: dataMapel } = useQuery({
    queryKey: ["Mapel"],
    queryFn: () => mapelServices.getMapel(),
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateKate,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateKate = async (payload: IKateIndikator) => {
    const res = await KateServices.updateKate(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateKate,
    isPending: isPendingMutateUpdateKate,
    isSuccess: isSuccessMutateUpdateKate,
  } = useMutation({
    mutationFn: updateKate,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update Kate",
      });
    },
  });

  const handleUpdateKate = (data: IKateIndikator) => {
    mutateUpdateKate(data);
  };

  return {
    control,
    handleSubmitForm,
    handleUpdateKate,
    errors,
    setValueUpdateKate,
    mutateUpdateKate,
    isPendingMutateUpdateKate,
    isSuccessMutateUpdateKate,
    reset,

    dataMapel,
  };
};

export default useUpdateKate;
