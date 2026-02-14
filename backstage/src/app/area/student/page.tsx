import DashboardLayout from "@/components/layouts/DashboardLayout";
import Mahasiswa from "@/components/views/Daerah/Mahasiswa/Mahasiswa";
import React from "react";

const ListGenerusPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Generus">
      <Mahasiswa />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
