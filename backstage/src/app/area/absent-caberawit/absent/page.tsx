export const dynamic = "force-dynamic";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import Absen from "@/components/views/Admin/AbsenCaberawit/Absen/Absen";

const ListDesaPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Absen Caberawit">
      <Absen />
    </DashboardLayout>
  );
};

export default ListDesaPage;
