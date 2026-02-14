import DashboardLayout from "@/components/layouts/DashboardLayout";
import Caberawit from "@/components/views/Admin/Caberawit";
import React from "react";

const ListGenerusPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Generus">
      <Caberawit />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
