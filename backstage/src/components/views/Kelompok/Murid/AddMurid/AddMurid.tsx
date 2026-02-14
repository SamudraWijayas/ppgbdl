import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Checkbox,
} from "@heroui/react";
import useAddMurid from "./useAddMurid";
import { IMurid } from "@/types/Caberawit";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchMurid: () => void;
}

const AddMurid = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetchMurid } = props;

  const {
    dataGenerus,
    isLoadingGenerus,
    selectedIds,
    toggleSelect,
    submitAddMurid,
    isPendingAddMurid,
    idGuru,
  } = useAddMurid(() => {
    refetchMurid();
    onClose();
  });

  const muridList = dataGenerus?.data ?? [];

  return (
    <Drawer
      isDismissable={false}
      isKeyboardDismissDisabled
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <DrawerContent>
        <DrawerHeader className="flex flex-col gap-1">
          Tambah Murid
        </DrawerHeader>

        <DrawerBody>
          {isLoadingGenerus ? (
            <p>Loading...</p>
          ) : muridList.length === 0 ? (
            <p className="text-sm text-gray-500">Tidak ada data Caberawit</p>
          ) : (
            <div className="flex flex-col gap-3">
              {muridList.map((murid: IMurid) => {
                const isSelected = selectedIds.includes(murid.id);
                const isDisabled = murid.waliId === idGuru;

                return (
                  <label
                    key={murid.id}
                    className={`
          flex items-center gap-3 rounded-lg border p-3
          transition
          ${
            isDisabled
              ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-60"
              : "border-gray-200 cursor-pointer hover:bg-gray-50"
          }
        `}
                  >
                    {/* <input
                    type="checkbox"
                    checked={selectedIds.includes(murid.id)}
                    onChange={() => toggleSelect(murid.id)}
                    className="h-4 w-4"
                  /> */}
                    <Checkbox
                      isSelected={isSelected}
                      isDisabled={isDisabled}
                      onValueChange={() => {
                        if (!isDisabled) {
                          toggleSelect(murid.id);
                        }
                      }}
                      color="primary"
                      radius="sm"
                    />

                    <div className="flex flex-col">
                      <span className="font-medium">{murid.nama}</span>

                      <span className="text-xs text-gray-500">
                        {murid.kelasJenjang?.name} •{" "}
                        {murid.wali?.fullName ? (
                          <>
                            <span className="font-medium">
                              {murid.wali.fullName}
                            </span>
                          </>
                        ) : (
                          <span className="italic text-gray-400">
                            Belum ada wali kelas
                          </span>
                        )}
                        {isDisabled && (
                          <span className="text-[#293c88] font-medium">
                            {" "}
                            • Sudah menjadi wali
                          </span>
                        )}
                      </span>
                    </div>
                  </label>
                );
              })}
            </div>
          )}
        </DrawerBody>

        <DrawerFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button
            color="primary"
            isLoading={isPendingAddMurid}
            isDisabled={selectedIds.length === 0}
            onPress={() => submitAddMurid(selectedIds)}
          >
            Simpan ({selectedIds.length})
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddMurid;
