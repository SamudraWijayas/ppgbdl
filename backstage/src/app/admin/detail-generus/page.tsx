import DashboardLayout from "@/components/layouts/DashboardLayout";
import Generus from "@/components/views/Admin/Generus";
import React from "react";

const ListGenerusPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Generus">
      <Generus />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
