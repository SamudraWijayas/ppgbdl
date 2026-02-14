import DashboardLayout from "@/components/layouts/DashboardLayout";
import Jenjang from "@/components/views/Admin/Jenjang";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Kategori Indikator">
      <Jenjang />
    </DashboardLayout>
  );
};

export default ListDesaPage;
