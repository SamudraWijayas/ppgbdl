import React from "react";
import Scan from "@/components/views/ScanAbsen";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

const ScanAbsen = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Kembali"
      showFooter={false}
      showBottomNav={false}
      marginTop="pt-[0px]"
    >
      <Scan />
    </LandingPageLayout>
  );
};

export default ScanAbsen;
