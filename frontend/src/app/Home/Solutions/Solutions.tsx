import React from "react";
import DeliveryImg from "@/public/images/delivery.svg";
import Image from "next/image";
import { RiEBike2Fill } from "react-icons/ri";
import { IoLaptopOutline } from "react-icons/io5"; // Ícone para tecnologia
import { BsShieldLock } from "react-icons/bs"; // Ícone para segurança

// Definindo constantes para os textos e ícones
const icons = {
  delivery: <RiEBike2Fill className="w-[2rem] h-[2rem] text-red-600" />,
  remoteSupport: <IoLaptopOutline className="w-[2rem] h-[2rem] text-red-600" />,
  security: <BsShieldLock className="w-[2rem] h-[2rem] text-red-600" />,
};

const text = {
  title: "Suas Soluções de TI Chegando",
  description:
    "As melhores soluções para o seu negócio, com suporte dedicado, segurança de dados e uma experiência de TI totalmente personalizada. Nosso compromisso é entregar rapidez, eficiência e confiabilidade para o sucesso de sua empresa.",
  points: [
    {
      icon: icons.delivery,
      text: "Soluções Rápidas e Eficientes",
    },
    {
      icon: icons.remoteSupport,
      text: "Suporte Remoto 24/7",
    },
    {
      icon: icons.security,
      text: "Soluções Avançadas de Segurança de Dados",
    },
  ],
};

const Solutions = () => {
  return (
    <div className="pt-[8rem] pb-[3rem]">
      <div className="w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-[3rem]">
        {/* imagem */}
        <div data-aos="fade-right" data-aos-anchor-placement="top-center">
          <Image src={DeliveryImg} alt="entrega de TI" />
        </div>

        {/* conteúdo textual */}
        <div>
          <h1 className="text-[30px] uppercase md:text-[40px] lg:text-[50px] xl:text-[60px] font-bold leading-[3rem] md:leading-[4rem]">
            {text.title.split(" ")[0]} <span className="text-red-600">{text.title.split(" ")[1]}</span> {text.title.split(" ")[2]}
          </h1>
          <p className="mt-[2rem] text-black text-[17px] text-opacity-70">{text.description}</p>
          <div className="flex flex-col space-y-4 mt-[2rem]">
            {text.points.map((point, index) => (
              <div className="flex items-center space-x-3" key={index}>
                {point.icon}
                <h1 className="text-[18px] text-black font-medium">{point.text}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
