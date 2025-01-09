"use client"
import React, { useState } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'

const ResponsiveNav = () => {
  const [showNav,setShowNav] = useState(false);
  const openNavHandler = () => setShowNav(true);
  const closeNavHandler = () => setShowNav(false);
  return (
    <div>
        <Nav openNavHandler={openNavHandler}/>
        <MobileNav showNav={showNav} closeNavHandler={closeNavHandler}/>
    </div>
  )
}

export default ResponsiveNav