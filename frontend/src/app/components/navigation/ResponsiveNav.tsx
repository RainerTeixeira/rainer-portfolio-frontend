"use client";

import React, { useState } from "react";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

interface ResponsiveNavProps {
  responsive?: boolean; // A prop que pode ser passada para controlar o comportamento responsivo
}

const ResponsiveNav: React.FC<ResponsiveNavProps> = ({ responsive = true }) => {
  const [showNav, setShowNav] = useState(false);

  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);

  return (
    <div>
      <Nav openNavHandler={openNavHandler} responsive={responsive} />
      <MobileNav showNav={showNav} closeNavHandler={closeNavHandler} responsive={responsive} />
    </div>
  );
};

export default ResponsiveNav;
