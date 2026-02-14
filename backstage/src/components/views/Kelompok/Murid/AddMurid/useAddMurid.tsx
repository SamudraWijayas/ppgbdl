import { ToasterContext } from "@/contexts/ToasterContext";
import useProfile from "@/hooks/useProfile";
import cabrawitServices from "@/services/caberawit.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";

const useAddMurid = (onSuccessCallback?: () => void) => {
  const { setToaster } = useContext(ToasterContext);
  const { profile } = useProfile();

  const idGuru = profile?.id;
  const idKelompok = profile?.kelompokId;
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  /* ================= GET DATA ================= */
  const getCaberawit = async () => {
    const params = `limit=999`;
    const res = await cabrawitServices.getCaberawitByKelompok(
      idKelompok,
      params,
    );
    return res.data;
  };

  const {
    data: dataGenerus,
    isLoading: isLoadingGenerus,
    refetch,
  } = useQuery({
    queryKey: ["Caberawit", idKelompok],
    queryFn: getCaberawit,
    enabled: !!idKelompok,
  });

  /* ================= TOGGLE CHECKBOX ================= */
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  /* ================= MUTATION ================= */
  const addMurid = async (payload: number[]) => {
    return cabrawitServices.assignwali(payload);
  };

  const { mutate: submitAddMurid, isPending: isPendingAddMurid } = useMutation({
    mutationFn: addMurid,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Berhasil menambahkan murid",
      });
      setSelectedIds([]);
      refetch();
      onSuccessCallback?.();
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error?.message || "Gagal menambahkan murid",
      });
    },
  });

  return {
    dataGenerus,
    isLoadingGenerus,

    selectedIds,
    toggleSelect,

    submitAddMurid,
    isPendingAddMurid,
    idGuru,
  };
};

export default useAddMurid;
