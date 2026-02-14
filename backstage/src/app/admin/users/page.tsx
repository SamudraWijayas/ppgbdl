import DashboardLayout from "@/components/layouts/DashboardLayout";
import User from "@/components/views/Admin/User";
import React from "react";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Daftar Users">
      <User />
    </DashboardLayout>
  );
};

export default ListUsersPage;
