import DashboardLayout from "@/components/layouts/DashboardLayout";
import DashboardS from "@/components/views/Desa/Dashboard";
import Dashboard from "@/components/views/Kelompok/Dashboard/Dashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="KELOMPOK">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
