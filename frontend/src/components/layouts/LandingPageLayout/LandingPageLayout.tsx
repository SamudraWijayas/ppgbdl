import React, { Fragment, ReactNode } from "react";
import LandingPageFooter from "./LandingPageFooter";
import BottomNav from "./LandingPageLayoutNavbar/BottomNav";
import NavBack from "../../ui/NavBack";
import NavLogo from "@/components/ui/NavLogo";
import { cn } from "@/utils/cn";

interface PropTypes {
  showNavBack?: boolean;
  span?: string;
  children: ReactNode;
  showNavLogo?: boolean;
  showFooter?: boolean;
  showBottomNav?: boolean;
  marginTop?: string;
}

const LandingPageLayout = (props: PropTypes) => {
  const {
    children,
    showNavBack = false,
    span,
    showNavLogo = false,
    showFooter = true,
    showBottomNav = true,
    marginTop = "pt-[65px]",
  } = props;
  return (
    <Fragment>
      {showNavBack && <NavBack span={span} />}
      {showNavLogo && <NavLogo />}
      <div
        className={cn(
          `bg-gray-200 ${marginTop} dark:bg-black/10 flex justify-center`
        )}
      >
        <div className="w-full max-w-2xl flex flex-col relative border-none md:border-x md:border-b md:border-gray-200 rounded-xl ">
          {children}
        </div>
      </div>
      {showBottomNav && <BottomNav />}
      {showFooter && <LandingPageFooter />}
    </Fragment>
  );
};

export default LandingPageLayout;
