"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button, Divider, useDisclosure } from "@heroui/react";
import ProfileDrawer from "./ProfileDrawer";
import useProfile from "./useProfile";
import { Camera, Check, X } from "lucide-react";
import { Controller } from "react-hook-form";

const Profile = () => {
  const {
    dataProfile,
    handleUpdateProfile,
    isPendingMutateUpdateProfile,
    isSuccessMutateUpdateProfile,
    refetchProfile,

    handleDeletePicture,
    handleUploadPicture,
    isPendingMutateUploadFile,

    controlUpdatePicture,
    handleSubmitUpdatePicture,
    resetUpdatePicture,

    preview,
  } = useProfile();

  const UpdateProfile = useDisclosure();

  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const triggerFileSelect = () => {
    inputFileRef.current?.click();
  };

  const onSelectNewAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    handleUploadPicture(files, () => {
      refetchProfile();
    });
  };

  useEffect(() => {
    if (isSuccessMutateUpdateProfile) {
      resetUpdatePicture();
      refetchProfile();
    }
  }, [isSuccessMutateUpdateProfile, refetchProfile, resetUpdatePicture]);
  return (
    <div className="px-4 pt-17.5 min-h-screen bg-white dark:bg-black/10">
      <div className="flex flex-col gap-4 items-center">
        <div className="relative w-fit group">
          {/* Avatar */}
          <Image
            src={
              preview
                ? preview
                : dataProfile?.foto
                  ? `${process.env.NEXT_PUBLIC_IMAGE}${dataProfile.foto}`
                  : "/profil.jpg"
            }
            width={200}
            height={200}
            alt="profile"
            unoptimized
            onClick={triggerFileSelect}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md cursor-pointer transition"
          />

          {/* Icon Kamera (default) */}
          {!preview && (
            <div className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md pointer-events-none z-10">
              <Camera size={14} />
            </div>
          )}
          <Controller
            name="foto"
            control={controlUpdatePicture}
            render={({ field: { onChange, value, ...field } }) => (
              <>
                <input
                  {...field}
                  ref={inputFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSelectNewAvatar}
                />

                {/* Delete */}
                {preview && (
                  <button
                    type="button"
                    onClick={() => {
                      handleDeletePicture(() => {
                        onChange(undefined);
                        resetUpdatePicture();
                      });
                    }}
                    className="absolute -bottom-2 -left-2 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-700 transition-all"
                  >
                    <X size={14} />
                  </button>
                )}

                {/* Save */}
                {preview && (
                  <button
                    type="button"
                    onClick={handleSubmitUpdatePicture(handleUpdateProfile)}
                    className="absolute -bottom-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-all"
                  >
                    <Check size={14} />
                  </button>
                )}
              </>
            )}
          />

          {/* Hover Overlay */}
          {!preview && (
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 cursor-pointer transition"
              onClick={triggerFileSelect}
            >
              <span className="text-white text-xs font-medium">
                Change Photo
              </span>
            </div>
          )}

          {/* Uploading indicator */}
          {isPendingMutateUploadFile && (
            <div className="absolute bottom-0 right-0 bg-white text-xs px-2 py-1 rounded shadow">
              Uploading...
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-0">
          <h1 className="font-bold text-lg"> {dataProfile?.nama}</h1>
          <span className="text-gray-600 dark:text-gray-400">
            {dataProfile?.desa.name}
          </span>
        </div>
      </div>
      <div className="pt-10">
        <div className="flex flex-col gap-0">
          <span className="text-gray-600 dark:text-gray-400">Kelompok</span>
          <span className="dark:text-white text-black">
            {dataProfile?.kelompok.name}
          </span>
        </div>
        <Divider className="h-px my-2 bg-gray-200 dark:bg-gray-600" />
        <div className="flex flex-col gap-0">
          <span className="text-gray-600 dark:text-gray-400">
            Jenis Kelamin
          </span>
          <span className="dark:text-white text-black">
            {" "}
            {dataProfile?.jenis_kelamin}
          </span>
        </div>
        <Divider className="h-px my-2 bg-gray-200 dark:bg-gray-600" />
      </div>
      <Button
        color="primary"
        className="w-full mt-7"
        onPress={UpdateProfile.onOpen}
      >
        Edit Profil
      </Button>
      <ProfileDrawer
        {...UpdateProfile}
        dataProfile={dataProfile}
        onUpdate={handleUpdateProfile}
        isPendingUpdate={isPendingMutateUpdateProfile}
        isSuccessUpdate={isSuccessMutateUpdateProfile}
        refetchProfile={refetchProfile}
      />
    </div>
  );
};

export default Profile;
