import { ToasterContext } from "@/contexts/ToasterContext";
import useMultipleHandling from "@/hooks/useMultipleHandling";
import kegiatanServices from "@/services/kegiatan.service";
import { IKegiatanForm } from "@/types/Kegiatan";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";

const schemaUpdateDokumentasi = yup.object().shape({
  dokumentasi: yup
    .array()
    .of(yup.string().required())
    .min(1, "Please upload at least one image"),
});

const useDokumentasiTab = () => {
  const { setToaster } = useContext(ToasterContext);
  const params = useParams();
  const idKegiatan = params?.id as string | undefined;
  const {
    isPendingMutateUploadFiles,
    isPendingMutateDeleteFiles,

    handleUploadFile,
    handleDeleteFile,
  } = useMultipleHandling();

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaUpdateDokumentasi),
    defaultValues: {
      dokumentasi: [] as string[],
    },
  });
  const watchedImages = watch("dokumentasi");

  const preview: string[] = Array.isArray(watchedImages)
    ? watchedImages.filter((img): img is string => typeof img === "string")
    : watchedImages
      ? [watchedImages]
      : [];

  const handleUploadDok = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
  ) => {
    if (files.length === 0) return;
    const fileArray = Array.from(files);
    handleUploadFile(files, onChange, (fileUrls?: string[]) => {
      if (!fileUrls) return;

      const currentImages = getValues("dokumentasi") || [];

      setValue("dokumentasi", [...currentImages, ...fileUrls], {
        shouldValidate: true,
      });
    });
  };

  const handleDeleteSingleImage = (url: string) => {
    handleDeleteFile(url, () => {
      const currentImages = getValues("dokumentasi") || [];
      setValue(
        "dokumentasi",
        currentImages.filter((img) => img !== url),
        { shouldValidate: true },
      );
    });
  };

  const updateKegiatan = async (payload: IKegiatanForm) => {
    const { data } = await kegiatanServices.updateKegiatanDok(
      `${idKegiatan}`,
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateUpdateKegiatan,
    isPending: isPendingMutateUpdateKegiatan,
    isSuccess: isSuccessMutateUpdateKegiatan,
  } = useMutation({
    mutationFn: (payload: IKegiatanForm) => updateKegiatan(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message || "Terjadi kesalahan",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Update Kegiatan successfully",
      });
    },
  });

  const handleUpdateDok = (data: IKegiatanForm) => mutateUpdateKegiatan(data);

  return {
    handleDeleteSingleImage,
    handleUploadDok,
    isPendingMutateDeleteFiles,
    isPendingMutateUploadFiles,

    control,
    handleSubmitForm,
    errors,
    reset,

    preview,

    isPendingMutateUpdateKegiatan,
    isSuccessMutateUpdateKegiatan,
    handleUpdateDok,
  };
};

export default useDokumentasiTab;
