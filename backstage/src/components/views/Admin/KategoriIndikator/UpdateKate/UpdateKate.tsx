import React, { Dispatch, SetStateAction, useEffect } from "react";
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
import { Controller } from "react-hook-form";
import useUpdateKate from "./useUpdateKate";
import { IKateIndikator } from "@/types/KategoriIndikator";
import { IMapel } from "@/types/Mapel";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKate: () => void;
  selectedId: IKateIndikator | null;
  setSelectedId: Dispatch<SetStateAction<IKateIndikator | null>>;
}

const UpdateKate = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchKate,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    handleSubmitForm,
    handleUpdateKate,
    errors,
    setValueUpdateKate,
    isPendingMutateUpdateKate,
    reset,
    isSuccessMutateUpdateKate,

    dataMapel,
  } = useUpdateKate(`${selectedId?.id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateKate) {
      onClose();
      refetchKate();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateKate, onClose, refetchKate, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateKate("name", `${selectedId?.name}`);
      setValueUpdateKate("mataPelajaranId", `${selectedId?.mataPelajaranId}`);
    }
  }, [selectedId, setValueUpdateKate]);

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
      <form onSubmit={handleSubmitForm(handleUpdateKate)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Kate</ModalHeader>
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
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataMapel?.data.data || []}
                  label="Mata Pelajaran"
                  labelPlacement="outside"
                  variant="bordered"
                  defaultSelectedKey={
                    value || selectedId?.mataPelajaranId || undefined
                  }
                  isInvalid={errors.mataPelajaranId !== undefined}
                  errorMessage={errors.mataPelajaranId?.message}
                  onSelectionChange={(val) => onChange(val)}
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

            <ModalFooter>
              <Button
                color="primary"
                variant="flat"
                onPress={handleOnClose}
                disabled={isPendingMutateUpdateKate}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingMutateUpdateKate}
              >
                {isPendingMutateUpdateKate ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Kate"
                )}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateKate;
