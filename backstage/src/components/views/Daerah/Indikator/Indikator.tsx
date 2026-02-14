"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import { useSearchParams } from "next/navigation";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";
import useIndikator from "./useIndikator.tsx";
import { IIndikator } from "@/types/Indikator";
import { COLUMN_LIST_INDIKATOR } from "./Indikator.constant";
import AddIndikator from "./AddIndikator";

const Indikator = () => {
  const searchParams = useSearchParams();

  const {
    dataIndikator,
    isLoadingIndikator,
    isRefetchingIndikator,
    refetchIndikator,
    selectedId,
    setSelectedId,
    filter,
    setFilter,
    dataKelas,
    dataKate,
  } = useIndikator();

  const { setUrl } = useChangeUrl();

  const addIndikator = useDisclosure();
  const deleteIndikator = useDisclosure();
  const updateIndikator = useDisclosure();

  // ✅ App Router tidak punya isReady, jadi cek param lewat searchParams
  useEffect(() => {
    if (searchParams) {
      setUrl();
    }
  }, [searchParams, setUrl]);

  const renderCell = useCallback(
    (indikator: IIndikator, columnKey: React.Key) => {
      const cellValue = indikator[columnKey as keyof typeof indikator];
      switch (columnKey) {
        case "kelasJenjang":
          return indikator.kelasJenjang?.name || "-";

        case "kategoriIndikator":
          return indikator.kategoriIndikator?.name || "-";

        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(indikator as IIndikator);
                updateIndikator.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(indikator as IIndikator);
                deleteIndikator.onOpen();
              }}
              textButtonDetail="Detail Indikator"
              textButtonDelete="Delete Indikator"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteIndikator, setSelectedId, updateIndikator]
  );

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""
  const hasParams = searchParams.toString() !== "";

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Tambah Indikator"
          columns={COLUMN_LIST_INDIKATOR}
          data={dataIndikator?.data || []}
          emptyContent="Indikator Kosong"
          isLoading={isLoadingIndikator || isRefetchingIndikator}
          onClickButtonTopContent={addIndikator.onOpen}
          renderCell={renderCell}
          totalPages={0}
        />
      )}

      <AddIndikator {...addIndikator} refetchIndikator={refetchIndikator} />
      {/* 
      <DeleteIndikator
        {...deleteIndikator}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchIndikator={refetchIndikator}
      /> */}
      {/* <UpdateIndikator
        {...updateIndikator}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchIndikator={refetchIndikator}
      /> */}
    </section>
  );
};

export default Indikator;
