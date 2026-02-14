import DashboardLayout from "@/components/layouts/DashboardLayout";
import GetAbsen from "@/components/views/Kelompok/ListAbsenCaberawit/GetAbsen/GetAbsen";
import React from "react";

const DetailKegiatanPage = () => {
  return (
    <DashboardLayout type="KELOMPOK" title="Kalender Absensi">
      <GetAbsen />
    </DashboardLayout>
  );
};

export default DetailKegiatanPage;
