"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_MAPEL } from "./Mapel.constant";
import { useSearchParams } from "next/navigation";
import DropdownAction from "@/components/commons/DropdownAction";
import { useDisclosure } from "@heroui/react";

import { IMapel } from "@/types/Mapel";
import useListMapel from "./useMapel";
import AddMapel from "./AddMapel";
import DeleteMapel from "./DeleteMapel";
import UpdateMapel from "./UpdateMapel";

const Mapel = () => {
  const searchParams = useSearchParams();

  const {
    dataMapel,
    isLoadingMapel,
    isRefetchingMapel,
    refetchMapel,
    selectedId,
    setSelectedId,
  } = useListMapel();

  const addMapel = useDisclosure();
  const deleteMapel = useDisclosure();
  const updateMapel = useDisclosure();

  // ✅ App Router tidak punya isReady, jadi cek param lewat searchParams

  const renderCell = useCallback(
    (mapel: Record<string, unknown>, columnKey: React.Key) => {
      const cellValue = mapel[columnKey as keyof typeof mapel];
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(mapel as IMapel);
                updateMapel.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(mapel as IMapel);
                deleteMapel.onOpen();
              }}
              textButtonDetail="Detail Mapel"
              textButtonDelete="Delete Mapel"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteMapel, setSelectedId, updateMapel]
  );

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""

  return (
    <section>
      <DataTable
        buttonTopContentLabel="Tambah Mapel"
        columns={COLUMN_LIST_MAPEL}
        data={dataMapel?.data || []}
        emptyContent="Mapel Kosong"
        isLoading={isLoadingMapel || isRefetchingMapel}
        onClickButtonTopContent={addMapel.onOpen}
        renderCell={renderCell}
        totalPages={0}
      />
      <AddMapel {...addMapel} refetchMapel={refetchMapel} />
      <DeleteMapel
        {...deleteMapel}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchMapel={refetchMapel}
      />
      <UpdateMapel
        {...updateMapel}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchMapel={refetchMapel}
      />
    </section>
  );
};

export default Mapel;
