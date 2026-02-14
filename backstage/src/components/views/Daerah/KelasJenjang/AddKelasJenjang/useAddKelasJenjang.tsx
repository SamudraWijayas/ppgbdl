import { ToasterContext } from "@/contexts/ToasterContext";
import jenjangServices from "@/services/jenjang.service";
import kelasJenjangServices from "@/services/kelasJenjang.service";
import { IKelasJenjang } from "@/types/KelasJenjang";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  jenjangId: yup.string().required("Please select jenjang"),
});
const useAddKelasJenjang = () => {
  const { setToaster } = useContext(ToasterContext);

  const { data: dataJenjang } = useQuery({
    queryKey: ["Jenjang"],
    queryFn: () => jenjangServices.getJenjang(),
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addKelasJenjang = async (payload: IKelasJenjang) => {
    const res = await kelasJenjangServices.addKelas(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addKelasJenjang,
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

  const handleAddKelasJenjang = (data: IKelasJenjang) => mutateAddEvent(data);

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddKelasJenjang,

    dataJenjang,
  };
};

export default useAddKelasJenjang;
