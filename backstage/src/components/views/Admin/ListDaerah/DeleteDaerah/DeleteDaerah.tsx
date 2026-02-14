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
import useDeleteDaerah from "./useDeleteDaerah";
import { IDaerah } from "@/types/Daerah";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchDaerah: () => void;
  selectedId: IDaerah | null;
  setSelectedId: Dispatch<SetStateAction<IDaerah | null>>;
}

const DeleteDaerah = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchDaerah,
  } = props;

  const {
    mutateDeleteDaerah,
    isPendingMutateDeleteDaerah,
    isSuccessMutateDeleteDaerah,
  } = useDeleteDaerah();

  useEffect(() => {
    if (isSuccessMutateDeleteDaerah) {
      onClose();
      refetchDaerah();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteDaerah, onClose, refetchDaerah, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Daerah</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this daerah?
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
            disabled={isPendingMutateDeleteDaerah}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteDaerah}
            onPress={() => mutateDeleteDaerah(selectedId?.id || "")}
          >
            {isPendingMutateDeleteDaerah ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Daerah"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDaerah;
