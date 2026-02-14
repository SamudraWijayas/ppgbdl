import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailKegiatan from "@/components/ui/DetailKegiatan";
import React from "react";

const DetailKegiatanPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Detail Kegiatan">
      <DetailKegiatan />
    </DashboardLayout>
  );
};

export default DetailKegiatanPage;
