import DashboardLayout from "@/components/layouts/DashboardLayout";
import ListAbsenCaberawit from "@/components/views/Kelompok/ListAbsenCaberawit/ListAbsenCaberawit";
import React from "react";

const GenerusPage = () => {
  return (
    <DashboardLayout type="KELOMPOK">
      <ListAbsenCaberawit />
    </DashboardLayout>
  );
};

export default GenerusPage;
