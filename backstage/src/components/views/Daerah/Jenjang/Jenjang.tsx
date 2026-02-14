"use client";

import React, { ReactNode, useCallback } from "react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_JENJANG } from "./Jenjang.constant";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import useListJenjang from "./useJenjang";
import { IJenjang } from "@/types/Jenjang";
import AddJenjang from "./AddJenjang";
import UpdateJenjang from "./UpdateJenjang";

const ListJenjang = () => {
  const {
    dataJenjang,
    isLoadingJenjang,
    isRefetchingJenjang,
    refetchJenjang,
    selectedId,
    setSelectedId,
  } = useListJenjang();

  const addJenjang = useDisclosure();
  const deleteJenjang = useDisclosure();
  const updateJenjang = useDisclosure();

  const renderCell = useCallback(
    (jenjang: Record<string, unknown>, columnKey: React.Key) => {
      const cellValue = jenjang[columnKey as keyof typeof jenjang];
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(jenjang as IJenjang);
                updateJenjang.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(jenjang as IJenjang);
                deleteJenjang.onOpen();
              }}
              textButtonDetail="Detail Jenjang"
              textButtonDelete="Delete Jenjang"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteJenjang, setSelectedId, updateJenjang]
  );

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Tambah Jenjang"
        columns={COLUMN_LIST_JENJANG}
        data={dataJenjang?.data || []}
        emptyContent="Jenjang Kosong"
        isLoading={isLoadingJenjang || isRefetchingJenjang}
        onClickButtonTopContent={addJenjang.onOpen}
        renderCell={renderCell}
        totalPages={0}
      />
      <AddJenjang {...addJenjang} refetchJenjang={refetchJenjang} />
      <UpdateJenjang
        {...updateJenjang}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchJenjang={refetchJenjang}
      />
      {/* 
      <DeleteJenjang
        {...deleteJenjang}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchJenjang={refetchJenjang}
      />
       */}
    </section>
  );
};

export default ListJenjang;
