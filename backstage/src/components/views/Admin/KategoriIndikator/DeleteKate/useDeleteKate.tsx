import { ToasterContext } from "@/contexts/ToasterContext";
import KateServices from "@/services/kateindikator.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteKate = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteKate = async (id: string) => {
    const res = await KateServices.deleteKate(id);
    return res;
  }

  const {
    mutate: mutateDeleteKate,
    isPending: isPendingMutateDeleteKate,
    isSuccess: isSuccessMutateDeleteKate,
  } = useMutation({
    mutationFn: deleteKate,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "delete Kate success",
      });
    },
  })

  return {
    mutateDeleteKate,
    isPendingMutateDeleteKate,
    isSuccessMutateDeleteKate,
  };
};

export default useDeleteKate;
