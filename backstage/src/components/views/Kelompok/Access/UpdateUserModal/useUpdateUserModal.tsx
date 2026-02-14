import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user.service";
import { IUser } from "@/types/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  fullName: yup.string().required("please input your fullname"),
  username: yup.string().required("please input your username"),
});

const useUpdateUserModal = (selectedId?: string | null) => {
  const { setToaster } = useContext(ToasterContext);

  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateUser,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: "",
      username: "",
    },
  });

  // update user by selectedId
  const updateUser = async (payload: IUser) => {
    if (!selectedId) throw new Error("No user selected");
    const { data } = await userServices.updateUser(selectedId, payload);
    return data.data;
  };

  const {
    mutate: mutateUpdateUser,
    isPending: isPendingMutateUpdateUser,
    isSuccess: isSuccessMutateUpdateUser,
  } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success update user",
      });
      reset();
    },
  });

  const handleUpdateUser = (data: IUser) => {
    mutateUpdateUser(data);
  };

  // fungsi ambil detail user untuk prefill form
  const fetchUserById = async (id: string) => {
    const res = await userServices.getUserById(id);
    return res.data.data;
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateUser,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
    setValueUpdateUser,
    fetchUserById,
  };
};

export default useUpdateUserModal;
