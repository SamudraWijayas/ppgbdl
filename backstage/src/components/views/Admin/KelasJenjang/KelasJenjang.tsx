"use client";

import React, { ReactNode, useCallback } from "react";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_KELAS } from "./KelasJenjang.constant";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import useListKelasJenjang from "./useKelasJenjang";
import { IKelasJenjang } from "@/types/KelasJenjang";
import AddKelasJenjang from "./AddKelasJenjang";

const ListKelasJenjang = () => {
  const {
    dataKelasJenjang,
    isLoadingKelasJenjang,
    isRefetchingKelasJenjang,
    refetchKelasJenjang,
    selectedId,
    setSelectedId,
  } = useListKelasJenjang();

  const { setUrl } = useChangeUrl();

  const addKelasJenjang = useDisclosure();
  const deleteKelasJenjang = useDisclosure();
  const updateKelasJenjang = useDisclosure();

  // ✅ Jalankan setUrl langsung tanpa searchParams
  React.useEffect(() => {
    setUrl();
  }, [setUrl]);

  const renderCell = useCallback(
    (kelas: IKelasJenjang, columnKey: React.Key) => {
      const cellValue = kelas[columnKey as keyof typeof kelas];
      switch (columnKey) {
        case "jenjang":
          return kelas.jenjang?.name || "-";
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(kelas);
                updateKelasJenjang.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(kelas);
                deleteKelasJenjang.onOpen();
              }}
              textButtonDetail="Detail KelasJenjang"
              textButtonDelete="Delete KelasJenjang"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteKelasJenjang, setSelectedId, updateKelasJenjang],
  );

  // ✅ Selalu tampilkan DataTable karena tidak ada searchParams
  const hasParams = true;

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Tambah KelasJenjang"
          columns={COLUMN_LIST_KELAS}
          data={dataKelasJenjang?.data || []}
          emptyContent="KelasJenjang Kosong"
          isLoading={isLoadingKelasJenjang || isRefetchingKelasJenjang}
          onClickButtonTopContent={addKelasJenjang.onOpen}
          renderCell={renderCell}
          totalPages={0}
        />
      )}
      <AddKelasJenjang
        {...addKelasJenjang}
        refetchKelasJenjang={refetchKelasJenjang}
      />
      {/* Uncomment jika butuh Delete / Update */}
      {/* 
      <DeleteKelasJenjang
        {...deleteKelasJenjang}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKelasJenjang={refetchKelasJenjang}
      />
      <UpdateKelasJenjang
        {...updateKelasJenjang}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKelasJenjang={refetchKelasJenjang}
      /> 
      */}
    </section>
  );
};

export default ListKelasJenjang;
