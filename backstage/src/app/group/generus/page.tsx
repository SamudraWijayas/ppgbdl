import DashboardLayout from "@/components/layouts/DashboardLayout";
import GenerusKelompok from "@/components/views/Kelompok/GenerusKelompok/GenerusKelompok";
import React from "react";

const GenerusPage = () => {
  return (
    <DashboardLayout type="KELOMPOK">
      <GenerusKelompok />
    </DashboardLayout>
  );
};

export default GenerusPage;
