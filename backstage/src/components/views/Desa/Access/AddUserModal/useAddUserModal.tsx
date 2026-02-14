"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import authServices from "@/services/auth.service";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import kelompokServices from "@/services/kelompok.service";
import userServices from "@/services/user.service";
import { IUserForm } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("Please input your fullname"),
  username: yup.string().required("Please input your username"),
  password: yup
    .string()
    .min(8, "Minimal 8 character")
    .required("Please input your password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords not match")
    .required("Please input your confirm password"),
  role: yup.string().required("Please select a role"),
});
const useAddUserModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    // Di App Router, router selalu tersedia, jadi ini opsional
    setIsReady(true);
  }, []);
  const getProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const { data: dataProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: isReady,
  });
  const idDesa = dataProfile?.desaId;

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const selectedRole = watch("role");

  const addUser = async (payload: IUserForm) => {
    const res = await userServices.addUser(payload);
    return res;
  };

  const {
    mutate: mutateAddUser,
    isPending: isPendingMutateAddUser,
    isSuccess: isSuccessMutateAddUser,
  } = useMutation({
    mutationFn: addUser,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Successfully added user!",
      });
      reset();
    },
  });

  const handleAddUser = (data: IUserForm) => {
    const payload = {
      ...data,
      desaId: idDesa ?? undefined, // 👈 ambil dari profile
    };

    mutateAddUser(payload);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
    selectedRole,
  };
};

export default useAddUserModal;
