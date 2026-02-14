import { useRouter, useSearchParams } from "next/navigation";
import React, { ReactNode, useCallback, useEffect } from "react";
import { IGenerus } from "@/types/Generus";
import DropdownAction from "@/components/commons/DropdownAction";
import { Avatar, Select, SelectItem, useDisclosure } from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrls";
import DataTable from "@/components/ui/DataTable";
import useCaberawit from "./useCaberawit";
import { COLUMN_LIST_GENERUS } from "./Caberawit.constant";
import AddCaberawit from "@/components/ui/Modal/Caberawit/AddCaberawit/AddGenerus";
import DeleteCaberawit from "@/components/ui/Modal/Caberawit/DeleteCaberawit/DeleteCaberawit";
import DetailCaberawit from "@/components/ui/Modal/Caberawit/DetailCaberawit/DetailCaberawit";
import { IKelasJenjang } from "@/types/KelasJenjang";
import { ICaberawit } from "@/types/Caberawit";

const Caberawit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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
  } = useCaberawit();

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
    (generus: ICaberawit, columnKey: React.Key) => {
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

        case "wali":
          return generus.wali?.fullName || "-";
        case "daerah":
          return generus.daerah?.name || "-";

        case "desa":
          return generus.desa?.name || "-";

        case "kelompok":
          return generus.kelompok?.name || "-";
        case "kelasJenjang":
          return generus.kelasJenjang?.name || "-";
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
              onClickRaport={() => {
                router.push(`/group/raport/${generus.id}?source=list-caberawit-page`);
              }}
              textButtonDetail="Detail Caberawit"
              textButtonRaport="Lihat Rapor"
              textButtonDelete="Delete Caberawit"
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
          buttonTopContentLabel="Create Generus"
          columns={COLUMN_LIST_GENERUS}
          data={dataGenerus?.data || []}
          emptyContent="Generus is empty"
          isLoading={isLoadingGenerus || isRefetchingGenerus}
          onClickButtonTopContent={addGenerus.onOpen}
          renderCell={renderCell}
          totalPages={dataGenerus?.pagination.totalPages || 0}
          dropdownContent={
            <div className="flex flex-wrap items-end gap-3 sm:gap-4">
              {/* Filter Jenis Kelamin */}
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 ml-1 mb-1">
                  Gender
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
                  className="w-full sm:w-40 min-w-[100px]"
                  size="sm"
                  placeholder="Jenis Kelamin"
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
                  className="w-full sm:w-40 min-w-[100px]"
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
      <AddCaberawit {...addGenerus} refetchGenerus={refetchGenerus} />
      <DeleteCaberawit
        {...deleteGenerus}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchGenerus={refetchGenerus}
      />
      <DetailCaberawit
        {...updateGenerus}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchGenerus={refetchGenerus}
      />
    </section>
  );
};

export default Caberawit;
