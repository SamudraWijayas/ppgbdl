import Image from "next/image";
import React from "react";

const NavLogo = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black p-4 border-b border-gray-200 dark:border-gray-700 ">
      {/* Logo Light */}
      <Image
        src="/images/logo/logo-light.png"
        width={300}
        height={300}
        alt="logo"
        className="w-24 h-9 dark:hidden inline-block"
      />

      {/* Logo Dark */}
      <Image
        src="/images/logo/logo-dark.png"
        width={300}
        height={300}
        alt="logo"
        className="w-24 h-9 hidden dark:inline-block"
      />
    </div>
  );
};

export default NavLogo;
