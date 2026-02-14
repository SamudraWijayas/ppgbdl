import DashboardLayout from "@/components/layouts/DashboardLayout";
import Profile from "@/components/ui/Profile/Profile";

const ListUsersPage = () => {
  return (
    <DashboardLayout type="KELOMPOK" title="Update Profile">
      <Profile />
    </DashboardLayout>
  );
};

export default ListUsersPage;
