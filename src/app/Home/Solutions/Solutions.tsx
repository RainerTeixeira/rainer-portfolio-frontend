import React from "react";
import DeliveryImg from "@/public/images/delivery.svg";
import Image from "next/image";
import { RiEBike2Fill } from "react-icons/ri";
import { IoLaptopOutline } from "react-icons/io5"; // Ícone para tecnologia
import { BsShieldLock } from "react-icons/bs"; // Ícone para segurança

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
            Suas <span className="text-red-600">Soluções de TI</span> Chegando
          </h1>
          <p className="mt-[2rem] text-black text-[17px] text-opacity-70">
            As melhores soluções para o seu negócio, com suporte dedicado,
            segurança de dados e uma experiência de TI totalmente personalizada.
            Nosso compromisso é entregar rapidez, eficiência e confiabilidade
            para o sucesso de sua empresa.
          </p>
          <div className="flex items-center space-x-3 mt-[2rem]">
            <RiEBike2Fill className="w-[2rem] h-[2rem] text-red-600" />
            <h1 className="text-[18px] text-black font-medium">
              Soluções Rápidas e Eficientes
            </h1>
          </div>
          <div className="flex items-center space-x-3 mt-[1rem]">
            <IoLaptopOutline className="w-[2rem] h-[2rem] text-red-600" />
            <h1 className="text-[18px] text-black font-medium">
              Suporte Remoto 24/7
            </h1>
          </div>
          <div className="flex items-center space-x-3 mt-[1rem]">
            <BsShieldLock className="w-[2rem] h-[2rem] text-red-600" />
            <h1 className="text-[18px] text-black font-medium">
              Soluções Avançadas de Segurança de Dados
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
