import { ToasterContext } from "@/contexts/ToasterContext";
import cabrawitServices from "@/services/caberawit.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteGenerus = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteGenerus = async (id: string) => {
    const res = await cabrawitServices.deletecaberawit(id);
    return res;
  };

  const {
    mutate: mutateDeleteGenerus,
    isPending: isPendingMutateDeleteGenerus,
    isSuccess: isSuccessMutateDeleteGenerus,
  } = useMutation({
    mutationFn: deleteGenerus,
    onError: (error: Error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Generus deleted successfully",
      });
    },
  });

  return {
    mutateDeleteGenerus,
    isPendingMutateDeleteGenerus,
    isSuccessMutateDeleteGenerus,
  };
};

export default useDeleteGenerus;
