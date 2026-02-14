import DashboardLayout from "@/components/layouts/DashboardLayout";
import Activity from "@/components/views/Daerah/Activity/Activity";

const ListKegiatanPage = () => {
  return (
    <DashboardLayout type="DAERAH" title="Daftar Kegiatan">
      <Activity />
    </DashboardLayout>
  );
};

export default ListKegiatanPage;
