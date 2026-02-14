import React, { Dispatch, SetStateAction, useEffect } from "react";
import useDetailGenerus from "./useDetailCaberawit";
import {
  Autocomplete,
  AutocompleteItem,
  Divider,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import { IGenerus } from "@/types/Generus";
import { AlertTriangle } from "lucide-react";
import { IDaerah } from "@/types/Daerah";
import { IDesa } from "@/types/Desa";
import { IKelompok } from "@/types/Kelompok";
import { IJenjang } from "@/types/Jenjang";
import InputFile from "@/components/ui/InputFile";
import { toInputDate } from "@/utils/date";
import { IKelasJenjang } from "@/types/KelasJenjang";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchGenerus: () => void;
  selectedId: IGenerus | null;
  setSelectedId: Dispatch<SetStateAction<IGenerus | null>>;
}

const DetailCaberawit = (props: PropTypes) => {
  const { isOpen, onClose, refetchGenerus, selectedId, setSelectedId } = props;

  const {
    control,
    handleSubmitForm,
    errors,
    setValueUpdateGenerus,
    isPendingMutateUpdateGenerus,
    isSuccessMutateUpdateGenerus,
    handleUpdateGenerus,

    preview,
    handleUploadFoto,
    isPendingMutateUploadFile,
    handleDeleteFoto,
    isPendingMutateDeleteFile,

    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,
    dataKelasJenjang,


    setSelectedDaerahId,
  } = useDetailGenerus(`${selectedId?.id}`);

  useEffect(() => {
    if (isSuccessMutateUpdateGenerus) {
      onClose();
      refetchGenerus();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateGenerus, onClose, refetchGenerus, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateGenerus("nama", `${selectedId?.nama}`);
      setValueUpdateGenerus("daerahId", `${selectedId?.daerahId}`);
      setValueUpdateGenerus("desaId", `${selectedId?.desaId}`);
      setValueUpdateGenerus("kelompokId", `${selectedId?.kelompokId}`);
      setValueUpdateGenerus(
        "tgl_lahir",
        toInputDate(`${selectedId?.tgl_lahir}`),
      );
      setValueUpdateGenerus("jenjangId", `${selectedId?.jenjangId}`);
      setValueUpdateGenerus("kelasJenjangId", `${selectedId?.kelasJenjangId}`);
      setValueUpdateGenerus("jenis_kelamin", `${selectedId?.jenis_kelamin}`);
      setValueUpdateGenerus("gol_darah", `${selectedId?.gol_darah}`);
      setValueUpdateGenerus(
        "mahasiswa",
        selectedId?.mahasiswa === true || selectedId?.mahasiswa === "true",
      );
      setValueUpdateGenerus("nama_ortu", `${selectedId?.nama_ortu}`);
      setValueUpdateGenerus("foto", `${selectedId?.foto}`);
    }
  }, [selectedId, setValueUpdateGenerus]);

  const disabledSubmit =
    isSuccessMutateUpdateGenerus ||
    isPendingMutateUploadFile ||
    isPendingMutateDeleteFile;

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60">
      <div className="relative z-[10001] flex h-full w-full flex-col overflow-x-hidden bg-gray-100 shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold text-gray-900">
            Update Generus
          </h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              disabled={disabledSubmit}
            >
              Batal
            </button>
            <button
              type="submit"
              form="updateGenerusForm"
              disabled={disabledSubmit}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPendingMutateUpdateGenerus ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Generus"
              )}
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-6">
          <form
            id="updateGenerusForm"
            onSubmit={handleSubmitForm(handleUpdateGenerus)}
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
                      <Input
                        {...field}
                        label="Golongan Darah"
                        labelPlacement="outside"
                        placeholder="Masukkan golongan darah"
                        variant="bordered"
                        isInvalid={!!errors.gol_darah}
                        errorMessage={errors.gol_darah?.message}
                      />
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
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-md bg-yellow-50 p-3 text-sm text-yellow-700">
                    <AlertTriangle size={18} />
                    <span>
                      Jika masih kuliah, pilih status <b>Aktif</b>.
                    </span>
                  </div>
                  <Controller
                    name="mahasiswa"
                    control={control}
                    render={({ field }) => (
                      <Select
                        label="Status Mahasiswa"
                        variant="bordered"
                        disallowEmptySelection
                        selectedKeys={[field.value ? "true" : "false"]}
                        onSelectionChange={(value) =>
                          field.onChange(Array.from(value)[0] === "true")
                        }
                      >
                        <SelectItem key="true">Aktif</SelectItem>
                        <SelectItem key="false">Tidak Aktif</SelectItem>
                      </Select>
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
                  render={({ field: { onChange, value, ...field } }) => (
                    <Autocomplete
                      {...field}
                      selectedKey={value ?? ""}
                      defaultItems={dataDaerah?.data.data || []}
                      label="Daerah"
                      variant="bordered"
                      onSelectionChange={(v) => {
                        onChange(v);
                        setSelectedDaerahId(v as string);
                      }}
                      placeholder="Pilih daerah..."
                      isInvalid={!!errors.daerahId}
                      errorMessage={errors.daerahId?.message}
                    >
                      {(daerah: IDaerah) => (
                        <AutocompleteItem key={daerah.id}>
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
                    render={({ field: { onChange, value, ...field } }) => (
                      <Autocomplete
                        {...field}
                        selectedKey={value ?? ""}
                        defaultItems={dataDesa?.data.data || []}
                        label="Desa"
                        variant="bordered"
                        onSelectionChange={onChange}
                        placeholder="Pilih Desa..."
                        isInvalid={!!errors.desaId}
                        errorMessage={errors.desaId?.message}
                      >
                        {(desa: IDesa) => (
                          <AutocompleteItem key={desa.id}>
                            {desa.name}
                          </AutocompleteItem>
                        )}
                      </Autocomplete>
                    )}
                  />
                  <Controller
                    name="kelompokId"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <Autocomplete
                        {...field}
                        selectedKey={value ?? ""}
                        defaultItems={dataKelompok?.data.data || []}
                        label="Kelompok"
                        variant="bordered"
                        onSelectionChange={onChange}
                        placeholder="Pilih Kelompok..."
                        isInvalid={!!errors.kelompokId}
                        errorMessage={errors.kelompokId?.message}
                      >
                        {(kelompok: IKelompok) => (
                          <AutocompleteItem key={kelompok.id}>
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
                  render={({ field: { onChange, value, ...field } }) => (
                    <Autocomplete
                      {...field}
                      selectedKey={value ?? ""}
                      defaultItems={dataJenjang?.data.data || []}
                      label="Jenjang"
                      variant="bordered"
                      onSelectionChange={onChange}
                      placeholder="Pilih jenjang..."
                      isInvalid={!!errors.jenjangId}
                      errorMessage={errors.jenjangId?.message}
                    >
                      {(jenjang: IJenjang) => (
                        <AutocompleteItem key={jenjang.id}>
                          {jenjang.name}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  )}
                />
                <Controller
                  name="kelasJenjangId"
                  control={control}
                  render={({ field: { onChange, value, ...field } }) => (
                    <Autocomplete
                      {...field}
                      selectedKey={value ?? ""}
                      defaultItems={dataKelasJenjang?.data.data || []}
                      label="Kelas Jenjang"
                      variant="bordered"
                      onSelectionChange={onChange}
                      placeholder="Pilih Kelas..."
                      isInvalid={!!errors.kelasJenjangId}
                      errorMessage={errors.kelasJenjangId?.message}
                    >
                      {(kelasjenjang: IKelasJenjang) => (
                        <AutocompleteItem key={kelasjenjang.id}>
                          {kelasjenjang.name}
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

export default DetailCaberawit;
