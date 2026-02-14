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

    dataDaerah,
    dataDesa,
    dataKelompok,
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
                      isInvalid={errors.daerahId !== undefined}
                      errorMessage={errors.daerahId?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search daerah here..."
                    >
                      {(daerah: IDaerah) => (
                        <AutocompleteItem key={`${daerah.id}`}>
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
                      isInvalid={errors.desaId !== undefined}
                      errorMessage={errors.desaId?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search desa here..."
                    >
                      {(desa: IDesa) => (
                        <AutocompleteItem key={`${desa.id}`}>
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
                      isInvalid={errors.kelompokId !== undefined}
                      errorMessage={errors.kelompokId?.message}
                      onSelectionChange={(value) => onChange(value)}
                      placeholder="Search kelompok here..."
                    >
                      {(kelompok: IKelompok) => (
                        <AutocompleteItem key={`${kelompok.id}`}>
                          {kelompok.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
              )}
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
