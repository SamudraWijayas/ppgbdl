"use client";

import React, { ReactNode, useCallback } from "react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_DAERAH } from "./ListDaerah.constant";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import AddDaerah from "./AddDaerah";
import DeleteDaerah from "./DeleteDaerah";
import UpdateDaerah from "./UpdateDaerah";
import useListDaerah from "./useListDaerah";
import { IDaerah } from "@/types/Daerah";

const ListDaerah = () => {
  const {
    dataDaerah,
    isLoadingDaerah,
    isRefetchingDaerah,
    refetchDaerah,
    selectedId,
    setSelectedId,
  } = useListDaerah();

  const addDaerah = useDisclosure();
  const deleteDaerah = useDisclosure();
  const updateDaerah = useDisclosure();

  const renderCell = useCallback(
    (daerah: IDaerah, columnKey: React.Key) => {
      const cellValue = daerah[columnKey as keyof typeof daerah];
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(daerah);
                updateDaerah.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(daerah);
                deleteDaerah.onOpen();
              }}
              textButtonDetail="Detail Daerah"
              textButtonDelete="Delete Daerah"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteDaerah, setSelectedId, updateDaerah]
  );

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Tambah Daerah"
        columns={COLUMN_LIST_DAERAH}
        data={dataDaerah?.data || []}
        emptyContent="Daerah Kosong"
        isLoading={isLoadingDaerah || isRefetchingDaerah}
        onClickButtonTopContent={addDaerah.onOpen}
        renderCell={renderCell}
        totalPages={dataDaerah?.pagination.totalPages || 0}
      />
      <AddDaerah {...addDaerah} refetchDaerah={refetchDaerah} />
      <DeleteDaerah
        {...deleteDaerah}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchDaerah={refetchDaerah}
      />
      <UpdateDaerah
        {...updateDaerah}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchDaerah={refetchDaerah}
      />
    </section>
  );
};

export default ListDaerah;
