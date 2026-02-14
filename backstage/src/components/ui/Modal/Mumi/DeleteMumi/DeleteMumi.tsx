import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import useDeleteGenerus from "./useDeleteGenerus";
import { Dispatch, SetStateAction, useEffect } from "react";
import { IGenerus } from "@/types/Generus";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchGenerus: () => void;
  selectedId: IGenerus | null;
  setSelectedId: Dispatch<SetStateAction<IGenerus | null>>;
}

const DeleteMumi = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchGenerus,
    selectedId,
    setSelectedId,
  } = props;

  const {
    mutateDeleteGenerus,
    isPendingMutateDeleteGenerus,
    isSuccessMutateDeleteGenerus,
  } = useDeleteGenerus();

  useEffect(() => {
    if (isSuccessMutateDeleteGenerus) {
      onClose();
      refetchGenerus();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteGenerus, onClose, refetchGenerus, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Generus</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this generus?
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
            disabled={isPendingMutateDeleteGenerus}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteGenerus}
            onPress={() => {
              mutateDeleteGenerus(selectedId?.id?.toString() || "");
              refetchGenerus();
              onClose();
            }}
          >
            {isPendingMutateDeleteGenerus ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Generus"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMumi;
