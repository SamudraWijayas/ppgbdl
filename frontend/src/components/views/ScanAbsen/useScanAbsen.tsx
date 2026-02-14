import { ToasterContext } from "@/contexts/ToasterContext";
import kegiatanServices from "@/service/api.service";
import { ApiResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext, useRef } from "react";

const useScanAbsen = () => {
  const { setToaster } = useContext(ToasterContext);
  const scannedRef = useRef(false);

  const {
    mutate: scanAbsen,
    data,
    isPending,
  } = useMutation({
    mutationFn: (kegiatanId: string) =>
      kegiatanServices.scanBarcode(kegiatanId).then((res) => res.data),

    onSuccess: (res: ApiResponse) => {
      setToaster({
        type: "success",
        message: res.meta.message,
      });
    },

    onError: (err: AxiosError<ApiResponse>) => {
      scannedRef.current = false; // boleh scan ulang
      const message =
        err?.response?.data?.meta?.message ?? "❌ Terjadi kesalahan";
      setToaster({
        type: "error",
        message,
      });
    },
  });

  const handleScan = (kegiatanId: string) => {
    if (scannedRef.current || isPending) return;

    scannedRef.current = true;
    scanAbsen(kegiatanId);
  };

  return {
    handleScan,
    isScanning: isPending,
    data,
  };
};

export default useScanAbsen;
