import DashboardLayout from "@/components/layouts/DashboardLayout";
import GetAbsen from "@/components/views/Admin/AbsenCaberawit/GetAbsen/GetAbsen";
import React from "react";

const DetailKegiatanPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Kalender Absensi">
      <GetAbsen />
    </DashboardLayout>
  );
};

export default DetailKegiatanPage;
