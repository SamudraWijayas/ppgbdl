import React, { useEffect } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Select,
  SelectItem,
  Skeleton,
  Spinner,
} from "@heroui/react";
import { IProfile } from "@/types/Auth";
import useProfileDrawer from "./useProfileDrawer";
import { Controller } from "react-hook-form";
import { toInputDate } from "@/utils/date";
import { Calendar, User, Users } from "lucide-react";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  dataProfile: IProfile;
  onUpdate: (data: IProfile) => void;
  isPendingUpdate: boolean;
  isSuccessUpdate: boolean;
  refetchProfile: () => void;
}

const ProfileDrawer = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    dataProfile,
    onUpdate,
    isPendingUpdate,
    isSuccessUpdate,
  } = props;

  const {
    controlUpdateProfile,
    errorsUpdateProfile,
    handleSubmitUpdateProfile,
    resetUpdateProfile,
    setValueUpdateProfile,
  } = useProfileDrawer();

  useEffect(() => {
    if (dataProfile) {
      setValueUpdateProfile("nama", `${dataProfile?.nama}`);
      setValueUpdateProfile("jenis_kelamin", `${dataProfile?.jenis_kelamin}`);
      setValueUpdateProfile("gol_darah", `${dataProfile?.gol_darah}`);
      setValueUpdateProfile("nama_ortu", `${dataProfile?.nama_ortu}`);
      setValueUpdateProfile(
        "tgl_lahir",
        toInputDate(`${dataProfile?.tgl_lahir}`),
      );
    }
  }, [dataProfile]);
  return (
    <Drawer
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={onOpenChange}
      onClose={onClose}
    >
      <form onSubmit={handleSubmitUpdateProfile(onUpdate)}>
        <DrawerContent className="rounded-t-3xl overflow-hidden">
          <DrawerHeader className="border-b border-gray-200 pb-3 text-xl font-bold text-gray-900">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold">Update Profile</h2>
              <p className="text-xs">Perbarui data pribadi kamu</p>
            </div>
          </DrawerHeader>

          {/* BODY */}
          <DrawerBody className="p-5 space-y-5">
            <div className="flex flex-col gap-6">
              <Skeleton isLoaded={!!dataProfile?.nama} className="rounded-xl">
                <Controller
                  name="nama"
                  control={controlUpdateProfile}
                  render={({ field }) => (
                    <Input
                      {...field}
                      startContent={<User size={16} />}
                      label="Nama Lengkap"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="Masukkan nama"
                      isInvalid={!!errorsUpdateProfile.nama}
                      errorMessage={errorsUpdateProfile.nama?.message}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton
                isLoaded={!!dataProfile?.tgl_lahir}
                className="rounded-xl"
              >
                <Controller
                  name="tgl_lahir"
                  control={controlUpdateProfile}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="date"
                      startContent={<Calendar size={16} />}
                      label="Tanggal Lahir"
                      variant="bordered"
                      labelPlacement="outside"
                      isInvalid={!!errorsUpdateProfile.tgl_lahir}
                      errorMessage={errorsUpdateProfile.tgl_lahir?.message}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton
                isLoaded={!!dataProfile?.nama_ortu}
                className="rounded-xl"
              >
                <Controller
                  name="nama_ortu"
                  control={controlUpdateProfile}
                  render={({ field }) => (
                    <Input
                      {...field}
                      startContent={<Users size={16} />}
                      label="Nama Orang Tua"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="Nama orang tua"
                      isInvalid={!!errorsUpdateProfile.nama_ortu}
                      errorMessage={errorsUpdateProfile.nama_ortu?.message}
                    />
                  )}
                />
              </Skeleton>

              <Skeleton
                isLoaded={!!dataProfile?.jenis_kelamin}
                className="rounded-xl"
              >
                <Controller
                  name="jenis_kelamin"
                  control={controlUpdateProfile}
                  render={({ field }) => (
                    <Select
                      label="Jenis Kelamin"
                      variant="bordered"
                      labelPlacement="outside"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) =>
                        field.onChange(Array.from(value)[0])
                      }
                    >
                      <SelectItem key="Laki-laki">Laki-laki</SelectItem>
                      <SelectItem key="Perempuan">Perempuan</SelectItem>
                    </Select>
                  )}
                />
              </Skeleton>

              <Skeleton
                isLoaded={!!dataProfile?.gol_darah}
                className="rounded-xl"
              >
                <Controller
                  name="gol_darah"
                  control={controlUpdateProfile}
                  render={({ field }) => (
                    <Select
                      label="Golongan Darah"
                      variant="bordered"
                      labelPlacement="outside"
                      selectedKeys={field.value ? [field.value] : []}
                      onSelectionChange={(value) =>
                        field.onChange(Array.from(value)[0])
                      }
                      isInvalid={!!errorsUpdateProfile.gol_darah}
                      errorMessage={errorsUpdateProfile.gol_darah?.message}
                    >
                      {["A", "B", "AB", "O", "-"].map((item) => (
                        <SelectItem key={item}>{item}</SelectItem>
                      ))}
                    </Select>
                  )}
                />
              </Skeleton>
            </div>
          </DrawerBody>

          {/* FOOTER */}
          <DrawerFooter className="flex gap-3">
            <Button
              variant="bordered"
              onPress={() => {
                resetUpdateProfile();
                onClose();
              }}
            >
              Batal
            </Button>
            <Button color="primary" type="submit" disabled={isPendingUpdate}>
              {isPendingUpdate ? <Spinner size="sm" color="white" /> : "Simpan"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default ProfileDrawer;
