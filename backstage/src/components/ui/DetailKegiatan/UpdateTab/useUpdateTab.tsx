import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import daerahServices from "@/services/daerah.service";
import { DateValue } from "@internationalized/date";
import desaServices from "@/services/desa.service";
import kelompokServices from "@/services/kelompok.service";
import jenjangServices from "@/services/jenjang.service";

const schemaUpdateKegiatan = yup.object().shape({
  name: yup.string().required("Please input name"),
  startDate: yup.mixed<DateValue>().required("Please select start date"),
  endDate: yup.mixed<DateValue>().required("Please select end date"),
  tingkat: yup
    .string()
    .oneOf(["DAERAH", "DESA", "KELOMPOK"])
    .required("Tingkat wajib diisi"),

  targetType: yup
    .string()
    .oneOf(["JENJANG", "MAHASISWA", "USIA"])
    .required("Target wajib dipilih"),
  daerahId: yup.string(),
  desaId: yup.string(),
  kelompokId: yup.string(),
  jenjangIds: yup
    .array()
    .of(yup.string().required())
    .required("Please input jenjang"),

  minUsia: yup
    .number()
    .nullable()
    .when("targetType", {
      is: "USIA",
      then: (s) => s.required("Usia minimal wajib diisi"),
    }),

  maxUsia: yup
    .number()
    .nullable()
    .when("targetType", {
      is: "USIA",
      then: (s) => s.required("Usia maksimal wajib diisi"),
    }),
});

const useUpdateTab = () => {
  const {
    control: controlUpdateKegiatan,
    handleSubmit: handleSubmitUpdateKegiatan,
    formState: { errors: errorsUpdateKegiatan },
    reset: resetUpdateKegiatan,
    setValue: setValueUpdateKegiatan,
    watch,
  } = useForm({
    resolver: yupResolver(schemaUpdateKegiatan),
  });

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => daerahServices.getDaerah(),
  });
  const { data: dataDesa } = useQuery({
    queryKey: ["Desa"],
    queryFn: () => desaServices.getDesa(),
  });
  const { data: dataKelompok } = useQuery({
    queryKey: ["Kelompok"],
    queryFn: () => kelompokServices.getKelompok(),
  });
  const { data: dataJenjang } = useQuery({
    queryKey: ["Jenjang"],
    queryFn: () => jenjangServices.getJenjang(),
  });

  console.log("jenjang", dataJenjang);

  return {
    controlUpdateKegiatan,
    handleSubmitUpdateKegiatan,
    errorsUpdateKegiatan,
    resetUpdateKegiatan,
    setValueUpdateKegiatan,
    dataDaerah,
    dataDesa,
    dataKelompok,
    dataJenjang,
    watch,
  };
};

export default useUpdateTab;
