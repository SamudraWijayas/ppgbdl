import { ToasterContext } from "@/contexts/ToasterContext";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import jenjangServices from "@/services/jenjang.service";
import kegiatanServices from "@/services/kegiatan.service";
import kelompokServices from "@/services/kelompok.service";
import { IKegiatanForm } from "@/types/Kegiatan";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required("Nama kegiatan wajib diisi"),
  startDate: yup.date().required("Tanggal mulai wajib diisi"),
  endDate: yup.date().required("Tanggal akhir wajib diisi"),
  jenisKelamin: yup.string().required("Jenis Kelamin wajib diisi"),

  tingkat: yup
    .string()
    .oneOf(["DAERAH", "DESA", "KELOMPOK"])
    .required("Tingkat wajib diisi"),

  targetType: yup
    .string()
    .oneOf(["JENJANG", "MAHASISWA", "USIA"])
    .required("Target wajib dipilih"),

  daerahId: yup.string().nullable(),
  desaId: yup.string().nullable(),
  kelompokId: yup.string().nullable(),

  jenjangIds: yup
    .array()
    .of(yup.string().required()) // penting!
    .when("targetType", {
      is: "JENJANG",
      then: (schema) =>
        schema
          .min(1, "Minimal pilih satu jenjang sasaran")
          .required("Pilih minimal satu jenjang"),
      otherwise: (schema) => schema.optional(),
    }),

  minUsia: yup
    .number()
    .nullable()
    .when("targetType", {
      is: "USIA",
      then: (s) => s.required("Usia minimal wajib diisi"),
    }),

  maxUsia: yup
    .number()
    .nullable()
    .when("targetType", {
      is: "USIA",
      then: (s) => s.required("Usia maksimal wajib diisi"),
    }),
});

const useAddKegiatanModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => daerahServices.getDaerah(),
  });
  const { data: dataDesa } = useQuery({
    queryKey: ["Desa"],
    queryFn: () => desaServices.getDesa(),
  });
  const { data: dataKelompok } = useQuery({
    queryKey: ["Kelompok"],
    queryFn: () => kelompokServices.getKelompok(),
  });

  // jenjang
  const getJenjang = async () => {
    const { data } = await jenjangServices.getJenjang();
    return data.data;
  };

  const {
    data: dataJenjang,
    refetch: refetchJenjang,
    isPending: isPendingJenjang,
    isRefetching: isRefetchingJenjang,
  } = useQuery({
    queryKey: ["Jenjang"],
    queryFn: getJenjang,
  });

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const addKegiatan = async (payload: IKegiatanForm) => {
    const res = await kegiatanServices.addKegiatan(payload);
    return res;
  };

  const {
    mutate: mutateAddKegiatan,
    isPending: isPendingMutateAddKegiatan,
    isSuccess: isSuccessMutateAddKegiatan,
  } = useMutation({
    mutationFn: addKegiatan,
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

  const handleAddKEgiatan = (data: IKegiatanForm) => mutateAddKegiatan(data);

  return {
    control,
    handleSubmitForm,
    errors,
    watch,
    handleAddKEgiatan,
    isPendingMutateAddKegiatan,
    isSuccessMutateAddKegiatan,

    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,
    refetchJenjang,
    isPendingJenjang,
    isRefetchingJenjang,
  };
};

export default useAddKegiatanModal;
