import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useUpdatePassword from "./useUpdatPassword";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
}

const UpdatePassword = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange } = props;
  const [showPassword, setShowPassword] = useState(false);

  const {
    controlUpdatePassword,
    errorsUpdatePassword,
    handleSubmitUpdatePassword,
    handleUpdatePassword,
    isPendingMutateUpdatePassword,
  } = useUpdatePassword();

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      onClose={onClose}
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
      >
        <ModalContent>
          <ModalHeader>Update Password</ModalHeader>
          <ModalBody>
            <Controller
              name="oldPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Old Password"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Input your old password"
                  isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                  errorMessage={errorsUpdatePassword.oldPassword?.message}
                  type="password"
                />
              )}
            />
            <Controller
              name="password"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Old Password"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Input your old password"
                  isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                  errorMessage={errorsUpdatePassword.oldPassword?.message}
                  type={showPassword ? "text" : "password"}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={controlUpdatePassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="New Password"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Input your new password"
                  isInvalid={errorsUpdatePassword.password !== undefined}
                  errorMessage={errorsUpdatePassword.password?.message}
                  type={showPassword ? "text" : "password"}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />
              )}
            />
            <Button
              color="primary"
              className="mt-2 disabled:bg-default-500"
              type="submit"
              disabled={isPendingMutateUpdatePassword}
            >
              {isPendingMutateUpdatePassword ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Update Password"
              )}
            </Button>
          </ModalBody>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default UpdatePassword;
