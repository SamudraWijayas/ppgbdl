import { IProfile } from "@/types/Auth";
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
import React from "react";
import useUpdateProfile from "./useUpdatProfile";
import { Controller } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  refetchProfile: () => void;
}

const UpdateProfile = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    dataProfile,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;

  const {
    controlUpdateProfile,
    errorsUpdateProfile,
    handleSubmitUpdateProfile,
    resetUpdateProfile,
    setValueUpdateProfile,
  } = useUpdateProfile();

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form onSubmit={handleSubmitUpdateProfile(onUpdate)}>
        <ModalContent>
          <ModalHeader>Tambah Desa</ModalHeader>
          <ModalBody>
            {/* Form fields go here */}
            <Controller
              name="fullName"
              control={controlUpdateProfile}
              render={({ field }) => (
                <Input
                  {...field}
                  autoFocus
                  label="fullName"
                  variant="bordered"
                  type="text"
                  isInvalid={errorsUpdateProfile.fullName !== undefined}
                  errorMessage={errorsUpdateProfile.fullName?.message}
                  className="mb-2"
                />
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              variant="flat"
              onPress={onClose}
              disabled={isPendingUpdate}
            >
              Cancel
            </Button>
            <Button color="primary" type="submit" disabled={isPendingUpdate}>
              {isPendingUpdate ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Tambah Desa"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdateProfile;
