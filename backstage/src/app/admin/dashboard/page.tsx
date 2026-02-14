import DashboardLayout from "@/components/layouts/DashboardLayout";
import Dashboard from "@/components/views/Admin/Dashboard";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="ADMIN">
      <Dashboard />
    </DashboardLayout>
  );
};

export default DashboardPage;
