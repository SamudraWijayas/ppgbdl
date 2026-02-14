import DashboardLayout from "@/components/layouts/DashboardLayout";
import RapotCaberawit from "@/components/views/Admin/RapotCaberawit/RapotCaberawit";
import React from "react";

const ListGenerusPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Rapot Caberawit">
      <RapotCaberawit />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
