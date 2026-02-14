import { ToasterContext } from "@/contexts/ToasterContext";
import useMediaHandling from "@/hooks/useMediaHandling";
import authServices from "@/services/auth.service";
import { IProfile } from "@/types/Auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";

const schemaUpdatePicture = yup.object().shape({
  avatar: yup.mixed<FileList | string>().required("Please input picture"),
});

const useProfile = () => {
  const { setToaster } = useContext(ToasterContext);

  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
  });

  const updateProfile = async (payload: IProfile) => {
    const { data } = await authServices.updateProfile(payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateProfile,
    isPending: isPendingMutateUpdateProfile,
    isSuccess: isSuccessMutateUpdateProfile,
  } = useMutation({
    mutationFn: (payload: IProfile) => updateProfile(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchProfile();
      setToaster({
        type: "success",
        message: "Success update profile",
      });
    },
  });

  const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data);

  //
  const {
    handleUploadFile,
    isPendingMutateUploadFile,
    handleDeleteFile,
    isPendingMutateDeleteFile,
  } = useMediaHandling();

  const {
    control: controlUpdatePicture,
    handleSubmit: handleSubmitUpdatePicture,
    formState: { errors: errorsUpdatePicture },
    reset: resetUpdatePicture,
    getValues: getValuesUpdatePicture,
    setValue: setValueUpdatePicture,
  } = useForm({
    resolver: yupResolver(schemaUpdatePicture),
  });

  const preview = useWatch({
    control: controlUpdatePicture,
    name: "avatar",
  });
  const fileUrl = getValuesUpdatePicture("avatar");
  const previewUrl =
    typeof preview === "string"
      ? `${
          process.env.NEXT_PUBLIC_IMAGE || process.env.NEXT_PUBLIC_API
        }${preview}`
      : "";

  console.log("Preview URL:", previewUrl);

  const handleUploadPicture = (
    files: FileList,
    onChange: (value: string | FileList | null | undefined) => void
  ) => {
    handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
      if (fileUrl) {
        setValueUpdatePicture("avatar", fileUrl);
      }
    });
  };

  const handleDeletePicture = (
    onChange: (files: FileList | undefined) => void
  ) => {
    handleDeleteFile(fileUrl, () => onChange(undefined));
  };

  return {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
    refetchProfile,

    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateDeleteFile,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    errorsUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,
    setValueUpdatePicture,

    preview: previewUrl,
  };
};

export default useProfile;
