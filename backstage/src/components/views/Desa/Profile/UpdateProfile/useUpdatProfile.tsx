import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schemaUpdateProfile = yup.object().shape({
  fullName: yup.string().required("Please insert your fullname"),
  gender: yup.string().required("Please insert your gender"),
});

const useUpdateProfile = () => {
  const {
    control: controlUpdateProfile,
    handleSubmit: handleSubmitUpdateProfile,
    formState: { errors: errorsUpdateProfile },
    reset: resetUpdateProfile,
    setValue: setValueUpdateProfile,
  } = useForm({
    resolver: yupResolver(schemaUpdateProfile),
    defaultValues: {
      fullName: "",
    },
  });

  return {
    controlUpdateProfile,
    errorsUpdateProfile,
    handleSubmitUpdateProfile,
    resetUpdateProfile,
    setValueUpdateProfile,
  };
};

export default useUpdateProfile;
