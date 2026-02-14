import { ToasterContext } from "@/contexts/ToasterContext";
import jenjangServices from "@/services/jenjang.service";
import { IJenjang } from "@/types/Jenjang";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import  { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
});

const useUpdateJenjang = (id: string) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateJenjang,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateJenjang = async (payload: IJenjang) => {
    const res = await jenjangServices.updateJenjang(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateJenjang,
    isPending: isPendingMutateUpdateJenjang,
    isSuccess: isSuccessMutateUpdateJenjang,
  } = useMutation({
    mutationFn: updateJenjang,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update Jenjang",
      });
    },
  });

  const handleUpdateJenjang = (data: IJenjang) => {
    mutateUpdateJenjang(data);
  };

  return {
    control,
    handleSubmitForm,
    handleUpdateJenjang,
    errors,
    setValueUpdateJenjang,
    mutateUpdateJenjang,
    isPendingMutateUpdateJenjang,
    isSuccessMutateUpdateJenjang,
    reset,
  };
};

export default useUpdateJenjang;
