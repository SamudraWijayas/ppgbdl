import DashboardLayout from "@/components/layouts/DashboardLayout";
import Activity from "@/components/views/Desa/Activity/Activity";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="DESA" title="Kegiatan">
      <Activity />
    </DashboardLayout>
  );
};

export default DashboardPage;
