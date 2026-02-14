export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListDaerah from "@/components/views/Admin/ListDaerah";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Daerah">
      <ListDaerah />
    </DashboardLayout>
  );
};

export default ListDesaPage;
