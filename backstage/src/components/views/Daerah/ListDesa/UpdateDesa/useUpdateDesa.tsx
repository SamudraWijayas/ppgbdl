import { ToasterContext } from "@/contexts/ToasterContext";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import { IDesa } from "@/types/Desa";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  daerahId: yup.string().required("Please input daerahId"),
});

const useUpdateDesa = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => daerahServices.getDaerah(),
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateDesa,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateDesa = async (payload: IDesa) => {
    const res = await desaServices.updateDesa(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateDesa,
    isPending: isPendingMutateUpdateDesa,
    isSuccess: isSuccessMutateUpdateDesa,
  } = useMutation({
    mutationFn: updateDesa,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update desa",
      });
    },
  });

  const handleUpdateDesa = (data: IDesa) => {
    mutateUpdateDesa(data);
  };

  return {
    control,
    handleSubmitForm,
    handleUpdateDesa,
    errors,
    setValueUpdateDesa,
    mutateUpdateDesa,
    isPendingMutateUpdateDesa,
    isSuccessMutateUpdateDesa,
    reset,

    dataDaerah,
  };
};

export default useUpdateDesa;
