"use client";

import React, { ReactNode, useCallback } from "react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_KATE } from "./KategoriIndikator.constant";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import { IKateIndikator } from "@/types/KategoriIndikator";
import UseKategoriIndikator from "./useKategoriIndikator";
import AddKate from "./AddKate";
import DeleteKate from "./DeleteKate";
import UpdateKate from "./UpdateKate";

const ListKate = () => {
  const {
    dataKate,
    isLoadingKate,
    isRefetchingKate,
    refetchKate,
    selectedId,
    setSelectedId,
  } = UseKategoriIndikator();

  const addKate = useDisclosure();
  const deleteKate = useDisclosure();
  const updateKate = useDisclosure();

  const renderCell = useCallback(
    (kate: IKateIndikator, columnKey: React.Key) => {
      const cellValue = kate[columnKey as keyof typeof kate];
      switch (columnKey) {
        case "mataPelajaran":
          // ✅ ambil nama daerah
          return kate.mataPelajaran?.name || "-";
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(kate);
                updateKate.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(kate);
                deleteKate.onOpen();
              }}
              textButtonDetail="Detail Kate"
              textButtonDelete="Delete Kate"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteKate, setSelectedId, updateKate]
  );

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Tambah Kate"
        columns={COLUMN_LIST_KATE}
        data={dataKate?.data || []}
        emptyContent="Kate Kosong"
        isLoading={isLoadingKate || isRefetchingKate}
        onClickButtonTopContent={addKate.onOpen}
        renderCell={renderCell}
        totalPages={0}
      />
      <AddKate {...addKate} refetchKate={refetchKate} />
      <DeleteKate
        {...deleteKate}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKate={refetchKate}
      />

      <UpdateKate
        {...updateKate}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKate={refetchKate}
      />
    </section>
  );
};

export default ListKate;
