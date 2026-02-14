"use client";

import React, { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Camera, Image as ImageIcon, Zap } from "lucide-react";
import useScanAbsen from "./useScanAbsen";

const ScanAbsen = () => {
  const [result, setResult] = useState<string | null>(null);
  const { handleScan, isScanning } = useScanAbsen();

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full max-w-md mx-auto bg-white dark:bg-black/10 text-black dark:text-white overflow-hidden">
      {/* Area Scanner */}
      <div className="relative w-72 h-72 border-2 border-white/40 rounded-3xl overflow-hidden">
        <Scanner
          onScan={(result) => {
            if (!result || result.length === 0 || isScanning) return;

            const text = result[0].rawValue; // 🔑 ambil isi QR

            setResult(text);
            handleScan(text);
          }}
          onError={(error) => {
            console.error(error);
          }}
          constraints={{ facingMode: "environment" }}
          classNames={{
            container: "w-full h-full",
            video: "w-full h-full object-cover",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/70 animate-scan" />
      </div>

      {/* Status */}
      <p className="mt-8 text-sm opacity-70">
        {isScanning
          ? "⏳ Memproses absensi..."
          : result
          ? `✅ QR terbaca`
          : "Arahkan kamera ke QR kegiatan"}
      </p>

      {/* Tombol bawah */}
      <div className="absolute bottom-10 flex items-center justify-center gap-8 bg-black/40 px-6 py-3 rounded-full backdrop-blur-lg z-10">
        <Camera size={22} />
        <Zap size={22} />
        <ImageIcon size={22} />
      </div>
    </div>
  );
};

export default ScanAbsen;
