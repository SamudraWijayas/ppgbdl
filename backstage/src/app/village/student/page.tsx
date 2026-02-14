export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mahasiswa from "@/components/views/Desa/Generus/Mahasiswa/Mahasiswa";
import React from "react";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="DESA" title="Mahasiswa">
      <Mahasiswa />
    </DashboardLayout>
  );
};

export default ListUsersPage;
