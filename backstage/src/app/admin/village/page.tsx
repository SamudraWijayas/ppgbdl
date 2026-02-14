import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListDesa from "@/components/views/Admin/ListDesa";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Desa">
      <ListDesa />
    </DashboardLayout>
  );
};

export default ListDesaPage;
