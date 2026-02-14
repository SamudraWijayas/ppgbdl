import { ToasterContext } from "@/contexts/ToasterContext";
import kelompokServices from "@/services/kelompok.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteKelompok = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteKelompok = async (id: string) => {
    const res = await kelompokServices.deleteKelompok(id);
    return res;
  }

  const {
    mutate: mutateDeleteKelompok,
    isPending: isPendingMutateDeleteKelompok,
    isSuccess: isSuccessMutateDeleteKelompok,
  } = useMutation({
    mutationFn: deleteKelompok,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Delete Kelompok success",
      });
    },
  })

  return {
    mutateDeleteKelompok,
    isPendingMutateDeleteKelompok,
    isSuccessMutateDeleteKelompok,
  };
};

export default useDeleteKelompok;
