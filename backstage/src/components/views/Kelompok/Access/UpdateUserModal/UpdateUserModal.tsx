import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useUpdateUserModal from "./useUpdateUserModal";
import { Controller } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IUser } from "@/types/User";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchUser: () => void;
  selectedId: IUser | null;
  setSelectedId: Dispatch<SetStateAction<IUser | null>>;
}

const UpdateUserModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchUser,
    selectedId,
    setSelectedId,
  } = props;

  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleUpdateUser,
    isPendingMutateUpdateUser,
    isSuccessMutateUpdateUser,
    setValueUpdateUser,
  } = useUpdateUserModal(`${selectedId?.id}`);

  // close otomatis setelah update sukses
  useEffect(() => {
    if (isSuccessMutateUpdateUser) {
      onClose();
      refetchUser();
      setSelectedId(null);
    }
  }, [isSuccessMutateUpdateUser, onClose, refetchUser, setSelectedId]);

  useEffect(() => {
    if (selectedId) {
      setValueUpdateUser("fullName", `${selectedId?.fullName}`);
      setValueUpdateUser("username", `${selectedId?.username}`);
    }
  }, [selectedId, setValueUpdateUser]);

  const handleOnClose = () => {
    reset();
    onClose();
    setSelectedId(null);
  };

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleSubmitForm(handleUpdateUser)}>
        <ModalContent className="m-4">
          <ModalHeader>Update User</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold">Information</p>
              <div className="flex flex-col gap-4">
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      autoFocus
                      label="Full Name"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.fullName !== undefined}
                      errorMessage={errors.fullName?.message}
                    />
                  )}
                />
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      label="Username"
                      variant="bordered"
                      type="text"
                      isInvalid={errors.username !== undefined}
                      errorMessage={errors.username?.message}
                    />
                  )}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateUpdateUser}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateUpdateUser}
            >
              {isPendingMutateUpdateUser ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update User"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateUserModal;
