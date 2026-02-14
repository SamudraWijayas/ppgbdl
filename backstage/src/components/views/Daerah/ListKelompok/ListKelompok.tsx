"use client";

import React, { ReactNode, useCallback } from "react";
import useListKelompok from "./useListKelompok";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_KELOMPOK } from "./ListKelompok.constant";
import DropdownAction from "@/components/commons/DropdownAction";

import { IKelompok } from "@/types/Kelompok";
import { useDisclosure } from "@heroui/react";
import AddKelompok from "./AddKelompok";
import DeleteKelompok from "./DeleteKelompok";

const ListKelompok = () => {
  const {
    dataKelompok,
    isLoadingKelompok,
    isRefetchingKelompok,
    refetchKelompok,
    selectedId,
    setSelectedId,
  } = useListKelompok();

  const addKelompok = useDisclosure();
  const deleteKelompok = useDisclosure();
  const updateKelompok = useDisclosure();

  const renderCell = useCallback(
    (kelompok: IKelompok, columnKey: React.Key) => {
      const cellValue = kelompok[columnKey as keyof typeof kelompok];
      switch (columnKey) {
        case "daerah":
          return kelompok.daerah?.name || "-";

        case "desa":
          return kelompok.desa?.name || "-";

        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(kelompok as IKelompok);
                updateKelompok.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(kelompok as IKelompok);
                deleteKelompok.onOpen();
              }}
              textButtonDetail="Detail Kelompok"
              textButtonDelete="Delete Kelompok"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteKelompok, setSelectedId, updateKelompok],
  );

  // ✅ Langsung render DataTable tanpa searchParams
  const kelompokData = dataKelompok?.data || [];

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Tambah Kelompok"
        columns={COLUMN_LIST_KELOMPOK}
        data={kelompokData}
        emptyContent="Kelompok Kosong"
        searchName="Cari Nama Kelompok"
        isLoading={isLoadingKelompok || isRefetchingKelompok}
        onClickButtonTopContent={addKelompok.onOpen}
        renderCell={renderCell}
        totalPages={dataKelompok?.pagination.totalPages || 0}
      />

      <AddKelompok {...addKelompok} refetchKelompok={refetchKelompok} />
      <DeleteKelompok
        {...deleteKelompok}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKelompok={refetchKelompok}
      />
      {/* <UpdateKelompok
        {...updateKelompok}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKelompok={refetchKelompok}
      /> */}
    </section>
  );
};

export default ListKelompok;
