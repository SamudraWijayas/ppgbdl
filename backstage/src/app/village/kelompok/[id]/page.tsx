import DashboardLayout from "@/components/layouts/DashboardLayout";
import GenerusKelompok from "@/components/views/Desa/GenerusKelompok/GenerusKelompok";
import React from "react";

const GenerusKelompokPage = () => {
  return (
    <DashboardLayout type="DESA" title="Update Profile">
      <GenerusKelompok />
    </DashboardLayout>
  );
};

export default GenerusKelompokPage;
