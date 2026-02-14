import { ToasterContext } from "@/contexts/ToasterContext";
import desaServices from "@/services/desa.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteDesa = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteDesa = async (id: string) => {
    const res = await desaServices.deleteDesa(id);
    return res;
  }

  const {
    mutate: mutateDeleteDesa,
    isPending: isPendingMutateDeleteDesa,
    isSuccess: isSuccessMutateDeleteDesa,
  } = useMutation({
    mutationFn: deleteDesa,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "delete Desa success",
      });
    },
  })

  return {
    mutateDeleteDesa,
    isPendingMutateDeleteDesa,
    isSuccessMutateDeleteDesa,
  };
};

export default useDeleteDesa;
