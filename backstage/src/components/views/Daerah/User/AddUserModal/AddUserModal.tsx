"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useAddUserModal from "./useAddUserModal";
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import { IDaerah } from "@/types/Daerah";
import { IDesa } from "@/types/Desa";
import { IKelompok } from "@/types/Kelompok";
import { AlertTriangle } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
}

const AddUserModal = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchUser,
}: PropTypes) => {
  const {
    control,
    errors,
    handleSubmitForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
    selectedRole,

    dataDaerah,
    dataDesa,
    dataKelompok,
  } = useAddUserModal();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isSuccessMutateAddUser) {
      onClose();
      refetchUser();
    }
  }, [isSuccessMutateAddUser, onClose, refetchUser]);

  const disabledSubmit = isPendingMutateAddUser;

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <form onSubmit={handleSubmitForm(handleAddUser)}>
        <ModalContent className="m-4 rounded-xl">
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-gray-800">
              Tambah Pengguna Baru
            </h2>
            {/* <p className="text-sm text-gray-500">
              Create user account and assign access level
            </p> */}
          </ModalHeader>

          <ModalBody>
            <div className="flex flex-col gap-6">
              {/* ================= ACCOUNT INFO ================= */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Informasi Akun
                </h3>

                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <InputWrapper
                      label="Nama Lengkap"
                      error={errors.fullName?.message}
                    >
                      <input
                        {...field}
                        placeholder="Masukkan nama lengkap"
                        className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
            ${
              errors.fullName
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
                      />
                    </InputWrapper>
                  )}
                />

                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <InputWrapper
                      label="Username"
                      error={errors.username?.message}
                    >
                      <input
                        {...field}
                        placeholder="Masukkan username"
                        className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
            ${
              errors.username
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
                      />
                    </InputWrapper>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Password"
                        error={errors.password?.message}
                      >
                        <div className="relative">
                          <input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className={`w-full rounded-md border px-3 py-2 pr-10 text-sm outline-none transition
            ${
              errors.password
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
                          />

                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </InputWrapper>
                    )}
                  />

                  <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <InputWrapper
                        label="Konfirmasi Password"
                        error={errors.confirmPassword?.message}
                      >
                        <div className="relative">
                          <input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Ulangi password"
                            className={`w-full rounded-md border px-3 py-2 pr-10 text-sm outline-none transition
            ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-1 focus:ring-red-500"
                : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            }`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showConfirmPassword ? (
                              <EyeOff size={18} />
                            ) : (
                              <Eye size={18} />
                            )}
                          </button>
                        </div>
                      </InputWrapper>
                    )}
                  />
                </div>
              </div>

              {/* ================= ROLE & ACCESS ================= */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Role & Access
                </h3>

                {/* Alert */}
                <div className="flex items-start gap-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-700">
                  <AlertTriangle size={18} className="mt-0.5" />
                  <span>
                    Role <b>SUB</b> memiliki akses terbatas sesuai induknya.
                  </span>
                </div>

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Role"
                      variant="bordered"
                      isInvalid={!!errors.role}
                      errorMessage={errors.role?.message}
                      disallowEmptySelection
                    >
                      {[
                        "SUPERADMIN",
                        "ADMIN",
                        "DAERAH",
                        "SUBDAERAH",
                        "DESA",
                        "SUBDESA",
                        "KELOMPOK",
                        "SUBKELOMPOK",
                      ].map((role) => (
                        <SelectItem key={role}>{role}</SelectItem>
                      ))}
                    </Select>
                  )}
                />

                {/* ================= CONDITIONAL SCOPE ================= */}

                {["DAERAH", "SUBDAERAH"].includes(selectedRole) && (
                  <Controller
                    name="daerahId"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataDaerah?.data.data || []}
                        label="Daerah"
                        variant="bordered"
                        isInvalid={!!errors.daerahId}
                        errorMessage={errors.daerahId?.message}
                        onSelectionChange={onChange}
                        placeholder="Pilih daerah..."
                      >
                        {(daerah: IDaerah) => (
                          <AutocompleteItem key={daerah.id}>
                            {daerah.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                )}

                {["DESA", "SUBDESA"].includes(selectedRole) && (
                  <Controller
                    name="desaId"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataDesa?.data.data || []}
                        label="Desa"
                        variant="bordered"
                        isInvalid={!!errors.desaId}
                        errorMessage={errors.desaId?.message}
                        onSelectionChange={onChange}
                        placeholder="Pilih desa..."
                      >
                        {(desa: IDesa) => (
                          <AutocompleteItem key={desa.id}>
                            {desa.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                )}

                {["KELOMPOK", "SUBKELOMPOK"].includes(selectedRole) && (
                  <Controller
                    name="kelompokId"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataKelompok?.data.data || []}
                        label="Kelompok"
                        variant="bordered"
                        isInvalid={!!errors.kelompokId}
                        errorMessage={errors.kelompokId?.message}
                        onSelectionChange={onChange}
                        placeholder="Pilih kelompok..."
                      >
                        {(kelompok: IKelompok) => (
                          <AutocompleteItem key={kelompok.id}>
                            {kelompok.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                )}
              </div>
            </div>
          </ModalBody>

          <ModalFooter className="flex justify-end gap-2">
            <Button variant="light" onPress={onClose} disabled={disabledSubmit}>
              Batal
            </Button>

            <Button color="primary" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddUser ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Pengguna"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

const InputWrapper = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    {children}
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

export default AddUserModal;
