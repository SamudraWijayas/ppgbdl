import { ToasterContext } from "@/contexts/ToasterContext";
import userServices from "@/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";

const useDeleteUserModal = () => {
  const { setToaster } = useContext(ToasterContext);

  const deleteUser = async (id: string) => {
    const res = await userServices.deleteUser(id);
    return res;
  };

  const {mutate: mutateDeleteUser, isPending: isPendingMutateDeleteUser, isSuccess: isSuccessMutateDeleteUser} = useMutation({
    mutationFn: deleteUser,
    onError: (error: Error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "User deleted successfully",
      });
    },
  });

  return {
   mutateDeleteUser,
   isPendingMutateDeleteUser,
   isSuccessMutateDeleteUser,
  };
};

export default useDeleteUserModal;
