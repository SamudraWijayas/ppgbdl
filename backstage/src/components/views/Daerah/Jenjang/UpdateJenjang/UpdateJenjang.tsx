import React, { Dispatch, SetStateAction, useEffect } from "react";
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
import { IJenjang } from "@/types/Jenjang";
import useUpdateJenjang from "./useUpdateJenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchJenjang: () => void;
  selectedId: IJenjang | null;
  setSelectedId: Dispatch<SetStateAction<IJenjang | null>>;
}

const UpdateJenjang = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchJenjang,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    handleSubmitForm,
    handleUpdateJenjang,
    errors,
    setValueUpdateJenjang,
    isPendingMutateUpdateJenjang,
    reset,
    isSuccessMutateUpdateJenjang,
  } = useUpdateJenjang(`${selectedId?.id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateJenjang) {
      onClose();
      refetchJenjang();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateJenjang, onClose, refetchJenjang, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateJenjang("name", `${selectedId?.name}`);
    }
  }, [selectedId, setValueUpdateJenjang]);

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
      <form onSubmit={handleSubmitForm(handleUpdateJenjang)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Jenjang</ModalHeader>
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
                disabled={isPendingMutateUpdateJenjang}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingMutateUpdateJenjang}
              >
                {isPendingMutateUpdateJenjang ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Jenjang"
                )}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateJenjang;
