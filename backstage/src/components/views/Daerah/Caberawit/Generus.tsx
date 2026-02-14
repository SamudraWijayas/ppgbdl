"use client";

import React, { ReactNode, useCallback, useEffect } from "react";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import { useRouter, useSearchParams } from "next/navigation";
import DropdownAction from "@/components/commons/DropdownAction";
import { Avatar, Chip, Select, SelectItem, useDisclosure } from "@heroui/react";
import useGenerus from "./useGenerus";
import { COLUMN_LIST_GENERUS } from "./Generus.constant";
import { IGenerus } from "@/types/Generus";
import AddGenerus from "../../../ui/Modal/Caberawit/AddCaberawit";
import DeleteGenerus from "../../../ui/Modal/Caberawit/DeleteCaberawit";
import DetailGenerus from "../../../ui/Modal/Caberawit/DetailCaberawit";
import { IKelasJenjang } from "@/types/KelasJenjang";

const Generus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    dataKelas,
  } = useGenerus();

  const { setUrl } = useChangeUrl();

  const addGenerus = useDisclosure();
  const deleteGenerus = useDisclosure();
  const updateGenerus = useDisclosure();

  // ✅ App Router tidak punya isReady, jadi cek param lewat searchParams
  useEffect(() => {
    if (searchParams) {
      setUrl();
    }
  }, [searchParams, setUrl]);

  const renderCell = useCallback(
    (generus: IGenerus, columnKey: React.Key) => {
      const cellValue = generus[columnKey as keyof typeof generus];
      const initial = getInitials(generus.nama);
      switch (columnKey) {
        case "nama":
          return (
            <div className="flex items-center gap-3 max-w-full">
              {/* <Image
                src={
                  generus.foto
                    ? `${process.env.NEXT_PUBLIC_IMAGE}${generus.foto}`
                    : "/images/default-avatar.png" // fallback lokal
                }
                alt={generus.nama || "Foto Generus"}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover flex-shrink-0"
              /> */}
              <Avatar
                src={
                  generus.foto
                    ? `${process.env.NEXT_PUBLIC_IMAGE}${generus.foto}`
                    : undefined
                }
                name={initial}
                showFallback
                className={`cursor-pointer bg-blue-100 text-blue-700 text-xl font-bold md:text-2xl`}
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

        case "kelasJenjang":
          return generus.kelasJenjang?.name || "-";

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
              onClickRaport={() => {
                router.push(`/area/caberawit/${generus.id}`);
              }}
              onClickDelete={() => {
                setSelectedId(generus as IGenerus);
                deleteGenerus.onOpen();
              }}
              textButtonDetail="Detail Generus"
              textButtonDelete="Delete Generus"
              textButtonRaport="Lihat Raport"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [deleteGenerus, router, setSelectedId, updateGenerus],
  );

  // ✅ Ganti Object.keys(query).length > 0 → searchParams.toString() !== ""
  const hasParams = searchParams.toString() !== "";

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Tambah Caberawit"
          columns={COLUMN_LIST_GENERUS}
          data={dataGenerus?.data || []}
          emptyContent="Caberawit is empty"
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

              {/* filter jenjang */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">Kelas</label>
                <Select
                  selectedKeys={
                    filter.kelasjenjang ? [filter.kelasjenjang] : []
                  }
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      kelasjenjang: e.target.value,
                    }))
                  }
                  className="w-full sm:w-40 min-w-25"
                  size="sm"
                  placeholder="Kelas"
                  variant="flat"
                >
                  <SelectItem key="">Semua</SelectItem>
                  {dataKelas?.map((item: IKelasJenjang) => (
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
      <AddGenerus {...addGenerus} refetchGenerus={refetchGenerus} />
      <DeleteGenerus
        {...deleteGenerus}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchGenerus={refetchGenerus}
      />
      <DetailGenerus
        {...updateGenerus}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchGenerus={refetchGenerus}
      />
    </section>
  );
};

export default Generus;
