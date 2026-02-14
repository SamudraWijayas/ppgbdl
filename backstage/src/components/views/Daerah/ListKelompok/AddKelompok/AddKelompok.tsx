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
import useAddKelompok from "./useAddKelompok";
import { IDesa } from "@/types/Desa";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKelompok: () => void;
}

const AddKelompok = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchKelompok } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddKelompok,

    dataDesa,
  } = useAddKelompok();
  console.log("Desa", dataDesa);

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchKelompok();
    }
  }, [isSuccessMutateAddEvent, onClose, refetchKelompok]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddKelompok)}>
        <ModalContent>
          <ModalHeader>Add Kelompok</ModalHeader>
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
              name="desaId"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataDesa?.data || []}
                  label="Desa"
                  variant="bordered"
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Pilih Desa..."
                >
                  {(desa: IDesa) => (
                    <AutocompleteItem key={`${desa.id}`}>
                      {desa.name}
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
                "Create Kelompok"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddKelompok;
