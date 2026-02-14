import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Daerah/Dashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="DAERAH">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
