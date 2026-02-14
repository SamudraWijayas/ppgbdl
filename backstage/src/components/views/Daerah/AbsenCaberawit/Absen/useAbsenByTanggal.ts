import { useQuery } from "@tanstack/react-query";
import absenServices from "@/services/absen.service";

const useAbsenByTanggal = (tanggal?: string) => {
  return useQuery({
    queryKey: ["AbsenByTanggal", tanggal],
    queryFn: () => absenServices.getAbsenByTanggal(tanggal!),
    enabled: !!tanggal,
  });
};

export default useAbsenByTanggal;


// import { useQuery } from "@tanstack/react-query";
// import absenServices from "@/services/absen.service";
// import { AbsenByTanggalResponse } from "@/types/Absen";

// const useAbsenByTanggal = (tanggal?: string) => {
//   return useQuery<AbsenByTanggalResponse>({
//     queryKey: ["AbsenByTanggal", tanggal],
//     queryFn: () => absenServices.getAbsenByTanggal(tanggal!),
//     enabled: !!tanggal,
//   });
// };

// export default useAbsenByTanggal;

