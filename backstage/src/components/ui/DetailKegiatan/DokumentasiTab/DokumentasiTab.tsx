import React from "react";
import useDokumentasiTab from "./useDokumentasiTab";
import { IDataKegiatan } from "@/types/Kegiatan";
import { Controller } from "react-hook-form";
import InputMultipleFile from "../../InputMultipleFile/InputMultipleFile";
import { Button, Skeleton, Spinner } from "@heroui/react";
import Image from "next/image";
import { X } from "lucide-react";

interface PropTypes {
  dataKegiatan: IDataKegiatan;
}



const DokumentasiTab = ({ dataKegiatan }: PropTypes) => {
  const {
    handleDeleteSingleImage,
    handleUploadDok,
    isPendingMutateDeleteFiles,
    isPendingMutateUploadFiles,

    control,
    handleSubmitForm,
    errors,
    preview,

    isPendingMutateUpdateKegiatan,
    handleUpdateDok,
  } = useDokumentasiTab();

  const currentDokUrls = dataKegiatan?.kegiatan?.dokumentasi ?? [];

  console.log("img", currentDokUrls);

  return (
    <div className="space-y-6">
      {/* CURRENT IMAGES */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">
          Current Documentation
        </p>
        {currentDokUrls.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentDokUrls.map((d) => {
              const imgSrc = process.env.NEXT_PUBLIC_IMAGE
                ? `${process.env.NEXT_PUBLIC_IMAGE.replace(/\/$/, "")}/${d.url.replace(/^\//, "")}`
                : d.url;

              return (
                <div
                  key={d.id}
                  className="relative overflow-hidden rounded-xl shadow hover:shadow-lg transition-all duration-300"
                >
                  <Skeleton
                    isLoaded={!!dataKegiatan}
                    className="aspect-video w-full"
                  >
                    <Image
                      src={imgSrc}
                      alt="Dokumentasi"
                      fill
                      className="object-cover rounded-xl"
                    />
                  </Skeleton>
                  <button
                    type="button"
                    onClick={() => handleDeleteSingleImage(d.url)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-red-500 hover:text-white text-gray-700 rounded-full p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-gray-100 w-full h-48 rounded-lg flex items-center justify-center text-gray-400">
            No documentation available
          </div>
        )}
      </div>

      {/* UPLOAD NEW FILES */}
      <form onSubmit={handleSubmitForm(handleUpdateDok)} className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Upload New Images
          </p>
          <Controller
            name="dokumentasi"
            control={control}
            render={({ field: { onChange } }) => (
              <InputMultipleFile
                name="dokumentasi"
                onUpload={(files) => handleUploadDok(files, onChange)}
                onDelete={(url) => handleDeleteSingleImage(url)}
                isUploading={isPendingMutateUploadFiles}
                isDeleting={isPendingMutateDeleteFiles}
                isInvalid={!!errors.dokumentasi}
                errorMessage={errors.dokumentasi?.message as string}
                isDropable
                preview={preview?.filter(
                  (url): url is string => typeof url === "string",
                )}
              />
            )}
          />
        </div>

        <Button
          color="primary"
          size="lg"
          className="rounded-xl px-6 font-medium shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
          type="submit"
          disabled={isPendingMutateUpdateKegiatan}
        >
          {isPendingMutateUpdateKegiatan ? (
            <Spinner size="sm" color="white" />
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
};

export default DokumentasiTab;
