"use client";

import React, { useEffect } from "react";
import Carousel from "./Carousel/Carousel";
import Technology from "./Technology/Technology";
import CarouselTechnology from "./carouselTechnology/carouselTechnology";
import Solutions from "./Solutions/Solutions";
import Skills from "./Skills/Skills";
import SupportRequest from "./SupportRequest/SupportRequest";
import Newsletter from "./Newsletter/Newsletter";
import AOS from "aos";
import "aos/dist/aos.css";

const PortfolioHome = () => {
  useEffect(() => {
    // Carregar e inicializar AOS somente uma vez
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
      anchorPlacement: "top-center",
    });
  }, []); // O array vazio faz a inicialização acontecer apenas uma vez

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
