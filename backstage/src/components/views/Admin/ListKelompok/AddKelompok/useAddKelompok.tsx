import { ToasterContext } from "@/contexts/ToasterContext";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import kelompokServices from "@/services/kelompok.service";
import { IKelompok } from "@/types/Kelompok";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  daerahId: yup.string().required("Please select daerah"),
  desaId: yup.string().required("Please select desa"),
});
const useAddKelompok = () => {
  const { setToaster } = useContext(ToasterContext);
  const [selectedDaerahId, setSelectedDaerahId] = useState<string | null>(null);

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => daerahServices.getDaerah(),
  });

  // Desa tergantung pada daerah yang dipilih
  const { data: dataDesa } = useQuery({
    queryKey: ["Desa", selectedDaerahId],
    queryFn: async () => {
      if (!selectedDaerahId) return { data: { data: [] } }; // kalau belum pilih daerah
      const params = `daerahId=${selectedDaerahId}`;
      return await desaServices.getDesa(params);
    },
    enabled: !!selectedDaerahId, // hanya jalan kalau daerah sudah dipilih
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addKelompok = async (payload: IKelompok) => {
    const res = await kelompokServices.addKelompok(payload);
    return res;
  };

  const {
    mutate: mutateAddEvent,
    isPending: isPendingMutateAddEvent,
    isSuccess: isSuccessMutateAddEvent,
  } = useMutation({
    mutationFn: addKelompok,
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

  const handleAddKelompok = (data: IKelompok) => mutateAddEvent(data);

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddKelompok,

    dataDaerah,
    dataDesa,

    selectedDaerahId,
    setSelectedDaerahId,
  };
};

export default useAddKelompok;
