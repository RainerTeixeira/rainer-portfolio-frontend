"use client"
import React, { useEffect } from 'react'
import Carousel from './Carousel/Carousel'
import Technology from './Technology/Technology'
import CarouselTechnology from './CarouselTechnology/CarouselTechnology'
import Solutions from './Solutions/Solutions'
import Skills from './Skills/Skills'
import SupportRequest from './SupportRequest/SupportRequest'
import Newsletter from './Newsletter/Newsletter'
import AOS from 'aos';
import 'aos/dist/aos.css';

const PortfolioHome = () => {
  useEffect(() => {
    const initAos = async () => {
      await import("aos");
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-center",
      })
    };
    initAos();
  }, [])

  return (
    <div>
      <Carousel />
      <Technology />
      <CarouselTechnology />
      <Solutions />
      <Skills />
      <SupportRequest />
      <Newsletter />
    </div>
  )
}

export default PortfolioHome
