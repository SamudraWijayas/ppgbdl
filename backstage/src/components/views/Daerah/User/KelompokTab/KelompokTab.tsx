import React, {  ReactNode, useCallback, useEffect } from "react";
import useAdminTab from "./useKelompokTab";
import { useSearchParams } from "next/navigation";
import useChangeUrl from "@/hooks/useChangeUrls";
import { useDisclosure } from "@heroui/react";
import DropdownAction from "@/components/commons/DropdownAction";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LIST_USER } from "./User.constants";
import { IUser } from "@/types/User";
import AddUserModal from "../AddUserModal";
import DeleteUserModal from "../DeleteUserModal";
import UpdateUserModal from "../UpdateUserModal";

const AdminTab = () => {
  const searchParams = useSearchParams();
  const {
    dataUsers,
    isLoadingUsers,

    isRefetchingUsers,
    refetchUsers,

    selectedId,
    setSelectedId,
  } = useAdminTab();

  const addUserModal = useDisclosure();
  const deleteUserModal = useDisclosure();
  const updateUserModal = useDisclosure();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (searchParams) {
      setUrl();
    }
  }, [searchParams, setUrl]);

  const renderCell = useCallback(
    (user: IUser, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof typeof user];
      switch (columnKey) {
         case "kelompok":
          return user.kelompok?.name || "-";
        case "actions":
          return (
            <DropdownAction
              onClickDetail={() => {
                setSelectedId(user as IUser);
                updateUserModal.onOpen();
              }}
              onClickDelete={() => {
                setSelectedId(user as IUser);
                deleteUserModal.onOpen();
              }}
              textButtonDetail="Detail Users"
              textButtonDelete="Delete Users"
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [setSelectedId, updateUserModal, deleteUserModal]
  );

  const hasParams = searchParams.toString() !== "";

  return (
    <section>
      {hasParams && (
        <DataTable
          buttonTopContentLabel="Create User"
          columns={COLUMN_LIST_USER}
          data={
            dataUsers?.data?.filter(
              (user: IUser) =>
                user.role === "KELOMPOK" || user.role === "SUBKELOMPOK"
            ) || []
          }
          emptyContent="users kelompok is empty"
          isLoading={isLoadingUsers || isRefetchingUsers}
          onClickButtonTopContent={addUserModal.onOpen}
          renderCell={renderCell}
          totalPages={dataUsers?.pagination.totalPages || 0}
        />
      )}
      <AddUserModal refetchUser={refetchUsers} {...addUserModal} />
      <DeleteUserModal
        refetchUsers={refetchUsers}
        {...deleteUserModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
      <UpdateUserModal
        {...updateUserModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchUser={refetchUsers}
      />
    </section>
  );
};

export default AdminTab;
