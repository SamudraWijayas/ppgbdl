import DashboardLayout from "@/components/layouts/DashboardLayout";
import GetAbsen from "@/components/views/Kelompok/ListAbsenCaberawit/GetAbsen/GetAbsen";
import React from "react";

const DetailKegiatanPage = () => {
  return (
    <DashboardLayout type="DESA" title="Kalender Absensi">
      <GetAbsen />
    </DashboardLayout>
  );
};

export default DetailKegiatanPage;
