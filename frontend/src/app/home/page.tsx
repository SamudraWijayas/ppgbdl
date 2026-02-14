"use client";

import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Homes from "@/components/views/Home";

export default function Page() {
  return (
    <LandingPageLayout showNavLogo={true}>
      <Homes />
    </LandingPageLayout>
  );
}