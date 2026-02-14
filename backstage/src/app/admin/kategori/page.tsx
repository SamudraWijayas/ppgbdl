
import DashboardLayout from "@/components/layouts/DashboardLayout";
import KategoriIndikator from "@/components/views/Admin/KategoriIndikator";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Kategori Indikator">
      <KategoriIndikator />
    </DashboardLayout>
  );
};

export default ListDesaPage;
