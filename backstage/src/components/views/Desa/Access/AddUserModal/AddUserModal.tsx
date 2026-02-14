"use client";

import {
  Autocomplete,
  AutocompleteItem,
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
import { useEffect } from "react";
import { IDaerah } from "@/types/Daerah";
import { IDesa } from "@/types/Desa";
import { IKelompok } from "@/types/Kelompok";

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
    reset,
    handleSubmitForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
    selectedRole,

  } = useAddUserModal();

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
            <div className="flex flex-col gap-3">
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Full Name"
                    isInvalid={!!errors.fullName}
                    errorMessage={errors.fullName?.message}
                  />
                )}
              />

              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Username"
                    isInvalid={!!errors.username}
                    errorMessage={errors.username?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Password"
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    label="Confirm Password"
                    isInvalid={!!errors.confirmPassword}
                    errorMessage={errors.confirmPassword?.message}
                  />
                )}
              />

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
                    {["DESA", "SUBDESA"].map((role) => (
                      <SelectItem key={role}>{role}</SelectItem>
                    ))}
                  </Select>
                )}
              />
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

export default AddUserModal;
