export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import React from "react";
import AbsenCaberawit from "../../../components/views/Admin/AbsenCaberawit/AbsenCaberawit";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Absen Caberawit">
      <AbsenCaberawit />
    </DashboardLayout>
  );
};

export default ListDesaPage;
