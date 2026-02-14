import { ToasterContext } from "@/contexts/ToasterContext";
import kegiatanServices from "@/services/kegiatan.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteKegiatan = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteKegiatan = async (id: string) => {
    const res = await kegiatanServices.deleteKegiatan(id);
    return res;
  };

  const {
    mutate: mutateDeleteKegiatan,
    isPending: isPendingMutateDeleteKegiatan,
    isSuccess: isSuccessMutateDeleteKegiatan,
  } = useMutation({
    mutationFn: deleteKegiatan,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "delete Kegiatan success",
      });
    },
  });

  return {
    mutateDeleteKegiatan,
    isPendingMutateDeleteKegiatan,
    isSuccessMutateDeleteKegiatan,
  };
};

export default useDeleteKegiatan;
