import DashboardLayout from "@/components/layouts/DashboardLayout";
import User from "@/components/views/Daerah/User";
import React from "react";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Users">
      <User />
    </DashboardLayout>
  );
};

export default ListUsersPage;
