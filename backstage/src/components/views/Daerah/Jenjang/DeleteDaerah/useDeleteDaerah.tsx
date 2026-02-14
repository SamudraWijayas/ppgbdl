import { ToasterContext } from "@/contexts/ToasterContext";
import daerahServices from "@/services/daerah.service";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";

const useDeleteDaerah = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteDaerah = async (id: string) => {
    const res = await daerahServices.deleteDaerah(id);
    return res;
  }

  const {
    mutate: mutateDeleteDaerah,
    isPending: isPendingMutateDeleteDaerah,
    isSuccess: isSuccessMutateDeleteDaerah,
  } = useMutation({
    mutationFn: deleteDaerah,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete daerah success",
      });
    },
  })

  return {
    mutateDeleteDaerah,
    isPendingMutateDeleteDaerah,
    isSuccessMutateDeleteDaerah,
  };
};

export default useDeleteDaerah;
