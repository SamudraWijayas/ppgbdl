import React, { useEffect } from "react";
import { Divider, Select, SelectItem, Spinner } from "@heroui/react";
import useAddRapor from "./useAddRapor";
import { IndikatorItem } from "@/types/Indikator";
import { Controller } from "react-hook-form";
import useRapotCaberawit from "../useRapotCaberawit";
import { RaporItem } from "@/types/Rapor";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchRapor: () => void;
}

const AddRapor = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchRapor,
}: PropTypes) => {
  const {
    dataIndikator,
    isLoadingIndikator,

    mutateAddRapor,
    isPendingMutateAddRapor,
    isSuccessMutateAddRapor,
    control,
    handleSubmitForm,
    errors,
    getValues,
    setValue,
    handleAddRapor,
  } = useAddRapor();
  const { dataRapor, isLoadingRapor } = useRapotCaberawit();

  const indikatorList = dataIndikator?.data ?? [];

  useEffect(() => {
    if (isSuccessMutateAddRapor) {
      onClose();
      refetchRapor();
    }
  }, [isSuccessMutateAddRapor, onClose, refetchRapor]);

  useEffect(() => {
    if (dataRapor?.data?.length) {
      const semesterValue = dataRapor.data[0].semester ?? "";

      setValue("semester", semesterValue);
      dataRapor.data.forEach((item: RaporItem, index: number) => {
        setValue(`raporItems.${index}.indikatorKelasId`, item.id_indikator);
        setValue(
          `raporItems.${index}.nilaiPengetahuan`,
          item.nilaiPengetahuan ?? null,
        );
        setValue(
          `raporItems.${index}.nilaiKeterampilan`,
          item.nilaiKeterampilan ?? null,
        );
      });
    }
  }, [dataRapor, setValue]);

  useEffect(() => {
    if (isOpen) {
      // disable scroll di body
      document.body.style.overflow = "hidden";
    } else {
      // enable scroll kembali
      document.body.style.overflow = "";
    }

    // cleanup saat component unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Batal
            </button>
            <button
              type="submit"
              form="addRaporForm"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isPendingMutateAddRapor ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Rapor"
              )}
            </button>
          </div>
        </div>

        {/* Body */}
       <div className="mx-auto w-full max-w-6xl p-6">
          <form
            id="addRaporForm"
            onSubmit={handleSubmitForm(handleAddRapor)}
            className="flex flex-col gap-6"
          >
            <section className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800">
                Indikator Penilaian
              </h3>
              <Divider className="my-4" />

              {/* Semester */}
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
                    <SelectItem key="GANJIL">GANJIL</SelectItem>
                    <SelectItem key="GENAP">GENAP</SelectItem>
                  </Select>
                )}
              />

              {/* Indikator Table */}
              {isLoadingIndikator ? (
                <div className="flex justify-center py-10">
                  <Spinner size="lg" />
                </div>
              ) : indikatorList.length === 0 ? (
                <p className="text-center text-gray-400 mt-6">
                  Tidak ada indikator
                </p>
              ) : (
                <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 border-b">No</th>
                        <th className="px-4 py-2 border-b">Indikator</th>
                        <th className="px-4 py-2 border-b text-center">
                          Nilai Pengetahuan
                        </th>
                        <th className="px-4 py-2 border-b text-center">
                          Nilai Keterampilan
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {indikatorList.map((item: IndikatorItem, index: number) => (
                        <tr
                          key={item.id}
                          className="hover:bg-blue-50 transition-colors"
                        >
                          <td className="px-4 py-2 border-b">{index + 1}</td>
                          <td className="px-4 py-2 border-b">
                            {item.indikator}
                            <Controller
                              name={`raporItems.${index}.indikatorKelasId`}
                              control={control}
                              defaultValue={item.id}
                              render={({ field }) => <input type="hidden" {...field} />}
                            />
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            <Controller
                              name={`raporItems.${index}.nilaiPengetahuan`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  placeholder="Nilai"
                                  value={field.value ?? ""}
                                  className="w-20 text-center rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                              )}
                            />
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            <Controller
                              name={`raporItems.${index}.nilaiKeterampilan`}
                              control={control}
                              render={({ field }) => (
                                <input
                                  {...field}
                                  type="number"
                                  placeholder="Nilai"
                                  value={field.value ?? ""}
                                  className="w-20 text-center rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                                />
                              )}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRapor;
