export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Caberawit from "@/components/views/Daerah/Caberawit";
import React from "react";

const ListGenerusPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Generus">
      <Caberawit />
    </DashboardLayout>
  );
};

export default ListGenerusPage;
