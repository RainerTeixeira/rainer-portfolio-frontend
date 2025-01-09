"use client";
import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BurgerCard from "./CarouselTechnologyCard";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 4,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1324, min: 764 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 764, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const PopularTechnologies = () => {
  return (
    <div className='pt-[3rem] pb-[3rem]'>
      {/* Heading */}
      <h1 className='heading'>
        Tecnologias que Utilizo <span>no Meu Currículo</span>
      </h1>
      <div className="w-[80%] mt-[4rem] mx-auto">
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          infinite={true}
          responsive={responsive}
          centerMode={false}
          itemClass="item"
          showDots={false}
        >
          <BurgerCard title="Zabbix" image="/images/zabbix.png" reviews="10" />
          <BurgerCard title="Grafana" image="/images/grafana.png" reviews="8" />
          <BurgerCard title="Docker" image="/images/docker.png" reviews="7" />
          <BurgerCard title="SQL Avançado" image="/images/sql.png" reviews="9" />
          <BurgerCard title="JavaScript" image="/images/javascript.png" reviews="6" />
          <BurgerCard title="Apache" image="/images/apache.png" reviews="5" />
          <BurgerCard title="Nginx" image="/images/nginx.png" reviews="4" />
          <BurgerCard title="Git" image="/images/git.png" reviews="3" />
        </Carousel>
      </div>
    </div>
  );
};

export default PopularTechnologies;
Carousel