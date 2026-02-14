import { ToasterContext } from "@/contexts/ToasterContext";
import mapelServices from "@/services/mapel.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteMapel = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteMapel = async (id: string) => {
    const res = await mapelServices.deleteMapel(id);
    return res;
  }

  const {
    mutate: mutateDeleteMapel,
    isPending: isPendingMutateDeleteMapel,
    isSuccess: isSuccessMutateDeleteMapel,
  } = useMutation({
    mutationFn: deleteMapel,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Mapel success",
      });
    },
  })

  return {
    mutateDeleteMapel,
    isPendingMutateDeleteMapel,
    isSuccessMutateDeleteMapel,
  };
};

export default useDeleteMapel;
