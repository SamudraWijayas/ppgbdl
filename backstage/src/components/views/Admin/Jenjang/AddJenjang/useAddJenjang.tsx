import { ToasterContext } from "@/contexts/ToasterContext";
import jenjangServices from "@/services/jenjang.service";
import { IJenjang } from "@/types/Jenjang";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});
const useAddJenjang = () => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addJenjang = async (payload: IJenjang) => {
    const res = await jenjangServices.addJenjang(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addJenjang,
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

  const handleAddJenjang = (data: IJenjang) => mutateAddEvent(data);

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddJenjang,
  };
};

export default useAddJenjang;
