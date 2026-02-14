"use client";

import {
  Button,
  Input,
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
import { useEffect, useState } from "react";
import { AlertTriangle, Eye, EyeOff } from "lucide-react";

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
        <ModalContent className="m-4">
          <ModalHeader>Add User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-6">
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

              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-700">
                  Role & Access
                </h3>
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
                      {["KELOMPOK", "SUBKELOMPOK"].map((role) => (
                        <SelectItem key={role}>{role}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={onClose}
              disabled={disabledSubmit}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={disabledSubmit}>
              {isPendingMutateAddUser ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Add User"
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
