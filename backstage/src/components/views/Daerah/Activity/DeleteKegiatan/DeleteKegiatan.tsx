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
import useDeleteDesa from "./useDeleteKegiatan";
import { IDesa } from "@/types/Desa";
import useDeleteKegiatan from "./useDeleteKegiatan";
import { IKegiatan } from "@/types/Kegiatan";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchKegiatan: () => void;
  selectedId: IKegiatan | null;
  setSelectedId: Dispatch<SetStateAction<IKegiatan | null>>;
}

const DeleteKegiatan = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    selectedId,
    setSelectedId,
    refetchKegiatan,
  } = props;

  const {
    mutateDeleteKegiatan,
    isPendingMutateDeleteKegiatan,
    isSuccessMutateDeleteKegiatan,
  } = useDeleteKegiatan();

  useEffect(() => {
    if (isSuccessMutateDeleteKegiatan) {
      onClose();
      refetchKegiatan();
      setSelectedId(null);
    }
  }, [isSuccessMutateDeleteKegiatan, onClose, refetchKegiatan, setSelectedId]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Kegiatan</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this Kegiatan?
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
            disabled={isPendingMutateDeleteKegiatan}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isPendingMutateDeleteKegiatan}
            onPress={() => mutateDeleteKegiatan(selectedId?.id || "")}
          >
            {isPendingMutateDeleteKegiatan ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Kegiatan"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteKegiatan;
