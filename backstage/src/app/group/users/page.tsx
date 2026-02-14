export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Access from "@/components/views/Kelompok/Access/Access";
import React from "react";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="KELOMPOK" title="Tambah Akses">
      <Access />
    </DashboardLayout>
  );
};

export default ListUsersPage;
