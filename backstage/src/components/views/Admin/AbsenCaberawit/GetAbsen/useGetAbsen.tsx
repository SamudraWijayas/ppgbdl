import absenServices from "@/services/absen.service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const useGetAbsen = (bulan: number, tahun: number) => {
  const params = useParams();
  const id = params?.id as string;
  const getAbsen = async () => {
    const query = `bulan=${bulan}&tahun=${tahun}`;
    const { data } = await absenServices.getAbsenByCaberawit(id, query);
    return data.data;
  };

  const { data: dataAbsen } = useQuery({
    queryKey: ["AbsenByGenerus", id, bulan, tahun],
    enabled: !!id,
    queryFn: getAbsen,
  });
  return {
    dataAbsen,
  };
};

export default useGetAbsen;
