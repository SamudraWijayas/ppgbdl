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
import useDeleteKate from "./useDeleteKate";
import { IKateIndikator } from "@/types/KategoriIndikator";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKate: () => void;
  selectedId: IKateIndikator | null;
  setSelectedId: Dispatch<SetStateAction<IKateIndikator | null>>;
}

const DeleteKate = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchKate,
  } = props;

  const {
    mutateDeleteKate,
    isPendingMutateDeleteKate,
    isSuccessMutateDeleteKate,
  } = useDeleteKate();

  useEffect(() => {
    if (isSuccessMutateDeleteKate) {
      onClose();
      refetchKate();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteKate, onClose, refetchKate, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kate</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kate?
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
            disabled={isPendingMutateDeleteKate}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteKate}
            onPress={() => mutateDeleteKate(selectedId?.id || "")}
          >
            {isPendingMutateDeleteKate ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Kate"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteKate;
