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
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import useAddIndikator from "./useAddIndikator";
import { IKateIndikator } from "@/types/KategoriIndikator";
import { IKelasJenjang } from "@/types/KelasJenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchIndikator: () => void;
}

const AddIndikator = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchIndikator } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddIndikator,
    isSuccessMutateAddIndikator,
    handleAddIndikator,

    dataKelas,
    dataKategori,
  } = useAddIndikator();

  useEffect(() => {
    if (isSuccessMutateAddIndikator) {
      onClose();
      refetchIndikator();
    }
  }, [isSuccessMutateAddIndikator, onClose, refetchIndikator]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitForm(handleAddIndikator)}>
        <ModalContent>
          <ModalHeader>Add Indikator</ModalHeader>
          <ModalBody>
            {/* Form fields go here */}
            <Controller
              name="indikator"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="Name"
                  variant="bordered"
                  type="text"
                  isInvalid={errors.indikator !== undefined}
                  errorMessage={errors.indikator?.message}
                  className="mb-2"
                />
              )}
            />

            <Controller
              name="kelasJenjangId"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataKelas?.data.data || []}
                  label="Kelas"
                  variant="bordered"
                  isInvalid={errors.kelasJenjangId !== undefined}
                  errorMessage={errors.kelasJenjangId?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Pilih kelas..."
                >
                  {(kelas: IKelasJenjang) => (
                    <AutocompleteItem key={`${kelas.id}`}>
                      {kelas.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />
            <Controller
              name="kategoriIndikatorId"
              control={control}
              render={({ field: { onChange, ...field } }) => (
                <Autocomplete
                  {...field}
                  defaultItems={dataKategori?.data.data || []}
                  label="Kategori"
                  variant="bordered"
                  isInvalid={errors.kategoriIndikatorId !== undefined}
                  errorMessage={errors.kategoriIndikatorId?.message}
                  onSelectionChange={(value) => onChange(value)}
                  placeholder="Pilih Kategori..."
                >
                  {(Kate: IKateIndikator) => (
                    <AutocompleteItem key={`${Kate.id}`}>
                      {Kate.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              )}
            />

            <Controller
              name="semester"
              control={control}
              render={({ field }) => (
                <Select
                  label="Semester"
                  variant="bordered"
                  labelPlacement="outside"
                  selectedKeys={[field.value]}
                  onSelectionChange={(value) =>
                    field.onChange(Array.from(value)[0])
                  }
                >
                  <SelectItem key="GANJIL">Ganjil</SelectItem>
                  <SelectItem key="GENAP">Genap</SelectItem>
                </Select>
              )}
            />
            <Controller
              name="jenisPenilaian"
              control={control}
              render={({ field }) => (
                <Select
                  label="Jenis Penilaian"
                  variant="bordered"
                  labelPlacement="outside"
                  selectedKeys={[field.value]}
                  onSelectionChange={(value) =>
                    field.onChange(Array.from(value)[0])
                  }
                >
                  <SelectItem key="PENGETAHUAN">Pengetahuan</SelectItem>
                  <SelectItem key="KETERAMPILAN">Keterampilan</SelectItem>
                  <SelectItem key="KEDUANYA">Keduanya</SelectItem>
                </Select>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={onClose}
              disabled={isPendingMutateAddIndikator}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateAddIndikator}
            >
              {isPendingMutateAddIndikator ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Create Indikator"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default AddIndikator;
