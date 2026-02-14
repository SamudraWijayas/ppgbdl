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
import { IMapel } from "@/types/Mapel";
import useUpdateMapel from "./useUpdateMapel";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchMapel: () => void;
  selectedId: IMapel | null;
  setSelectedId: Dispatch<SetStateAction<IMapel | null>>;
}

const UpdateMapel = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchMapel,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    handleSubmitForm,
    handleUpdateMapel,
    errors,
    setValueUpdateMapel,
    isPendingMutateUpdateMapel,
    reset,
    isSuccessMutateUpdateMapel,
  } = useUpdateMapel(`${selectedId?.id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateMapel) {
      onClose();
      refetchMapel();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateMapel, onClose, refetchMapel, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateMapel("name", `${selectedId?.name}`);
    }
  }, [selectedId, setValueUpdateMapel]);

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
      <form onSubmit={handleSubmitForm(handleUpdateMapel)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Mapel</ModalHeader>
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
                disabled={isPendingMutateUpdateMapel}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingMutateUpdateMapel}
              >
                {isPendingMutateUpdateMapel ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Mapel"
                )}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateMapel;
