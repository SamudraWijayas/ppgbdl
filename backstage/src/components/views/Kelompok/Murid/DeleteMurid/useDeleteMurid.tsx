import { ToasterContext } from "@/contexts/ToasterContext";
import cabrawitServices from "@/services/caberawit.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteMurid = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteMurid = async (payload: number[]) => {
    return cabrawitServices.unassignWali(payload);
  };

  const {
    mutate: submitDeleteMurid,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: deleteMurid,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil menghapus murid",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "Gagal menghapus murid",
      });
    },
  });

  return {
    submitDeleteMurid,
    isPending,
    isSuccess,
  };
};

export default useDeleteMurid;
