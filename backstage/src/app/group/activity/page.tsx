import DashboardLayout from "@/components/layouts/DashboardLayout";
import Activity from "@/components/views/Kelompok/Activity/Activity";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="KELOMPOK">
      <Activity />
    </DashboardLayout>
  );
};

export default DashboardPage;
