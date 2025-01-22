"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";

import Carousel from "@/app/components/home/carousel/Carousel";
import Technology from "@/app/components/home/technology/Technology";
import CarouselTechnology from "@/app/components/home/carouselTechnology/CarouselTechnologyCard";
import Skills from "@/app/components/home/skills/SkillsCard";
import Solutions from "@/app/components/home/solutions/Solutions";
import SupportRequest from "@/app/components/home/supportRequest/SupportRequestForm";
import Newsletter from "@/app/components/home/newsletter/Newsletter";

import AOS from "aos";
import "aos/dist/aos.css";

const PortfolioHome = () => {
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!hasRendered) {
      AOS.init({
        duration: 1000,
        easing: "ease",
        once: true,
        anchorPlacement: "top-center",
      });
      setHasRendered(true);
    }
  }, [hasRendered]);

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
  );
};

export default PortfolioHome;
