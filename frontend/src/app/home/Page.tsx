"use client";

import React, { useEffect } from "react";
import Carousel from "../components/home/Carousel/Carousel";
import Technology from "../components/home/Technology/Technology";
import CarouselTechnology from "../components/home/CarouselTechnology/CarouselTechnology";
import Solutions from "../components/home/Solutions/Solutions";
import Skills from "../components/home/Skills/Skills";
import SupportRequest from "../components/home/SupportRequest/SupportRequest";
import Newsletter from "../components/home/Newsletter/Newsletter";
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