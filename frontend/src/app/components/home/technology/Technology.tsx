import React from "react";
import Image from "next/image";

// Constantes para as informações das cartas
const featuresData = [
  {
    imgSrc: "/images/f1.jpg", // Caminho relativo à pasta public
    title: "Suporte de TI & Infraestrutura",
    description:
      "Apaixonado por otimizar infraestrutura de redes e resolver problemas técnicos complexos. Oferecendo suporte de TI para melhorar a produtividade e o sucesso dos negócios.",
    aosAnimation: "fade-left",
    aosDelay: "0",
    width: 400, // Definido para a imagem
    height: 300, // Definido para a imagem
  },
  {
    imgSrc: "/images/f2.jpg", // Caminho relativo à pasta public
    title: "Desenvolvimento de Software",
    description:
      "Experiência na criação e manutenção de soluções de software, com foco no desenvolvimento backend em Java e criação de interfaces intuitivas.",
    aosAnimation: "zoom-in",
    aosDelay: "200",
    width: 400, // Definido para a imagem
    height: 300, // Definido para a imagem
  },
  {
    imgSrc: "/images/f3.jpg", // Caminho relativo à pasta public
    title: "Cloud & DevOps",
    description:
      "Habilidades em infraestrutura de nuvem e práticas de DevOps, com experiência prática em AWS, Docker e configuração de servidores para garantir soluções escaláveis e eficientes.",
    aosAnimation: "fade-right",
    aosDelay: "400",
    width: 400, // Definido para a imagem
    height: 300, // Definido para a imagem
  },

];

const Features = () => {
  return (
    <div className="pt-[5rem] pb-[3rem]">
      {/* Heading */}
      <h1 className="heading">
        Uma jornada na <br /> Tecnologia com <span>Paixão</span>
      </h1>
      <div className="w-[90%] md:w-[80%] mt-[3rem] md:mt-[5rem] mb-[3rem] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3rem]">
        {/* Mapeamento das cartas */}
        {featuresData.map((feature, index) => (
          <div
            key={index}
            data-aos={feature.aosAnimation}
            data-aos-delay={feature.aosDelay}
            data-aos-anchor-placement="top-center"
          >
            <div className="p-6 hover:bg-white rounded-lg transition-all duration-200">
              <Image
                src={feature.imgSrc}
                alt={feature.title}
                className="rounded-3xl"
                width={feature.width}
                height={feature.height}
              />
              <h1 className="mt-[1.5rem] text-center text-[24px] text-black font-semibold">
                {feature.title}
              </h1>
              <p className="mt-[0.2rem] text-black text-opacity-60 text-center">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
