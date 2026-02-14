import React from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import UpdatePassword from "@/components/views/UpdatePassword";

const AccountPage = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Update Password"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <UpdatePassword />
    </LandingPageLayout>
  );
};

export default AccountPage;
