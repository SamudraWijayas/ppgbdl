import DashboardLayout from "@/components/layouts/DashboardLayout";
import Kegiatan from "@/components/views/Admin/Kegiatan";
import React from "react";

const ListKegiatanPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Kegiatan">
      <Kegiatan />
    </DashboardLayout>
  );
};

export default ListKegiatanPage;
