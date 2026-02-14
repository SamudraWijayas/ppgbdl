export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListAbsenCaberawit from "@/components/views/Kelompok/ListAbsenCaberawit/ListAbsenCaberawit";
import React from "react";

const GenerusPage = () => {
  return (
    <DashboardLayout type="KELOMPOK" title="Kehadiran">
      <ListAbsenCaberawit />
    </DashboardLayout>
  );
};

export default GenerusPage;
