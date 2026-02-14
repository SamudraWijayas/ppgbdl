export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mapel from "@/components/views/Admin/Mapel";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Mata Pelajaran">
      <Mapel />
    </DashboardLayout>
  );
};

export default ListDesaPage;
