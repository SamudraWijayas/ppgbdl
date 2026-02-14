import { ToasterContext } from "@/contexts/ToasterContext";
import uploadServices from "@/services/upload.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useMultipleHandling = () => {
  const { setToaster } = useContext(ToasterContext);

  const uploadFiles = async (
    files: File[],
    callback: (fileUrls: string[]) => void,
  ) => {
    const formData = new FormData();
    files.forEach(file => formData.append("files", file));
    const { data: { data } } = await uploadServices.uploadMultipleFile(formData);
    const fileUrls = data.map((d: { url: string }) => d.url);
    callback(fileUrls);
  };

  const { mutate: mutateUploadFiles, isPending: isPendingMutateUploadFiles } =
    useMutation({
      mutationFn: (variables: {
        files: File[];
        callback: (fileUrls: string[]) => void;
      }) => uploadFiles(variables.files, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  const deleteFiles = async (
    fileUrls: string | string[],
    callback: () => void,
  ) => {
    const urls = Array.isArray(fileUrls) ? fileUrls : [fileUrls];
    const deletePromises = urls.map(async (url) => {
      const res = await uploadServices.deleteFileMultiple({ fileUrl: url });
      return res.data.meta.status === 200;
    });
    const results = await Promise.all(deletePromises);
    if (results.every(Boolean)) {
      callback();
    }
  };

  const { mutate: mutateDeleteFiles, isPending: isPendingMutateDeleteFiles } =
    useMutation({
      mutationFn: (variables: {
        fileUrls: string | string[];
        callback: () => void;
      }) => deleteFiles(variables.fileUrls, variables.callback),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
    });

  const handleUploadFile = (
    files: FileList,
    onChange: (files: FileList | undefined) => void,
    callback: (fileUrls?: string[]) => void,
  ) => {
    if (files.length !== 0) {
      const fileArray = Array.from(files);
      mutateUploadFiles({
        files: fileArray,
        callback,
      });
    }
  };

  const handleDeleteFile = (
    fileUrls: string | string[] | FileList | undefined,
    callback: () => void,
  ) => {
    if (typeof fileUrls === "string" || Array.isArray(fileUrls)) {
      mutateDeleteFiles({ fileUrls, callback });
    } else {
      callback();
    }
  };

  return {
    mutateUploadFiles,
    isPendingMutateUploadFiles,
    mutateDeleteFiles,
    isPendingMutateDeleteFiles,

    handleUploadFile,
    handleDeleteFile,
  };
};

export default useMultipleHandling;
