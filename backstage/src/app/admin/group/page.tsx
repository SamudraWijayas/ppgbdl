import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListKelompok from "@/components/views/Admin/ListKelompok";
import React from "react";

const ListKelompokPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Kelompok">
      <ListKelompok />
    </DashboardLayout>
  );
};

export default ListKelompokPage;
