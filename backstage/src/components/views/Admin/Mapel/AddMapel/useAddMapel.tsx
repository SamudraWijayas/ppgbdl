import { ToasterContext } from "@/contexts/ToasterContext";
import mapelServices from "@/services/mapel.service";
import { IMapel } from "@/types/Mapel";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});
const useAddMapel = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addMapel = async (payload: IMapel) => {
    const res = await mapelServices.addMapel(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addMapel,
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

  const handleAddMapel = (data: IMapel) => mutateAddEvent(data);

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddMapel,
  };
};

export default useAddMapel;
