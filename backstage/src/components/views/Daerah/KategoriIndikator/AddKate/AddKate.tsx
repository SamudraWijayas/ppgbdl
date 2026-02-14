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
import useAddKate from "./useAddKate";
import { IMapel } from "@/types/Mapel";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKate: () => void;
}

const AddKate = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchKate } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddKate,
    isSuccessMutateAddKate,
    handleAddKate,

    dataMapel,
  } = useAddKate();

  useEffect(() => {
    if (isSuccessMutateAddKate) {
      onClose();
      refetchKate();
    }
  }, [isSuccessMutateAddKate, onClose, refetchKate]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddKate)}>
        <ModalContent>
          <ModalHeader>Tambah Kate</ModalHeader>
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
              name="mataPelajaranId"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataMapel?.data.data || []}
                  label="Mata Pelajaran"
                  variant="bordered"
                  isInvalid={errors.mataPelajaranId !== undefined}
                  errorMessage={errors.mataPelajaranId?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search mapel here..."
                >
                  {(mapel: IMapel) => (
                    <AutocompleteItem key={`${mapel.id}`}>
                      {mapel.name}
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
              disabled={isPendingMutateAddKate}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateAddKate}
            >
              {isPendingMutateAddKate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Kate"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddKate;
