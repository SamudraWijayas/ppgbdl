"use client";

import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { ILogin } from "@/types/Auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { ToasterContext } from "@/contexts/ToasterContext";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please input your email or password"),
  password: yup.string().required("Please input your password"),
});

const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin) => {
    console.log("Payload dikirim:", payload);
    const result = await signIn("credentials", {
      ...payload,
      redirect: false,
      callbackUrl,
    });
    console.log("Hasil dari signIn:", result);
    if (result?.error && result?.status === 401) {
      throw new Error("Login Failed" + result.error);
    }
    return result;
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError: () => {
      console.log("Login error - setting toaster");
      setToaster({
        type: "error",
        message: "Your credential is wrong",
      });
    },
    onSuccess: () => {
      reset();
      setToaster({
        type: "success",
        message: "Login success",
      });
      router.push(callbackUrl);
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
