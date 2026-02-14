import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/ui/Profile/Profile";
import React from "react";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="ADMIN" title="Update Profile">
      <Profile />
    </DashboardLayout>
  );
};

export default ListUsersPage;
