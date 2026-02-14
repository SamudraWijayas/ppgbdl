import React from "react";
import ListKelompok from "../../components/views/ListKelompok";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

const Group = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Daftar Kelompok"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <ListKelompok />
    </LandingPageLayout>
  );
};

export default Group;
