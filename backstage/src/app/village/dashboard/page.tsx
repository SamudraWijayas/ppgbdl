import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Desa/Dashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="DESA">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
