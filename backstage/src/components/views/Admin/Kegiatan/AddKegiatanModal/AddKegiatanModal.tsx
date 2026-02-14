import React, { useEffect } from "react";
import useAddKegiatanModal from "./useAddKegiatanModal";
import { Controller } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { IDaerah } from "@/types/Daerah";
import { IDesa } from "@/types/Desa";
import { IKelompok } from "@/types/Kelompok";
import { IJenjang } from "@/types/Jenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  refetchKegiatan: () => void;
}
const AddKegiatanModal = ({ isOpen, onClose, refetchKegiatan }: PropTypes) => {
  const {
    control,
    handleSubmitForm,
    errors,
    watch,
    handleAddKEgiatan,
    isPendingMutateAddKegiatan,
    isSuccessMutateAddKegiatan,

    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,
    isPendingJenjang,
    isRefetchingJenjang,
  } = useAddKegiatanModal();

  useEffect(() => {
    if (isSuccessMutateAddKegiatan) {
      onClose();
      refetchKegiatan();
    }
  }, [isSuccessMutateAddKegiatan, onClose, refetchKegiatan]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="relative z-[10001] flex h-full w-full flex-col overflow-x-hidden bg-gray-200 shadow-xl">
        <div className="sticky top-0 z-50 flex items-center justify-between bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold">Add Kegiatan</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>
        <div className="mx-auto my-4 w-full max-w-3xl flex-1 rounded-lg bg-white p-4 sm:p-6">
          <form
            onSubmit={handleSubmitForm(handleAddKEgiatan)}
            className="flex flex-1 flex-col p-6"
          >
            <div className="flex flex-col gap-6">
              <p className="text-base font-semibold">Kegiatan Information</p>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Nama Kegiatan"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Masukkan nama kegiatan"
                    isInvalid={!!errors.name}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <div>
                <p className="mb-2 text-sm">Tingkat Kegiatan</p>
                <Controller
                  name="tingkat"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      orientation="horizontal"
                      className="flex w-full gap-4"
                    >
                      {[
                        {
                          type: "DAERAH",
                          label: "Daerah",
                        },
                        {
                          type: "DESA",
                          label: "Desa",
                        },
                        {
                          type: "KELOMPOK",
                          label: "Kelompok",
                        },
                      ].map((item) => (
                        <div key={item.type} className="flex-1">
                          <label
                            className={`flex cursor-pointer items-center rounded-lg border p-4 transition ${
                              field.value === item.type
                                ? "border-blue-500 shadow-md"
                                : "border-gray-200 hover:border-blue-400"
                            }`}
                          >
                            <Radio value={item.type} />
                            <div className="ml-2 flex flex-col items-start">
                              <span className="font-medium">{item.label}</span>
                            </div>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.tingkat && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.tingkat.message}
                  </p>
                )}
              </div>

              {watch("tingkat") === "DAERAH" && (
                <Controller
                  name="daerahId"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      selectedKey={field.value ?? ""} // ✅ pakai selectedKey, bukan value
                      onSelectionChange={(key) => field.onChange(key ?? "")} // ✅ hindari null
                      defaultItems={dataDaerah?.data.data || []}
                      label="Pilih Daerah"
                      variant="bordered"
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      placeholder="Cari daerah..."
                    >
                      {(daerah: IDaerah) => (
                        <AutocompleteItem key={String(daerah.id)}>
                          {daerah.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
              )}
              {watch("tingkat") === "DESA" && (
                <Controller
                  name="desaId"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      selectedKey={field.value ?? ""} // ✅ pakai selectedKey, bukan value
                      onSelectionChange={(key) => field.onChange(key ?? "")} // ✅ hindari null
                      defaultItems={dataDesa?.data.data || []}
                      label="Pilih Desa"
                      variant="bordered"
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      placeholder="Cari Desa..."
                    >
                      {(desa: IDesa) => (
                        <AutocompleteItem key={String(desa.id)}>
                          {desa.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
              )}
              {watch("tingkat") === "KELOMPOK" && (
                <Controller
                  name="kelompokId"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      selectedKey={field.value ?? ""} // ✅ pakai selectedKey, bukan value
                      onSelectionChange={(key) => field.onChange(key ?? "")} // ✅ hindari null
                      defaultItems={dataKelompok?.data.data || []}
                      label="Pilih Kelompok"
                      variant="bordered"
                      isInvalid={!!error}
                      errorMessage={error?.message}
                      placeholder="Cari Kelompok..."
                    >
                      {(kelompok: IKelompok) => (
                        <AutocompleteItem key={String(kelompok.id)}>
                          {kelompok.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
              )}

              <Controller
                name="jenisKelamin"
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
                    <SelectItem key="LAKI_LAKI">Laki-laki</SelectItem>
                    <SelectItem key="PEREMPUAN">Perempuan</SelectItem>
                    <SelectItem key="SEMUA">Semua</SelectItem>
                  </Select>
                )}
              />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold">Start Date</p>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="datetime-local"
                        variant="bordered"
                        isInvalid={!!errors.startDate}
                        errorMessage={errors.startDate?.message}
                        value={field.value ? String(field.value) : ""}
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-bold">End Date</p>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="datetime-local"
                        variant="bordered"
                        isInvalid={!!errors.endDate}
                        errorMessage={errors.endDate?.message}
                        value={field.value ? String(field.value) : ""}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold">Target Peserta</p>
                <Controller
                  name="targetType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      orientation="horizontal"
                      className="flex w-full gap-4"
                    >
                      {[
                        { value: "JENJANG", label: "Per Jenjang" },
                        { value: "MAHASISWA", label: "Mahasiswa" },
                        { value: "USIA", label: "Berdasarkan Usia" },
                      ].map((item) => (
                        <div key={item.value} className="flex-1">
                          <label
                            className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 ${
                              field.value === item.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <Radio value={item.value} />
                            <span className="text-sm font-medium">
                              {item.label}
                            </span>
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.targetType && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.targetType.message}
                  </p>
                )}
              </div>

              {watch("targetType") === "USIA" && (
                <div className="flex gap-4">
                  <Controller
                    name="minUsia"
                    control={control}
                    render={({ field }) => (
                      <div className="flex w-1/2 flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                          Manimal usia
                        </label>
                        <input
                          {...field}
                          type="number"
                          className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                            errors.minUsia
                              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-400/30"
                              : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30"
                          }`}
                          value={field.value ? String(field.value) : ""}
                        />
                        {errors.minUsia && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.minUsia.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="maxUsia"
                    control={control}
                    render={({ field }) => (
                      <div className="flex w-1/2 flex-col gap-1">
                        <label className="text-sm font-medium text-gray-700">
                          Maksimal Usia
                        </label>
                        <input
                          {...field}
                          type="number"
                          className={`w-full rounded-lg border px-3 py-2 text-sm shadow-sm transition outline-none ${
                            errors.maxUsia
                              ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-400/30"
                              : "border-gray-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-400/30"
                          }`}
                          value={field.value ? String(field.value) : ""}
                        />
                        {errors.maxUsia && (
                          <p className="mt-1 text-xs text-red-500">
                            {errors.maxUsia.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              )}

              {watch("targetType") === "JENJANG" && (
                <div className="space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div>
                    <h1 className="font-semibold">Kategori Jenjang </h1>
                    <Divider className="my-3" />
                  </div>

                  {isPendingJenjang || isRefetchingJenjang ? (
                    <p className="text-sm text-gray-500">Loading jenjang...</p>
                  ) : (
                    <Controller
                      name="jenjangIds"
                      control={control}
                      render={({ field }) => (
                        <div>
                          <p className="mb-5 text-sm text-gray-600">
                            Pilih Sasaran Peserta untuk kegiatan ini
                          </p>
                          <CheckboxGroup
                            {...field}
                            // pastikan value selalu string[]
                            value={(field.value || []).filter(
                              (v): v is string => typeof v === "string",
                            )}
                            onValueChange={(val) => field.onChange(val)}
                            className="flex flex-col gap-4"
                          >
                            {dataJenjang?.map((jenjang: IJenjang) => (
                              <Checkbox
                                key={jenjang.id}
                                value={jenjang.id}
                                classNames={{
                                  base: "w-full max-w-full mb-1 flex items-start gap-10 rounded-lg border border-gray-200 p-3 hover:border-blue-400 data-[selected=true]:border-blue-500 data-[selected=true]:bg-blue-50",
                                  label: "text-sm font-medium text-gray-700",
                                }}
                              >
                                {jenjang.name}
                              </Checkbox>
                            ))}
                          </CheckboxGroup>
                        </div>
                      )}
                    />
                  )}

                  {errors.jenjangIds && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.jenjangIds.message}
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Footer */}
            <div className="mt-6 flex justify-end gap-3 border-t border-gray-200 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded border border-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-100"
                disabled={isPendingMutateAddKegiatan}
              >
                Cancel
              </button>

              <Button
                color="primary"
                type="submit"
                disabled={isPendingMutateAddKegiatan}
              >
                {isPendingMutateAddKegiatan ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Create Kegiatan"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddKegiatanModal;
