"use client";

import React, { ReactNode, useCallback } from "react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_DESA } from "./ListDesa.constant";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import AddDesa from "./AddDesa";
import DeleteDesa from "./DeleteDesa";
import UpdateDesa from "./UpdateDesa";
import useListDesa from "./useListDesa";
import { IDesa } from "@/types/Desa";

const ListDesa = () => {
  const {
    dataDesa,
    isLoadingDesa,
    isRefetchingDesa,
    refetchDesa,
    selectedId,
    setSelectedId,
  } = useListDesa();

  const addDesa = useDisclosure();
  const deleteDesa = useDisclosure();
  const updateDesa = useDisclosure();

  const renderCell = useCallback(
    (desa: IDesa, columnKey: React.Key) => {
      const cellValue = desa[columnKey as keyof typeof desa];
      switch (columnKey) {
        case "daerah":
          return desa.daerah?.name || "-";
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(desa);
                updateDesa.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(desa);
                deleteDesa.onOpen();
              }}
              textButtonDetail="Detail Desa"
              textButtonDelete="Delete Desa"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteDesa, setSelectedId, updateDesa],
  );

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Tambah Desa"
        columns={COLUMN_LIST_DESA}
        data={dataDesa?.data || []}
        emptyContent="Desa Kosong"
        isLoading={isLoadingDesa || isRefetchingDesa}
        onClickButtonTopContent={addDesa.onOpen}
        renderCell={renderCell}
        totalPages={dataDesa?.pagination.totalPages || 0}
        totalEntries={dataDesa?.pagination.total || 0}
      />
      <AddDesa {...addDesa} refetchDesa={refetchDesa} />
      <DeleteDesa
        {...deleteDesa}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchDesa={refetchDesa}
      />
      <UpdateDesa
        {...updateDesa}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchDesa={refetchDesa}
      />
    </section>
  );
};

export default ListDesa;
