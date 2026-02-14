"use client";
import React from "react";
import { Input, Button } from "@heroui/react";
import { Lock } from "lucide-react";

const UpdatePassword = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-black/20 px-6">
      {/* Header */}
      <div className="flex flex-col items-center mb-10">
        <div className="p-3 bg-primary/10 rounded-full mb-3">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Ubah Password
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-sm">
          Pastikan password baru kamu kuat dan mudah diingat.
        </p>
      </div>

      {/* Form */}
      <div className="w-full max-w-sm flex flex-col gap-5">
        <Input
          label="Password Lama"
          type="password"
          placeholder="Masukkan password lama"
          radius="sm"
          variant="bordered"
        />
        <Input
          label="Password Baru"
          type="password"
          placeholder="Masukkan password baru"
          radius="sm"
          variant="bordered"
        />
        <Input
          label="Konfirmasi Password Baru"
          type="password"
          placeholder="Ulangi password baru"
          radius="sm"
          variant="bordered"
        />

        <Button color="primary" className="mt-4 w-full">
          Simpan Password
        </Button>
      </div>
    </div>
  );
};

export default UpdatePassword;
