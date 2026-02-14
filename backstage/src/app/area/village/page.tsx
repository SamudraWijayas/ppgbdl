import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListDesa from "@/components/views/Daerah/ListDesa";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Desa">
      <ListDesa />
    </DashboardLayout>
  );
};

export default ListDesaPage;
