import React from "react";
import Account from "../../components/views/Account";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";

const AccountPage = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Akun"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <Account />
    </LandingPageLayout>
  );
};

export default AccountPage;
