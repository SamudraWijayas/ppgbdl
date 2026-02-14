"use client";

import React, { ReactNode, useCallback } from "react";
import DataTable from "@/components/ui/DataTable";
import DropdownAction from "@/components/commons/DropdownAction";
import { Avatar, Chip, Select, SelectItem, useDisclosure } from "@heroui/react";
import useGenerus from "./useGenerus";
import { COLUMN_LIST_GENERUS } from "./Generus.constant";
import { IGenerus } from "@/types/Generus";
import { IJenjang } from "@/types/Jenjang";
import { IDesa } from "@/types/Desa";
import DetailMumi from "@/components/ui/Modal/Mumi/DetailMumi/DetailMumi";
import DeleteMumi from "@/components/ui/Modal/Mumi/DeleteMumi/DeleteMumi";
import AddMumi from "@/components/ui/Modal/Mumi/AddMumi/AddMumi";

const Generus = () => {
  const getInitials = (name: string | undefined) => {
    if (!name) return "";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0).toUpperCase() +
      names[names.length - 1].charAt(0).toUpperCase()
    );
  };

  const {
    dataGenerus,
    isLoadingGenerus,
    isRefetchingGenerus,
    refetchGenerus,
    selectedId,
    setSelectedId,
    filter,
    setFilter,
    dataJenjang,
    dataDesa,
  } = useGenerus();

  const addGenerus = useDisclosure();
  const deleteGenerus = useDisclosure();
  const updateGenerus = useDisclosure();

  const renderCell = useCallback(
    (generus: IGenerus, columnKey: React.Key) => {
      const cellValue = generus[columnKey as keyof typeof generus];
      const initial = getInitials(generus.nama);
      switch (columnKey) {
        case "nama":
          return (
            <div className="flex items-center gap-3 max-w-full">
              <Avatar
                src={
                  generus.foto
                    ? `${process.env.NEXT_PUBLIC_IMAGE}${generus.foto}`
                    : undefined
                }
                name={initial}
                showFallback
                className="cursor-pointer bg-blue-100 text-blue-700 text-xl font-bold md:text-2xl"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="font-medium text-gray-800 truncate">
                  {generus.nama}
                </span>
                <span className="text-xs text-gray-500">
                  {generus.tgl_lahir
                    ? `${Math.floor(
                        (Date.now() - new Date(generus.tgl_lahir).getTime()) /
                          (1000 * 60 * 60 * 24 * 365),
                      )} tahun`
                    : "-"}
                </span>
              </div>
            </div>
          );
        case "daerah":
          return generus.daerah?.name || "-";
        case "desa":
          return generus.desa?.name || "-";
        case "kelompok":
          return generus.kelompok?.name || "-";
        case "tgl_lahir":
          return (
            <span className="text-gray-700">
              {generus.tgl_lahir
                ? new Date(generus.tgl_lahir as string).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )
                : "-"}
            </span>
          );
        case "mahasiswa":
          return (
            <Chip
              color={cellValue === true ? "success" : "danger"}
              variant="flat"
              size="sm"
            >
              {cellValue === true ? "Aktif" : "Tidak Aktif"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(generus as IGenerus);
                updateGenerus.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(generus as IGenerus);
                deleteGenerus.onOpen();
              }}
              textButtonDetail="Detail Generus"
              textButtonDelete="Delete Generus"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteGenerus, setSelectedId, updateGenerus],
  );

  // langsung render DataTable tanpa searchParams
  const hasParams = true;

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Tambah Muda Mudi"
          columns={COLUMN_LIST_GENERUS}
          data={dataGenerus?.data || []}
          emptyContent="Muda - Mudi is empty"
          isLoading={isLoadingGenerus || isRefetchingGenerus}
          onClickButtonTopContent={addGenerus.onOpen}
          renderCell={renderCell}
          totalPages={dataGenerus?.pagination.totalPages || 0}
          dropdownContent={
            <div className="flex flex-wrap items-end gap-3 sm:gap-4">
              {/* Filter Jenis Kelamin */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">
                  Jenis Kelamin
                </label>
                <Select
                  selectedKeys={
                    filter.jenis_kelamin ? [filter.jenis_kelamin] : []
                  }
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      jenis_kelamin: e.target.value,
                    }))
                  }
                  placeholder="Jenis Kelamin"
                  className="w-full sm:w-40 min-w-25"
                  size="sm"
                  variant="flat"
                >
                  <SelectItem key="">Semua</SelectItem>
                  <SelectItem key="Laki-laki">Laki-laki</SelectItem>
                  <SelectItem key="Perempuan">Perempuan</SelectItem>
                </Select>
              </div>

              {/* Filter Jenjang */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">
                  Jenjang
                </label>
                <Select
                  selectedKeys={filter.jenjang ? [filter.jenjang] : []}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, jenjang: e.target.value }))
                  }
                  className="w-full sm:w-40 min-w-25"
                  size="sm"
                  placeholder="Jenjang"
                  variant="flat"
                >
                  <SelectItem key="">Semua</SelectItem>
                  {dataJenjang?.map((item: IJenjang) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>

              {/* Filter Desa */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">Desa</label>
                <Select
                  selectedKeys={filter.desa ? [filter.desa] : []}
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, desa: e.target.value }))
                  }
                  className="w-full sm:w-40 min-w-25"
                  size="sm"
                  placeholder="Desa"
                  variant="flat"
                >
                  <SelectItem key="">Semua</SelectItem>
                  {dataDesa?.map((item: IDesa) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
              </div>

              {/* Filter Usia */}
              <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full sm:w-auto">
                <div className="flex flex-col w-[48%] sm:w-auto">
                  <label className="text-xs text-gray-500 ml-1 mb-1">
                    Usia Min
                  </label>
                  <input
                    type="number"
                    placeholder="Min"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-24 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    value={filter.minUsia || ""}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        minUsia: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex flex-col w-[48%] sm:w-auto">
                  <label className="text-xs text-gray-500 ml-1 mb-1">
                    Usia Max
                  </label>
                  <input
                    type="number"
                    placeholder="Max"
                    className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-24 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                    value={filter.maxUsia || ""}
                    onChange={(e) =>
                      setFilter((prev) => ({
                        ...prev,
                        maxUsia: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          }
        />
      )}
      <AddMumi {...addGenerus} refetchGenerus={refetchGenerus} />
      <DeleteMumi
        {...deleteGenerus}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchGenerus={refetchGenerus}
      />
      <DetailMumi
        {...updateGenerus}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchGenerus={refetchGenerus}
      />
    </section>
  );
};

export default Generus;
