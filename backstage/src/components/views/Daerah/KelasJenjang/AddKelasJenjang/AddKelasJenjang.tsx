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
import useAddKelasJenjang from "./useAddKelasJenjang";
import { IJenjang } from "@/types/Jenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKelasJenjang: () => void;
}

const AddKelasJenjang = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchKelasJenjang } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddEvent,
    isSuccessMutateAddEvent,
    handleAddKelasJenjang,

    dataJenjang,
  } = useAddKelasJenjang();

  useEffect(() => {
    if (isSuccessMutateAddEvent) {
      onClose();
      refetchKelasJenjang();
    }
  }, [isSuccessMutateAddEvent, onClose, refetchKelasJenjang]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddKelasJenjang)}>
        <ModalContent>
          <ModalHeader>Tambah KelasJenjang</ModalHeader>
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
              name="jenjangId"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataJenjang?.data.data || []}
                  label="Category"
                  variant="bordered"
                  isInvalid={errors.jenjangId !== undefined}
                  errorMessage={errors.jenjangId?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Search category here..."
                >
                  {(jenjang: IJenjang) => (
                    <AutocompleteItem key={`${jenjang.id}`}>
                      {jenjang.name}
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
                "Tambah KelasJenjang"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddKelasJenjang;
