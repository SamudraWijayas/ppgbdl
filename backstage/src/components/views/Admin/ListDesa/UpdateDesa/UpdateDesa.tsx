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
import useUpdateDesa from "./useUpdateDesa";
import { IDesa } from "@/types/Desa";
import { IDaerah } from "@/types/Daerah";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchDesa: () => void;
  selectedId: IDesa | null;
  setSelectedId: Dispatch<SetStateAction<IDesa | null>>;
}

const UpdateDesa = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchDesa,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    handleSubmitForm,
    handleUpdateDesa,
    errors,
    setValueUpdateDesa,
    isPendingMutateUpdateDesa,
    reset,
    isSuccessMutateUpdateDesa,

    dataDaerah,
  } = useUpdateDesa(`${selectedId?.id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateDesa) {
      onClose();
      refetchDesa();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateDesa, onClose, refetchDesa, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateDesa("name", `${selectedId?.name}`);
      setValueUpdateDesa("daerahId", `${selectedId?.daerahId}`);
    }
  }, [selectedId, setValueUpdateDesa]);

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
      <form onSubmit={handleSubmitForm(handleUpdateDesa)}>
        <ModalContent className="m-4">
          <ModalHeader>Update Desa</ModalHeader>
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
              render={({ field: { onChange, value, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataDaerah?.data.data || []}
                  label="Daerah"
                  labelPlacement="outside"
                  variant="bordered"
                  defaultSelectedKey={
                    value || selectedId?.daerahId || undefined
                  }
                  isInvalid={errors.daerahId !== undefined}
                  errorMessage={errors.daerahId?.message}
                  onSelectionChange={(val) => onChange(val)}
                  placeholder="Search daerah here..."
                >
                  {(daerah: IDaerah) => (
                    <AutocompleteItem key={`${daerah.id}`}>
                      {daerah.name}
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
                disabled={isPendingMutateUpdateDesa}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                disabled={isPendingMutateUpdateDesa}
              >
                {isPendingMutateUpdateDesa ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Desa"
                )}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateDesa;
