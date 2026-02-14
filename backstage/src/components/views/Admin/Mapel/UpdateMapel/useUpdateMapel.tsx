import { ToasterContext } from "@/contexts/ToasterContext";
import mapelServices from "@/services/mapel.service";
import { IMapel } from "@/types/Mapel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import  { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});

const useUpdateMapel = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateMapel,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateMapel = async (payload: IMapel) => {
    const res = await mapelServices.updateMapel(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateMapel,
    isPending: isPendingMutateUpdateMapel,
    isSuccess: isSuccessMutateUpdateMapel,
  } = useMutation({
    mutationFn: updateMapel,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update Mapel",
      });
    },
  });

  const handleUpdateMapel = (data: IMapel) => {
    mutateUpdateMapel(data);
  };

  return {
    control,
    handleSubmitForm,
    handleUpdateMapel,
    errors,
    setValueUpdateMapel,
    mutateUpdateMapel,
    isPendingMutateUpdateMapel,
    isSuccessMutateUpdateMapel,
    reset,
  };
};

export default useUpdateMapel;
