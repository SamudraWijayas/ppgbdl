import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Spinner,
} from "@heroui/react";
import useSetPassword from "./useSetPassword";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Controller } from "react-hook-form";
import { passwordRules } from "@/utils/passwordRules";
import RulesPassword from "@/components/ui/RulesPassword/RulesPassword";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetch: () => void;
}

const SetPassword = (props: PropTypes) => {
  const { isOpen, onClose, onOpenChange, refetch } = props;
  const [showPassword, setShowPassword] = useState(false);

  const {
    controlSetPassword,
    errorsSetPassword,
    handleSubmitSetPassword,

    handleSetPassword,
    isPendingMutateSetPassword,

    passwordValue,
  } = useSetPassword(() => {
    onClose();
    refetch();
  });



  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose}>
      <form
        onSubmit={handleSubmitSetPassword(handleSetPassword)}
        className="flex flex-col gap-4"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Set Password
          </ModalHeader>
          <ModalBody>
            <Controller
              name="password"
              control={controlSetPassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="New Password"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Input your password"
                  isInvalid={errorsSetPassword.password !== undefined}
                  errorMessage={errorsSetPassword.password?.message}
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
              control={controlSetPassword}
              render={({ field }) => (
                <Input
                  {...field}
                  label="Konfirmasi Password"
                  variant="bordered"
                  labelPlacement="outside"
                  placeholder="Input your conf password"
                  isInvalid={errorsSetPassword.password !== undefined}
                  errorMessage={errorsSetPassword.password?.message}
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
            <div className="mt-2 flex flex-col gap-1">
              <RulesPassword
                valid={passwordRules.minLength(passwordValue)}
                label="Minimal 6 karakter"
              />
              <RulesPassword
                valid={passwordRules.hasUppercase(passwordValue)}
                label="Mengandung huruf besar"
              />
              <RulesPassword
                valid={passwordRules.hasNumber(passwordValue)}
                label="Mengandung angka"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              disabled={isPendingMutateSetPassword}
            >
              {isPendingMutateSetPassword ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Set Password"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default SetPassword;
