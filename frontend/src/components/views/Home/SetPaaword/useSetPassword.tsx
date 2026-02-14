import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/service/auth.service";
import { ISetPassword } from "@/types/Auth";
import { ErrorResponse } from "@/types/Response";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as yup from "yup";

const schemaSetPassword = yup.object().shape({
  password: yup.string().required("Please insert your new password"),
  confirmPassword: yup
    .string()
    .required("Please insert your confirm new password"),
});
const useSetPassword = (onSuccessCallback?: () => void) => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control: controlSetPassword,
    handleSubmit: handleSubmitSetPassword,
    formState: { errors: errorsSetPassword },
    reset: resetSetPassword,
    setValue: setValueSetPassword,
  } = useForm({
    resolver: yupResolver(schemaSetPassword),
  });
  const passwordValue = useWatch({
    control: controlSetPassword,
    name: "password",
    defaultValue: "",
  });

  const SetPassword = async (payload: ISetPassword) => {
    const { data } = await authServices.setPassword(payload);
    return data;
  };

  const {
    mutate: mutateSetPassword,
    isPending: isPendingMutateSetPassword,
    isSuccess: isSuccessMutateSetPassword,
  } = useMutation({
    mutationFn: (payload: ISetPassword) => SetPassword(payload),
    onError: (error: AxiosError<ErrorResponse>) => {
      const messages = error?.response?.data?.meta?.message;

      if (Array.isArray(messages)) {
        setToaster({
          type: "error",
          message: messages.join(", "),
        });
      } else {
        setToaster({
          type: "error",
          message: messages || "Gagal set password",
        });
      }
    },

    onSuccess: () => {
      resetSetPassword();
      setValueSetPassword("password", "");
      setValueSetPassword("confirmPassword", "");
      setToaster({
        type: "success",
        message: "Success Set password",
      });
      onSuccessCallback?.();
    },
  });

  const handleSetPassword = (data: ISetPassword) => mutateSetPassword(data);

  return {
    controlSetPassword,
    errorsSetPassword,
    handleSubmitSetPassword,

    handleSetPassword,
    isPendingMutateSetPassword,
    isSuccessMutateSetPassword,

    passwordValue,
  };
};

export default useSetPassword;
