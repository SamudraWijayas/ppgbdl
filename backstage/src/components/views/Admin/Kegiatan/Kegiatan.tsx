"use client";

import React, { useState } from "react";
import {
  Input,
  Button,
  Spinner,
  useDisclosure,
  Card,
  CardBody,
  Chip,
} from "@heroui/react";
import {
  Search,
  Calendar,
  MapPin,
  Target,
  ChevronRight,
  Trash2,
} from "lucide-react";
import useKegiatan from "./useKegiatan";
import { IKegiatan } from "@/types/Kegiatan";
import { useRouter } from "next/navigation";
import AddKegiatanModal from "./AddKegiatanModal";
import { QRCodeSVG } from "qrcode.react";
import DeleteKegiatan from "./DeleteKegiatan/DeleteKegiatan";

// Tentukan status
const statusColor: Record<
  "Berlangsung" | "Selesai" | "Akan Datang",
  "primary" | "success" | "warning"
> = {
  Berlangsung: "warning",
  Selesai: "success",
  "Akan Datang": "primary",
};

// Tentukan status berdasarkan tanggal
const getStatus = (
  start?: string | Date,
  end?: string | Date
): keyof typeof statusColor => {
  if (!start || !end) return "Akan Datang";

  const now = new Date();
  const startDate = new Date(start);
  const endDate = new Date(end);

  now.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  if (now < startDate) return "Akan Datang";
  if (now > endDate) return "Selesai";
  return "Berlangsung";
};

const formatTanggal = (dateString?: string | Date): string => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Kegiatan = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const {
    dataKegiatan,
    isLoadingKegiatan,
    refetchKegiatan,

    selectedId,
    setSelectedId,
  } = useKegiatan();
  const addKegiatan = useDisclosure();
  const deleteKegiatan = useDisclosure();

  const kegiatanList: IKegiatan[] = Array.isArray(dataKegiatan?.data)
    ? dataKegiatan.data
    : [];

  const filteredList = kegiatanList.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoadingKegiatan) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" label="Memuat kegiatan..." color="primary" />
      </div>
    );
  }
  const downloadQR = (id: string, filename: string) => {
    const el = document.getElementById(`qr-${id}`);

    if (!el || !(el instanceof SVGSVGElement)) {
      console.error("QR SVG element not found");
      return;
    }

    const svg = el;

    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const svgBlob = new Blob([svgStr], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL("image/png");

      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = `${filename}.png`;
      a.click();
    };

    img.src = url;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Aktivitas Kegiatan
          </h1>
          <p className="text-sm text-gray-500">
            Daftar semua kegiatan dan statusnya secara real-time.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <Input
            variant="bordered"
            placeholder="Cari kegiatan..."
            startContent={<Search className="w-4 h-4 text-gray-500" />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-72"
          />
          <Button color="primary" onPress={addKegiatan.onOpen}>
            Tambah
          </Button>
        </div>
      </div>

      {/* Modern List */}
      <Card className="shadow-md border-none">
        <CardBody className="divide-y divide-gray-100 dark:divide-gray-800 p-0">
          {filteredList.length > 0 ? (
            filteredList.map((item) => {
              // const color = getStatusColor(item.startDate, item.endDate);
              const status = getStatus(item.startDate, item.endDate);
              const color = statusColor[status];

              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                  onClick={() => router.push(`/admin/kegiatan/${item.id}`)}
                >
                  {/* Left: Thumbnail */}
                  <div
                    className="flex flex-col items-center gap-2"
                    onClick={(e) => e.stopPropagation()} // biar tidak ikut navigate
                  >
                    <QRCodeSVG
                      id={`qr-${item.id}`}
                      value={item.id ?? ""}
                      size={100}
                    />

                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      onPress={() =>
                        downloadQR(item.id!, item.name ?? "qr-kegiatan")
                      }
                    >
                      Download
                    </Button>
                  </div>

                  {/* Middle: Info */}
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Judul kegiatan */}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate hover:text-primary transition-colors">
                      {item.name}
                    </h3>

                    {/* Info utama: tanggal, tingkat, status */}
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                        <span>{formatTanggal(item.startDate)}</span>
                      </div>

                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                        <span className="capitalize">
                          {item.tingkat?.toLowerCase()}
                        </span>
                      </div>

                      <Chip
                        color={color}
                        variant="flat"
                        size="sm"
                        className="text-xs font-semibold capitalize"
                      >
                        {status}
                      </Chip>
                    </div>

                    {/* Lokasi & Sasaran */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                      {/* Lokasi */}
                      <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                        <span className="truncate">
                          {item.daerah?.name ??
                            item.desa?.name ??
                            item.kelompok?.name ??
                            "Tidak diketahui"}
                        </span>
                      </div>

                      {/* Sasaran */}
                      {item.sasaran?.length ? (
                        <div className="flex items-center gap-1">
                          {/* <span className="font-medium">Sasaran:</span> */}
                          <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800/50 px-2 py-1 rounded-md">
                            {item.sasaran
                              .map((s) => s.jenjang?.name)
                              .join(", ")}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Right: Icon */}
                  {/* Right: Action */}
                  <div
                    className="flex items-center gap-2"
                    onClick={(e) => e.stopPropagation()} // cegah navigate
                  >
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => {
                        setSelectedId(item);
                        deleteKegiatan.onOpen();
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>

                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center text-gray-500">
              Tidak ada kegiatan ditemukan.
            </div>
          )}
        </CardBody>
      </Card>

      {/* Modal Tambah Kegiatan */}
      <AddKegiatanModal {...addKegiatan} refetchKegiatan={refetchKegiatan} />
      <DeleteKegiatan
        {...deleteKegiatan}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchKegiatan={refetchKegiatan}
      />

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Kegiatan;
