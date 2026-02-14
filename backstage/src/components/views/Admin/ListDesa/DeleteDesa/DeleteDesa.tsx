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
import useDeleteDesa from "./useDeleteDesa";
import { IDesa } from "@/types/Desa";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchDesa: () => void;
  selectedId: IDesa | null;
  setSelectedId: Dispatch<SetStateAction<IDesa | null>>;
}

const DeleteDesa = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchDesa,
  } = props;

  const {
    mutateDeleteDesa,
    isPendingMutateDeleteDesa,
    isSuccessMutateDeleteDesa,
  } = useDeleteDesa();

  useEffect(() => {
    if (isSuccessMutateDeleteDesa) {
      onClose();
      refetchDesa();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteDesa, onClose, refetchDesa, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Desa</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this desa?
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
            disabled={isPendingMutateDeleteDesa}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteDesa}
            onPress={() => mutateDeleteDesa(selectedId?.id || "")}
          >
            {isPendingMutateDeleteDesa ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Desa"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteDesa;
