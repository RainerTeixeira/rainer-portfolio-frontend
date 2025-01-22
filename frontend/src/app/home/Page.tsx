"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React, { useEffect, useState } from "react";

import Carousel from "@components/home/carousel/Carousel";
import Technology from "@components/home/technology/Technology";
import CarouselTechnology from "@components/home/carouselTechnology/CarouselTechnologyCard";
import Skills from "@components/home/skills/SkillsCard";
import Solutions from "@components/home/solutions/Solutions";
import SupportRequest from "@components/home/supportRequest/SupportRequestForm";
import Newsletter from "@components/home/newsletter/Newsletter";

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
