import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteKelompok from "./useDeleteKelompok";
import { IKelompok } from "@/types/Kelompok";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKelompok: () => void;
  selectedId: IKelompok | null;
  setSelectedId: Dispatch<SetStateAction<IKelompok | null>>;
}

const DeleteKelompok = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchKelompok,
  } = props;

  const {
    mutateDeleteKelompok,
    isPendingMutateDeleteKelompok,
    isSuccessMutateDeleteKelompok,
  } = useDeleteKelompok();

  useEffect(() => {
    if (isSuccessMutateDeleteKelompok) {
      onClose();
      refetchKelompok();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteKelompok, onClose, refetchKelompok, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kelompok</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this kelompok?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            variant="flat"
            onPress={() => {
              onClose();
              setSelectedId(null);
            }}
            disabled={isPendingMutateDeleteKelompok}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteKelompok}
            onPress={() => mutateDeleteKelompok(selectedId?.id || "")}
          >
            {isPendingMutateDeleteKelompok ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Kelompok"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteKelompok;
