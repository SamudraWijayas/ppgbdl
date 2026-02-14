export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Indikator from "@/components/views/Admin/Indikator";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Indikator">
      <Indikator />
    </DashboardLayout>
  );
};

export default ListDesaPage;
