import { ToasterContext } from "@/contexts/ToasterContext";
import useProfile from "@/hooks/useProfile";
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
});

const useAddDesa = () => {
  const { profile } = useProfile();
  const idDaerah = profile?.daerahId;
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addDesa = async (payload: IDesa) => {
    const res = await desaServices.addDesa(payload);
    return res;
  };

  const {
    mutate: mutateAddDesa,
    isPending: isPendingMutateAddDesa,
    isSuccess: isSuccessMutateAddDesa,
  } = useMutation({
    mutationFn: addDesa,
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

  const handleAddDesa = (data: IDesa) => {
    const payload = {
      ...data,
      daerahId: idDaerah,
    };
    mutateAddDesa(payload);
  };

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddDesa,
    isSuccessMutateAddDesa,
    handleAddDesa,

    dataDaerah,
  };
};

export default useAddDesa;
