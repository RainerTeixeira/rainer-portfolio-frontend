"use client"; // Para habilitar funcionalidades do React no lado do cliente

import React from "react";
import Carousel from "react-multi-carousel"; // Importando o componente Carousel
import "react-multi-carousel/lib/styles.css"; // Importando os estilos do Carousel
const BurgerImg1 = "/images/b1.png"; // Caminho da imagem no diretório public
const BurgerImg2 = "/images/b2.png"; // Caminho da imagem no diretório public
import Image from "next/image"; // Importando o componente de imagem do Next.js
import { BiDesktop, BiCode } from "react-icons/bi"; // Importando ícones de tecnologia

// Definindo as constantes no início
const SLIDE_ONE_TITLE = "Meu Portfólio";
const SLIDE_ONE_SUBTITLE = "Trabalhos e Projetos";
const SLIDE_ONE_DESCRIPTION =
  "Aqui você pode explorar diversos projetos que desenvolvi ao longo da minha carreira. Cada um deles reflete minha paixão pela tecnologia e pelo desenvolvimento de soluções inovadoras.";

const SLIDE_TWO_TITLE = "Sobre Mim";
const SLIDE_TWO_SUBTITLE = "Conheça Minha Jornada";
const SLIDE_TWO_DESCRIPTION =
  "Sou um desenvolvedor apaixonado por tecnologia e inovação. Com experiência em diversas áreas, busco sempre novos desafios e oportunidades para crescer e compartilhar meu conhecimento.";

// Definindo os breakpoints para tornar o Carousel responsivo
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 }, // Para telas grandes
    items: 1,
    slidesToSlide: 1, // Move uma slide por vez
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 }, // Para telas de tamanho médio
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 }, // Para telas pequenas
    items: 1,
    slidesToSlide: 1,
  },
};

const home = () => {
  return (
    <Carousel
      additionalTransfrom={0} // Define o valor de transformação adicional
      arrows={false} // Desativa as setas de navegação
      autoPlay={true} // Ativa o autoplay
      autoPlaySpeed={3000} // Velocidade do autoplay (4 segundos por slide)
      infinite={true} // Permite navegação infinita
      responsive={responsive} // Aplica a responsividade definida acima
      centerMode={false} // Desativa o modo centralizado
      itemClass="item" // Classe CSS para cada item do Carousel
      showDots={true} // Exibe os pontos de navegação
    >
      {/* Primeiro slide */}
      <div className="w-[100%] h-[88vh] flex items-center justify-center flex-col bg-blue-950 md:clip_path">
        <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-[2rem] mx-auto">
          {/* Imagem do Portfólio */}
          {BurgerImg1 && (
            <Image
              src={BurgerImg1}
              alt="portfólio"
              className="hidden md:block"
              width={800} // Adicionando a largura
              height={600} // Adicionando a altura
            />
          )}
          {/* Informações do slide */}
          <div>
            <h1 className="text-[40px] font-semibold text-yellow-400">{SLIDE_ONE_TITLE}</h1>
            <h1 className="text-[75px] sm:text-[90px] leading-[5rem] uppercase text-white font-bold">
              {SLIDE_ONE_SUBTITLE}
            </h1>
            <p className="mt-[1rem] text-white text-opacity-70 text-[18px]">{SLIDE_ONE_DESCRIPTION}</p>
            <button className="mt-[2rem] px-8 py-3 text-[16px] bg-green-500 transition-all duration-200 hover:bg-green-700 flex items-center rounded-md space-x-2 text-white">
              <span>
                <BiDesktop className="w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]" />
              </span>
              <span className="font-bold">Ver Projetos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Segundo slide */}
      <div className="w-[100%] h-[88vh] flex items-center justify-center flex-col bg-red-950 md:clip_path">
        <div className="w-[80%] grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-[2rem] mx-auto">
          {/* Imagem do Sobre mim */}
          {BurgerImg2 && (
            <Image
              src={BurgerImg2}
              alt="sobre mim"
              className="hidden md:block"
              width={800} // Adicionando a largura
              height={600} // Adicionando a altura
            />
          )}
          {/* Informações do slide */}
          <div>
            <h1 className="text-[40px] font-semibold text-yellow-400">{SLIDE_TWO_TITLE}</h1>
            <h1 className="text-[75px] sm:text-[90px] leading-[5rem] uppercase text-white font-bold">
              {SLIDE_TWO_SUBTITLE}
            </h1>
            <p className="mt-[1rem] text-white text-opacity-70 text-[18px]">{SLIDE_TWO_DESCRIPTION}</p>
            <button className="mt-[2rem] px-8 py-3 text-[16px] bg-blue-500 transition-all duration-200 hover:bg-green-700 flex items-center rounded-md space-x-2 text-white">
              <span>
                <BiCode className="w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]" />
              </span>
              <span className="font-bold">Saiba Mais</span>
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default home;
