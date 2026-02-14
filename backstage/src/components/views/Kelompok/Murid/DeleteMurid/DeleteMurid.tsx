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
import { IDesa } from "@/types/Desa";
import useDeleteMurid from "./useDeleteMurid";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchMurid: () => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const DeleteMurid = ({
  isOpen,
  onClose,
  onOpenChange,
  refetchMurid,
  selectedIds,
  setSelectedIds,
}: PropTypes) => {
  const { submitDeleteMurid, isPending, isSuccess } = useDeleteMurid();

  useEffect(() => {
    if (isSuccess) {
      onClose();
      refetchMurid();
      setSelectedIds([]);
    }
  }, [isSuccess]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Hapus Murid</ModalHeader>
        <ModalBody>
          <p>
            Yakin ingin menghapus <b>{selectedIds.length}</b> murid?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose} variant="flat">
            Batal
          </Button>
          <Button
            color="danger"
            isDisabled={isPending}
            onPress={() => submitDeleteMurid(selectedIds)}
          >
            {isPending ? <Spinner size="sm" /> : "Hapus"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteMurid;
