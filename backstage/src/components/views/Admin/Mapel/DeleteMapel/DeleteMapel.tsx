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
import useDeleteMapel from "./useDeleteMapel";
import { IMapel } from "@/types/Mapel";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchMapel: () => void;
  selectedId: IMapel | null;
  setSelectedId: Dispatch<SetStateAction<IMapel | null>>;
}

const DeleteMapel = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchMapel,
  } = props;

  const {
    mutateDeleteMapel,
    isPendingMutateDeleteMapel,
    isSuccessMutateDeleteMapel,
  } = useDeleteMapel();

  useEffect(() => {
    if (isSuccessMutateDeleteMapel) {
      onClose();
      refetchMapel();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteMapel, onClose, refetchMapel, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Mapel</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Mapel?
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
            disabled={isPendingMutateDeleteMapel}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteMapel}
            onPress={() => mutateDeleteMapel(selectedId?.id || "")}
          >
            {isPendingMutateDeleteMapel ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Mapel"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMapel;
