import DashboardLayout from "@/components/layouts/DashboardLayout";
import Murid from "@/components/views/Kelompok/Murid/Murid";
import React from "react";

const GenerusPage = () => {
  return (
    <DashboardLayout type="KELOMPOK" title="Daftar Siswa">
      <Murid />
    </DashboardLayout>
  );
};

export default GenerusPage;
