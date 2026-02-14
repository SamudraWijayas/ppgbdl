import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateProfile = yup.object().shape({
  nama: yup.string().required("Please input name"),
  tgl_lahir: yup.string().required("Please input tanggal lahir"),
  jenis_kelamin: yup.string().required("Please select jenis kelamin"),
  gol_darah: yup.string().required("Please select golongan darah"),
  nama_ortu: yup.string().required("Please input nama orang tua"),
});

const useProfileDrawer = () => {
  const {
    control: controlUpdateProfile,
    handleSubmit: handleSubmitUpdateProfile,
    formState: { errors: errorsUpdateProfile },
    reset: resetUpdateProfile,
    setValue: setValueUpdateProfile,
  } = useForm({
    resolver: yupResolver(schemaUpdateProfile),
  });

  return {
    controlUpdateProfile,
    errorsUpdateProfile,
    handleSubmitUpdateProfile,
    resetUpdateProfile,
    setValueUpdateProfile,
  };
};

export default useProfileDrawer;
