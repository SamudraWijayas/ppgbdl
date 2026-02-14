"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { Check, X } from "lucide-react";
import useProfile from "./useProfile";
import { Skeleton, useDisclosure } from "@heroui/react";
import UpdateProfile from "./UpdateProfile/UpdateProfile";

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

  const updateProfile = useDisclosure();
  const [changeAvatar, setChangeAvatar] = useState<
    ((value: FileList | undefined) => void) | null
  >(null);

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
    <div className="flex justify-center">
      <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow">
        {/* COVER */}
        <div className="w-full h-40 bg-gray-200 rounded-t-lg">
          <Image
            src="/images/bg.png"
            className="w-full h-full rounded-t-lg"
            alt="cover"
            width={100}
            height={100}
          />
        </div>

        <div className="px-6 pb-6">
          <div className="-mt-12 relative w-fit group">
            {/* Image */}
            <Image
              src={
                preview
                  ? preview
                  : dataProfile?.photoProfile
                  ? `${process.env.NEXT_PUBLIC_IMAGE}${dataProfile.photoProfile}`
                  : "/images/profile.jpg"
              }
              alt="avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md cursor-pointer transition"
              width={100}
              height={100}
              onClick={triggerFileSelect}
            />

            <Controller
              name="avatar"
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
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        handleDeletePicture(() => {
                          onChange(undefined);
                          resetUpdatePicture();
                        });
                      }}
                      className="absolute cursor-pointer -bottom-2 -left-2 w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-700 transition-all"
                    >
                      <X size={14} />
                    </button>
                  )}
                  {preview && (
                    <button
                      type="button"
                      onClick={handleSubmitUpdatePicture(handleUpdateProfile)}
                      className="absolute cursor-pointer -bottom-2 -right-2 w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-700 transition-all"
                    >
                      <Check size={14} />
                    </button>
                  )}
                </>
              )}
            />
            {!preview && (
              <div
                className="absolute inset-0 rounded-full flex items-center text-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 cursor-pointer transition"
                onClick={triggerFileSelect}
              >
                <span className="text-white text-sm font-medium p-3">
                  Change Photo
                </span>
              </div>
            )}

            {isPendingMutateUploadFile && (
              <div className="absolute bottom-0 right-0 bg-white text-xs px-2 py-1 rounded shadow">
                Uploading...
              </div>
            )}
          </div>

          <div className="mt-2">
            {dataProfile?.fullName ? (
              <h1 className="text-2xl font-semibold">
                {dataProfile?.fullName}
              </h1>
            ) : (
              <Skeleton className="h-3 w-3/5 rounded-lg" />
            )}
            {dataProfile?.username ? (
              <p className="text-gray-600">@{dataProfile?.username}</p>
            ) : (
              <Skeleton className="h-3 w-3/5 rounded-lg" />
            )}
            <p className="text-gray-500 mt-1">
              <span className="font-semibold">
                {dataProfile?.role || "Role"}
              </span>
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex flex-col md:flex-row gap-3 mt-4">
            <button
              onClick={() => updateProfile.onOpen()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
      <UpdateProfile
        {...updateProfile}
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
