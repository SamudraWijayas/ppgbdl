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
import { Controller } from "react-hook-form";
import useAddJenjang from "./useAddJenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchJenjang: () => void;
}

const AddJenjang = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchJenjang } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddJenjang,
  } = useAddJenjang();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchJenjang();
    }
  }, [isSuccessMutateAddEvent, onClose, refetchJenjang]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddJenjang)}>
        <ModalContent>
          <ModalHeader>Tambah Jenjang</ModalHeader>
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
                "Tambah Jenjang"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddJenjang;
