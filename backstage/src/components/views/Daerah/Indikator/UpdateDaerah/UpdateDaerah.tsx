import { IDaerah } from "@/types/Daerah";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import useUpdateDaerah from "./useUpdateDaerah";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchDaerah: () => void;
  selectedId: IDaerah | null;
  setSelectedId: Dispatch<SetStateAction<IDaerah | null>>;
}

const UpdateDaerah = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchDaerah,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    handleSubmitForm,
    handleUpdateDaerah,
    errors,
    setValueUpdateDaerah,
    isPendingMutateUpdateDaerah,
    reset,
    isSuccessMutateUpdateDaerah,
  } = useUpdateDaerah(`${selectedId?.id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateDaerah) {
      onClose();
      refetchDaerah();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateDaerah, onClose, refetchDaerah, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateDaerah("name", `${selectedId?.name}`);
    }
  }, [selectedId, setValueUpdateDaerah]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedId(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdateDaerah)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Daerah</ModalHeader>
          <ModalBody>
            {/* Form fields go here */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  variant="bordered"
                  type="text"
                  isInvalid={errors.name !== undefined}
                  errorMessage={errors.name?.message}
                  className="mb-2"
                />
              )}
            />
            <ModalFooter>
              <Button
                color="primary"
                variant="flat"
                onPress={handleOnClose}
                disabled={isPendingMutateUpdateDaerah}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingMutateUpdateDaerah}
              >
                {isPendingMutateUpdateDaerah ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Daerah"
                )}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateDaerah;
