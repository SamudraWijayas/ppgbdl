import { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as yup from "yup";

import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import generusServices from "@/services/generus.service";
import jenjangServices from "@/services/jenjang.service";
import kelompokServices from "@/services/kelompok.service";
import { IGenerus } from "@/types/Generus";
import kelasJenjangServices from "@/services/kelasJenjang.service";

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
  foto: yup.mixed<FileList | string>().nullable(),
});

const useAddGenerus = () => {
  const { setToaster } = useContext(ToasterContext);
  const [selectedDaerahId, setSelectedDaerahId] = useState<string | null>(null);
  const [selectedDesaId, setSelectedDesaId] = useState<string | null>(null);
  const [selectedJenjangId, setSelectedJenjangId] = useState<string | null>(
    null,
  );
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
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Reset dependent fields
  useEffect(() => {
    if (selectedDaerahId) {
      // Reset desa & kelompok saat daerah berubah
      setValue("desaId", "");
      setValue("kelompokId", "");
      setSelectedDesaId(null);
    }
  }, [selectedDaerahId, setValue]);

  useEffect(() => {
    if (selectedDesaId) {
      // Reset kelompok saat desa berubah
      setValue("kelompokId", "");
    }
  }, [selectedDesaId, setValue]);

  useEffect(() => {
    if (selectedJenjangId) {
      // Reset kelasJenjangId saat jenjangId berubah
      setValue("kelasJenjangId", "");
    }
  }, [selectedJenjangId, setValue]);

  // Queries
  const { data: dataJenjang } = useQuery({
    queryKey: ["Jenjang"],
    queryFn: () => jenjangServices.getJenjang(),
  });

  const { data: dataKelasJenjang } = useQuery({
    queryKey: ["KelasJenjang", , selectedJenjangId],
    queryFn: async () => {
      if (!selectedJenjangId) return { data: { data: [] } };
      return await kelasJenjangServices.getKelas(
        `jenjangId=${selectedJenjangId}`,
      );
    },
    enabled: !!selectedJenjangId,
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
    typeof preview === "string"
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
        setValue("foto", fileUrl);
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

  const addGenerus = async (payload: IGenerus) => {
    const res = await generusServices.addGenerus(payload);
    return res;
  };

  const {
    mutate: mutateAddGenerus,
    isPending: isPendingMutateAddGenerus,
    isSuccess: isSuccessMutateAddGenerus,
  } = useMutation({
    mutationFn: addGenerus,
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

  const handleAddGenerus = (data: IGenerus) => {
    const payload = {
      ...data,
      foto: data.foto ?? undefined,
    };
    mutateAddGenerus(payload);
  };

  return {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddGenerus,
    isSuccessMutateAddGenerus,
    handleAddGenerus,

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

    selectedDaerahId,
    setSelectedDaerahId,
    dataKelasJenjang,
    selectedJenjangId,
    setSelectedJenjangId,

    setValue,
    watch,
  };
};

export default useAddGenerus;
