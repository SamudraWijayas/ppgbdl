import { ToasterContext } from "@/contexts/ToasterContext";
import daerahServices from "@/services/daerah.service";
import { IDaerah } from "@/types/Daerah";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import  { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});

const useUpdateDaerah = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateDaerah,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateDaerah = async (payload: IDaerah) => {
    const res = await daerahServices.updateDaerah(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateDaerah,
    isPending: isPendingMutateUpdateDaerah,
    isSuccess: isSuccessMutateUpdateDaerah,
  } = useMutation({
    mutationFn: updateDaerah,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update daerah",
      });
    },
  });

  const handleUpdateDaerah = (data: IDaerah) => {
    mutateUpdateDaerah(data);
  };

  return {
    control,
    handleSubmitForm,
    handleUpdateDaerah,
    errors,
    setValueUpdateDaerah,
    mutateUpdateDaerah,
    isPendingMutateUpdateDaerah,
    isSuccessMutateUpdateDaerah,
    reset,
  };
};

export default useUpdateDaerah;
