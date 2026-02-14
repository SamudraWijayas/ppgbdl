import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import generusServices from "@/services/generus.service";
import jenjangServices from "@/services/jenjang.service";
import kelasJenjangServices from "@/services/kelasJenjang.service";
import kelompokServices from "@/services/kelompok.service";
import { IGenerus } from "@/types/Generus";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  nama: yup.string().required("Please input name"),
  daerahId: yup.string().required("Please select daerah"),
  desaId: yup.string().required("Please select desa"),
  kelompokId: yup.string().required("Please select kelompok"),
  tgl_lahir: yup.string().required("Please input tanggal lahir"),
  jenjangId: yup.string().required("Please select jenjang"),
  kelasJenjangId: yup.string().required("Please select kelas Jenjang"),

  jenis_kelamin: yup.string().required("Please select jenis kelamin"),
  gol_darah: yup.string().required("Please select golongan darah"),
  nama_ortu: yup.string().required("Please input nama orang tua"),
  mahasiswa: yup.boolean().required("Please select status mahasiswa"),
  foto: yup.mixed<FileList | string>().required("Please input Foto"),
});

const useDetailGenerus = (id: string) => {
  const { setToaster } = useContext(ToasterContext);
  const [selectedDaerahId, setSelectedDaerahId] = useState<string | null>(null);
  const [selectedDesaId, setSelectedDesaId] = useState<string | null>(null);
  const isInitRef = useRef(true);

  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue: setValueUpdateGenerus,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Reset dependent fields
  useEffect(() => {
    if (!selectedDaerahId) return;
    if (isInitRef.current) return;

    // user ganti daerah
    setValueUpdateGenerus("desaId", "");
    setValueUpdateGenerus("kelompokId", "");
    setSelectedDesaId(null);
  }, [selectedDaerahId, setValueUpdateGenerus]);

  useEffect(() => {
    if (!selectedDesaId) return;
    if (isInitRef.current) return;

    // user ganti desa
    setValueUpdateGenerus("kelompokId", "");
  }, [selectedDesaId, setValueUpdateGenerus]);

  // Queries
  const { data: dataJenjang } = useQuery({
    queryKey: ["Jenjang"],
    queryFn: () => jenjangServices.getJenjang(),
  });

  const { data: dataKelasJenjang } = useQuery({
    queryKey: ["KelasJenjang"],
    queryFn: () => kelasJenjangServices.getKelas(),
  });

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => daerahServices.getDaerah(),
  });

  const { data: dataDesa } = useQuery({
    queryKey: ["Desa", selectedDaerahId],
    queryFn: async () => {
      if (!selectedDaerahId) return { data: { data: [] } };
      return await desaServices.getDesa(`daerahId=${selectedDaerahId}`);
    },
    enabled: !!selectedDaerahId,
  });

  const { data: dataKelompok } = useQuery({
    queryKey: ["Kelompok", selectedDesaId],
    queryFn: async () => {
      if (!selectedDesaId) return { data: { data: [] } };
      return await kelompokServices.getKelompok(`desaId=${selectedDesaId}`);
    },
    enabled: !!selectedDesaId,
  });

  const preview = watch("foto");
  const fileUrl = getValues("foto");
  const previewUrl =
    typeof preview === "string" &&
    preview.trim() !== "" &&
    preview !== "null" &&
    preview !== "undefined"
      ? `${
          process.env.NEXT_PUBLIC_IMAGE || process.env.NEXT_PUBLIC_API
        }${preview}`
      : undefined;

  const handleUploadFoto = (
    files: FileList,
    onChange: (value: string | FileList | null | undefined) => void,
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdateGenerus("foto", fileUrl);
      }
    });
  };

  const handleDeleteFoto = (
    onChange: (value: string | FileList | null | undefined) => void,
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  const handleOnClose = (onClose: () => void) => {
    handleDeleteFile(fileUrl, () => {
      reset();
      onClose();
    });
  };

  const updateGenerus = async (payload: IGenerus) => {
    const res = await generusServices.updateGenerus(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateGenerus,
    isPending: isPendingMutateUpdateGenerus,
    isSuccess: isSuccessMutateUpdateGenerus,
  } = useMutation({
    mutationFn: updateGenerus,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update Generus",
      });
    },
  });

  const handleUpdateGenerus = (data: IGenerus) => {
    mutateUpdateGenerus(data);
  };

  return {
    control,
    handleSubmitForm,
    errors,
    reset,
    setValueUpdateGenerus,
    updateGenerus,
    isPendingMutateUpdateGenerus,
    isSuccessMutateUpdateGenerus,
    handleUpdateGenerus,

    preview: previewUrl,
    handleUploadFoto,
    isPendingMutateUploadFile,
    handleDeleteFoto,
    isPendingMutateDeleteFile,
    handleOnClose,

    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,

    selectedDesaId,
    setSelectedDesaId,
    dataKelasJenjang,

    selectedDaerahId,
    setSelectedDaerahId,

    watch,
  };
};

export default useDetailGenerus;
