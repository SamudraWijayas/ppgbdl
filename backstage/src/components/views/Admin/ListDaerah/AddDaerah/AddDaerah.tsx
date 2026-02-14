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
import React, { useEffect } from "react";
import useAddDaerah from "./useAddDaerah";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchDaerah: () => void;
}

const AddDaerah = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchDaerah } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddDaerah,
  } = useAddDaerah();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchDaerah();
    }
  }, [isSuccessMutateAddEvent, onClose, refetchDaerah]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddDaerah)}>
        <ModalContent>
          <ModalHeader>Tambah Daerah</ModalHeader>
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
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={onClose}
              disabled={isPendingMutateAddEvent}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateAddEvent}
            >
              {isPendingMutateAddEvent ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Daerah"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddDaerah;
