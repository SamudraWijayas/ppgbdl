"use client";

import { ToasterContext } from "@/contexts/ToasterContext";
import daerahServices from "@/services/daerah.service";
import desaServices from "@/services/desa.service";
import kelompokServices from "@/services/kelompok.service";
import userServices from "@/services/user.service";
import { IUserForm } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
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
  daerahId: yup.string().when("role", {
    is: (val: string) => ["DAERAH", "SUBDAERAH"].includes(val),
    then: (schema) => schema.required("Daerah wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
  desaId: yup.string().when("role", {
    is: (val: string) => ["DESA", "SUBDESA"].includes(val),
    then: (schema) => schema.required("Desa wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
  kelompokId: yup.string().when("role", {
    is: (val: string) => ["KELOMPOK", "SUBKELOMPOK"].includes(val),
    then: (schema) => schema.required("Kelompok wajib diisi"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
const useAddUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

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

  const { data: dataDaerah } = useQuery({
    queryKey: ["Daerah"],
    queryFn: () => daerahServices.getDaerah(),
    enabled: ["DAERAH", "SUBDAERAH"].includes(selectedRole ?? ""),
  });
  const { data: dataDesa } = useQuery({
    queryKey: ["Desa"],
    queryFn: () => desaServices.getDesa(),
    enabled: ["DESA", "SUBDESA"].includes(selectedRole ?? ""),
  });
  const { data: dataKelompok } = useQuery({
    queryKey: ["Kelompok"],
    queryFn: () => kelompokServices.getKelompok(),
    enabled: ["KELOMPOK", "SUBKELOMPOK"].includes(selectedRole ?? ""),
  });

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

  const handleAddUser = (data: IUserForm) => mutateAddUser(data);

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddUser,
    isPendingMutateAddUser,
    isSuccessMutateAddUser,
    selectedRole,

    dataDaerah,
    dataDesa,
    dataKelompok
  };
};

export default useAddUserModal;
