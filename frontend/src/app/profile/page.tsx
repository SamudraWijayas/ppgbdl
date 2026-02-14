import React from "react";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Profiles from "@/components/views/Profile";

const Profile = () => {
  return (
    <LandingPageLayout
      showNavBack={true}
      span="Profile"
      showFooter={false}
      showBottomNav={false}
      marginTop="mt-[0px]"
    >
      <Profiles />
    </LandingPageLayout>
  );
};

export default Profile;
