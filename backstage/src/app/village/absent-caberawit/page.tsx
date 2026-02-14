export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Absen from "@/components/views/Kelompok/ListAbsenCaberawit/Absen/Absen";
import React from "react";

const DashboardPage = () => {
  return (
    <DashboardLayout type="DESA" title="Absensi">
      <Absen />
    </DashboardLayout>
  );
};

export default DashboardPage;
