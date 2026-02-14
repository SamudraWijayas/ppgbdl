import React from "react";
import ListKehadiran from "../../components/views/ListKehadiran";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

const page = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Daftar Kehadiran"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <ListKehadiran />
    </LandingPageLayout>
  );
};

export default page;
