import DashboardLayout from "@/components/layouts/DashboardLayout";
import KelasJenjang from "@/components/views/Admin/KelasJenjang";
import React from "react";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Kelas Jenjang">
      <KelasJenjang />
    </DashboardLayout>
  );
};

export default ListDesaPage;
