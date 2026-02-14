import { useForm, useFieldArray } from "react-hook-form";
import { IRapor } from "@/types/Rapor";
import { ToasterContext } from "@/contexts/ToasterContext";
import raporServices from "@/services/rapor.service";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext, useEffect, useRef } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const schema = yup.object({
  kelasJenjangId: yup.string().required("Kelas Jenjang wajib diisi"),
  semester: yup.string().oneOf(["GANJIL", "GENAP"]).required(),
  raporItems: yup.array().of(
    yup.object({
      indikatorKelasId: yup.string().required(),
      status: yup.string().oneOf(["TUNTAS", "TIDAK_TUNTAS"]).required(),
      nilaiPengetahuan: yup.number().nullable(),
      nilaiKeterampilan: yup.number().nullable(),
    }),
  ),
});

const useAddRapor = () => {
  const { setToaster } = useContext(ToasterContext);
  const params = useParams();
  const id = params?.id as string;

  // Ambil indikator dari backend (backend baru: array indikator saja)
  const { data: dataIndikator } = useQuery({
    queryKey: ["Indikator", id],
    queryFn: async () => {
      const res = await raporServices.getRaporByCaberawit(id);
      return res.data.data; // ⬅️ AMBIL ARRAY-NYA
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      kelasJenjangId: "",
      raporItems: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "raporItems",
  });

  const populatedRef = useRef(false);

  // Auto-populate rapor dari backend
  useEffect(() => {
    if (!dataIndikator || populatedRef.current) return;

    populatedRef.current = true;
    remove();

    dataIndikator.forEach((ind: any) => {
      append({
        indikatorKelasId: ind.id,
        status: ind.status ?? "TIDAK_TUNTAS",
        nilaiPengetahuan: ind.nilaiPengetahuan ?? null,
        nilaiKeterampilan: ind.nilaiKeterampilan ?? null,
      });
    });
  }, [append, dataIndikator, remove]);

  const { mutate: mutateAddRapor, isPending: isPendingRapor } = useMutation({
    mutationFn: async (payload: IRapor) => {
      return await raporServices.addRapor(payload);
    },
    onError: (err) => {
      setToaster({
        type: "error",
        message: err.message || "Gagal menambah rapor",
      });
    },
    onSuccess: () => {
      setToaster({ type: "success", message: "Berhasil menambah rapor" });
      reset();
    },
  });

  const handleAddRapor = (data: any) => {
    const caberawitId = Number(id);

    const payload = {
      caberawitId,
      semester: data.semester,
      raporItems: data.raporItems.map((item: any) => ({
        indikatorKelasId: item.indikatorKelasId,
        kelasJenjangId: data.kelasJenjangId, // global input
        status: item.status ?? "TIDAK_TUNTAS",
        nilaiPengetahuan: item.nilaiPengetahuan ?? null,
        nilaiKeterampilan: item.nilaiKeterampilan ?? null,
      })),
    };

    mutateAddRapor(payload);
  };

  return {
    control,
    handleSubmit,
    errors,
    isPendingRapor,
    handleAddRapor,
    raporFields: fields,
  };
};

export default useAddRapor;
