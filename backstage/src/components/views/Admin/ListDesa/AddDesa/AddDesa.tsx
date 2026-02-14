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
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddDesa from "./useAddDesa";
import { IDaerah } from "@/types/Daerah";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchDesa: () => void;
}

const AddDesa = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchDesa } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddDesa,

    dataDaerah,
  } = useAddDesa();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchDesa();
    }
  }, [isSuccessMutateAddEvent, onClose, refetchDesa]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddDesa)}>
        <ModalContent>
          <ModalHeader>Tambah Desa</ModalHeader>
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
            <Controller
              name="daerahId"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataDaerah?.data.data || []}
                  label="Category"
                  variant="bordered"
                  isInvalid={errors.daerahId !== undefined}
                  errorMessage={errors.daerahId?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search category here..."
                >
                  {(daerah: IDaerah) => (
                    <AutocompleteItem key={`${daerah.id}`}>
                      {daerah.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
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
                "Tambah Desa"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddDesa;
