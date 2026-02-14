"use client";

import { useEffect } from "react";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import InputFile from "@/components/ui/InputFile";
import useAddGenerus from "./useAddGenerus";
import { IDaerah } from "@/types/Daerah";
import { IDesa } from "@/types/Desa";
import { IKelompok } from "@/types/Kelompok";
import { IJenjang } from "@/types/Jenjang";
import { AlertTriangle } from "lucide-react";
import { IKelasJenjang } from "@/types/KelasJenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchGenerus: () => void;
}

const AddCaberawit = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchGenerus,
}: PropTypes) => {
  const {
    control,
    handleSubmitForm,
    errors,
    isPendingMutateAddGenerus,
    isSuccessMutateAddGenerus,
    handleAddGenerus,
    preview,
    handleUploadFoto,
    isPendingMutateUploadFile,
    handleDeleteFoto,
    isPendingMutateDeleteFile,
    handleOnClose,
    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,
    dataKelas,
    selectedDesaId,
    setSelectedDesaId,
    selectedJenjangId,
    setSelectedJenjangId,
    selectedDaerahId,
    setSelectedDaerahId,
    setValue,
  } = useAddGenerus();

  useEffect(() => {
    if (isSuccessMutateAddGenerus) {
      onClose();
      refetchGenerus();
    }
  }, [isSuccessMutateAddGenerus, onClose, refetchGenerus]);

  const disabledSubmit =
    isSuccessMutateAddGenerus ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="relative z-[10001] flex h-full w-full flex-col overflow-x-hidden bg-gray-100 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-[100] flex items-center justify-between bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">
            Tambah Generus
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleOnClose(onClose)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={disabledSubmit}
            >
              Batal
            </button>
            <button
              type="submit"
              form="addGenerusForm"
              disabled={disabledSubmit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPendingMutateAddGenerus ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Generus"
              )}
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mx-auto max-w-3xl space-y-6">
          <form
            id="addGenerusForm"
            onSubmit={handleSubmitForm(handleAddGenerus)}
            className="flex flex-1 flex-col p-6"
          >
            <div className="flex flex-col gap-6">
              {/* Biodata */}
              <section className="space-y-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
                <div className="mb-10">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Biodata Generus
                  </h3>
                  <Divider className="my-4" />
                </div>

                <Controller
                  name="nama"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Nama Lengkap"
                      labelPlacement="outside"
                      placeholder="Masukkan nama lengkap"
                      variant="bordered"
                      isInvalid={!!errors.nama}
                      errorMessage={errors.nama?.message}
                    />
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Controller
                    name="tgl_lahir"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="date"
                        label="Tanggal Lahir"
                        labelPlacement="outside"
                        variant="bordered"
                        isInvalid={!!errors.tgl_lahir}
                        errorMessage={errors.tgl_lahir?.message}
                      />
                    )}
                  />

                  <Controller
                    name="jenis_kelamin"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Jenis Kelamin"
                        variant="bordered"
                        labelPlacement="outside"
                        selectedKeys={[field.value]}
                        onSelectionChange={(value) =>
                          field.onChange(Array.from(value)[0])
                        }
                      >
                        <SelectItem key="Laki-laki">Laki-laki</SelectItem>
                        <SelectItem key="Perempuan">Perempuan</SelectItem>
                      </Select>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Controller
                    name="gol_darah"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Golongan Darah"
                        variant="bordered"
                        labelPlacement="outside"
                        selectedKeys={[field.value]}
                        onSelectionChange={(value) =>
                          field.onChange(Array.from(value)[0])
                        }
                        isInvalid={!!errors.gol_darah}
                        errorMessage={errors.gol_darah?.message}
                      >
                        <SelectItem key="A">A</SelectItem>
                        <SelectItem key="B">B</SelectItem>
                        <SelectItem key="AB">AB</SelectItem>
                        <SelectItem key="O">O</SelectItem>
                        <SelectItem key="-">- </SelectItem>
                      </Select>
                    )}
                  />

                  <Controller
                    name="nama_ortu"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Nama Orang Tua"
                        labelPlacement="outside"
                        placeholder="Masukkan nama orang tua"
                        variant="bordered"
                        isInvalid={!!errors.nama_ortu}
                        errorMessage={errors.nama_ortu?.message}
                      />
                    )}
                  />
                </div>
              </section>

              {/* Lokasi & Kelompok */}
              <section className="space-y-6 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800">
                  Daerah & Kelompok
                </h3>
                <Divider className="my-4" />

                <Controller
                  name="daerahId"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataDaerah?.data.data || []}
                      label="Daerah"
                      variant="bordered"
                      onSelectionChange={(value) => {
                        onChange(value);
                        setSelectedDaerahId(value as string);
                      }}
                      placeholder="Pilih daerah..."
                      isInvalid={!!errors.daerahId}
                      errorMessage={errors.daerahId?.message}
                    >
                      {(daerah: IDaerah) => (
                        <AutocompleteItem key={`${daerah.id}`}>
                          {daerah.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Controller
                    name="desaId"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataDesa?.data.data || []}
                        label="Desa"
                        variant="bordered"
                        onSelectionChange={(value) => {
                          onChange(value);
                          setSelectedDesaId(value as string);
                        }}
                        placeholder={
                          !selectedDaerahId
                            ? "Pilih daerah terlebih dahulu..."
                            : "Pilih desa..."
                        }
                        isDisabled={!selectedDaerahId}
                      >
                        {(desa: IDesa) => (
                          <AutocompleteItem key={`${desa.id}`}>
                            {desa.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />

                  <Controller
                    name="kelompokId"
                    control={control}
                    render={({ field: { onChange, ...field } }) => (
                      <Autocomplete
                        {...field}
                        defaultItems={dataKelompok?.data.data || []}
                        label="Kelompok"
                        variant="bordered"
                        onSelectionChange={(value) => onChange(value)}
                        placeholder={
                          !selectedDesaId
                            ? "Pilih desa terlebih dahulu..."
                            : "Pilih kelompok..."
                        }
                        isDisabled={!selectedDesaId}
                      >
                        {(kelompok: IKelompok) => (
                          <AutocompleteItem key={`${kelompok.id}`}>
                            {kelompok.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                </div>

                <Controller
                  name="jenjangId"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <Autocomplete
                      {...field}
                      defaultItems={dataJenjang?.data.data || []}
                      label="Jenjang"
                      variant="bordered"
                      onSelectionChange={(value) => {
                        onChange(value);
                        setSelectedJenjangId(value as string); // ✅ FIX
                      }}
                      placeholder="Pilih jenjang..."
                    >
                      {(jenjang: IJenjang) => (
                        <AutocompleteItem key={`${jenjang.id}`}>
                          {jenjang.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
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
                      onSelectionChange={(value) => onChange(value)} // ✅ FIX
                      placeholder={
                        !selectedJenjangId
                          ? "Pilih jenjang terlebih dahulu..."
                          : "Pilih kelas..."
                      }
                      isDisabled={!selectedJenjangId}
                    >
                      {(kelas: IKelasJenjang) => (
                        <AutocompleteItem key={`${kelas.id}`}>
                          {kelas.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
              </section>

              {/* Foto */}
              <section className="space-y-4 rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800">Foto</h3>
                <Divider />
                <Controller
                  name="foto"
                  control={control}
                  render={({ field: { onChange, ...field } }) => (
                    <InputFile
                      {...field}
                      onUpload={(files) => handleUploadFoto(files, onChange)}
                      isUploading={isPendingMutateUploadFile}
                      isDeleting={isPendingMutateDeleteFile}
                      onDelete={() => handleDeleteFoto(onChange)}
                      isInvalid={!!errors.foto}
                      errorMessage={errors.foto?.message}
                      isDropable
                      preview={preview}
                    />
                  )}
                />
                <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
                  <AlertTriangle size={18} />
                  <span>Pastikan foto jelas dan sesuai format (JPG/PNG).</span>
                </div>
              </section>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCaberawit;
