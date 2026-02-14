"use client";
import React from "react";
import useMurid from "./useMurid";
import { EllipsisVertical, FolderPlus } from "lucide-react";
import { IMurid } from "@/types/Caberawit";
import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  useDisclosure,
} from "@heroui/react";
import AddMurid from "./AddMurid/AddMurid";
import DeleteMurid from "./DeleteMurid/DeleteMurid";
import Link from "next/link";

const Murid = () => {
  const {
    dataMurid,
    isLoadingMurid,
    refetchMurid,

    selectedIds,
    setSelectedIds,
    selectedId,
  } = useMurid();
  const addMurid = useDisclosure();
  const deleteMurid = useDisclosure();

  const muridList = dataMurid?.data ?? [];

  if (isLoadingMurid) {
    return (
      <div className="p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MuridSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {muridList.length === 0 ? (
        /* ================= EMPTY STATE ================= */
        <div className="flex flex-col items-center justify-center text-center h-[60vh]">
          <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center mb-4">
            <FolderPlus className="text-white w-6 h-6" />
          </div>

          <h2 className="text-lg font-semibold text-black">Belum ada Siswa</h2>

          <p className="text-gray-600 mt-1 max-w-sm">
            Kamu belum menambahkan data siswa. Silakan tambahkan siswa baru.
          </p>

          <button
            onClick={addMurid.onOpen}
            className="mt-6 px-5 py-2 rounded-lg bg-blue-500 text-white font-medium cursor-pointer"
          >
            Tambah Siswa
          </button>
        </div>
      ) : (
        /* ================= LIST DATA ================= */
        <div>
          <div className="flex items-center gap-3 mb-6">
            {/* Tambah Murid — always visible */}
            <button
              onClick={addMurid.onOpen}
              className="
      inline-flex items-center gap-2
      px-5 py-2
      rounded-xl
      bg-blue-600 text-white
      font-semibold text-sm
      hover:bg-blue-700
      active:scale-95
      transition-all
    "
            >
              + Tambah Murid
            </button>

            {/* Delete — muncul kalau ada selection */}
            {selectedIds.length > 0 && (
              <button
                onClick={() => deleteMurid.onOpen()}
                className="
        inline-flex items-center gap-2
        px-4 py-2
        rounded-xl
        bg-red-50 text-red-600
        border border-red-200
        font-semibold text-sm
        hover:bg-red-100 hover:text-red-700
        active:scale-95
        transition-all
        animate-in fade-in slide-in-from-left-2
      "
              >
                Hapus
                <span
                  className="
        px-2 py-0.5
        rounded-full
        bg-red-600 text-white
        text-xs font-bold
      "
                >
                  {selectedIds.length}
                </span>
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {muridList.map((murid: IMurid) => {
              const initial = murid.nama?.charAt(0).toUpperCase();
              const isSelected = selectedIds.includes(murid.id);

              return (
                <div
                  key={murid.id}
                  className={`group relative rounded-2xl border bg-white p-5
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
        ${
          isSelected
            ? "border-[#293c88] ring-2 ring-[#293c88]/20 -translate-y-2"
            : "border-gray-200"
        }`}
                >
                  {/* ===== HEADER ===== */}
                  <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#293c88] text-white flex items-center justify-center font-semibold text-lg">
                        {initial}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {murid.nama}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {murid.jenis_kelamin} • {murid.jenjang?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        isSelected={isSelected}
                        onValueChange={(checked) => {
                          setSelectedIds((prev) =>
                            checked
                              ? [...prev, murid.id]
                              : prev.filter((id) => id !== murid.id),
                          );
                        }}
                        color="primary"
                        radius="sm"
                      />
                      <Dropdown>
                        <DropdownTrigger>
                          <Button isIconOnly size="sm" variant="light">
                            <EllipsisVertical className="text-default-700" />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Static Actions">
                          <DropdownItem key="rapot">
                            <Link
                              href={`/group/raport/${murid.id}?source=student-page`}
                            >
                              Lihat Rapor
                            </Link>
                          </DropdownItem>
                          <DropdownItem key="absen">
                            <Link
                              href={`/group/absent-caberawit/${murid.id}?source=student-page`}
                            >
                              Lihat Absen
                            </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* ===== BODY ===== */}
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-400">Kelas</p>
                      <p className="font-medium text-gray-800">
                        {murid.kelasJenjang?.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-400">Orang Tua</p>
                      <p className="font-medium text-gray-800">
                        {murid.nama_ortu}
                      </p>
                    </div>
                    {/* ===== DELETE BUTTON ===== */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <AddMurid {...addMurid} refetchMurid={refetchMurid} />
      <DeleteMurid
        {...deleteMurid}
        refetchMurid={refetchMurid}
        selectedIds={
          selectedIds.length ? selectedIds : selectedId ? [selectedId] : []
        }
        setSelectedIds={setSelectedIds}
      />
    </div>
  );
};

const MuridSkeleton = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      {/* HEADER */}
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 rounded-sm" />
          <Skeleton className="w-6 h-6 rounded-md" />
        </div>
      </div>

      {/* BODY */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>

        <div className="space-y-1">
          <Skeleton className="h-3 w-20 rounded-md" />
          <Skeleton className="h-4 w-24 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default Murid;
