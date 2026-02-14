"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import useListDaerah from "./useListDaerah";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_DAERAH } from "./ListDaerah.constant";
import { useSearchParams } from "next/navigation";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import AddDaerah from "./AddDaerah";
import DeleteDaerah from "./DeleteDaerah";
import UpdateDaerah from "./UpdateDaerah";
import { IDaerah } from "@/types/Daerah";

const ListDaerah = () => {
  const searchParams = useSearchParams();

  const {
    dataDaerah,
    isLoadingDaerah,
    isRefetchingDaerah,
    refetchDaerah,
    selectedId,
    setSelectedId,
  } = useListDaerah();

  const { setUrl } = useChangeUrl();

  const addDaerah = useDisclosure();
  const deleteDaerah = useDisclosure();
  const updateDaerah = useDisclosure();

  // ✅ App Router tidak punya isReady, jadi cek param lewat searchParams
  useEffect(() => {
    if (searchParams) {
      setUrl();
    }
  }, [searchParams, setUrl]);

  const renderCell = useCallback(
    (daerah: Record<string, unknown>, columnKey: React.Key) => {
      const cellValue = daerah[columnKey as keyof typeof daerah];
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(daerah as IDaerah);
                updateDaerah.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(daerah as IDaerah);
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

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""
  const hasParams = searchParams.toString() !== "";

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Tambah Daerah"
          columns={COLUMN_LIST_DAERAH}
          data={dataDaerah?.data || []}
          emptyContent="EDaerah Kosong"
          isLoading={isLoadingDaerah || isRefetchingDaerah}
          onClickButtonTopContent={addDaerah.onOpen}
          renderCell={renderCell}
          totalPages={dataDaerah?.pagination.totalPages || 0}
        />
      )}
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
