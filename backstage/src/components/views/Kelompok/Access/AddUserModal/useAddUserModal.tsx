"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import useProfile from "@/hooks/useProfile";

import userServices from "@/services/user.service";
import { IUserForm } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
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
  const { profile } = useProfile();
  const idKelompok = profile?.kelompokId;

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    watch,
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
      kelompokId: idKelompok ?? undefined, // 👈 ambil dari profile
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
