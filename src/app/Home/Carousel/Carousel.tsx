import React from "react";
import Carousel from "react-multi-carousel"; // Importando o componente Carousel
import "react-multi-carousel/lib/styles.css"; // Importando os estilos do Carousel
import BurgerImg1 from "@/public/images/b1.png"; // Imagem do primeiro slide
import BurgerImg2 from "@/public/images/b2.png"; // Imagem do segundo slide
import Image from "next/image"; // Importando o componente de imagem do Next.js
import { BiDesktop, BiCode } from "react-icons/bi"; // Importando ícones de tecnologia

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

const Hero = () => {
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
          <Image src={BurgerImg1} alt="portfólio" className="hidden md:block" />
          {/* Informações do slide */}
          <div>
            <h1 className="text-[40px] font-semibold text-yellow-400">
              Meu Portfólio
            </h1>
            <h1 className="text-[75px] sm:text-[90px] leading-[5rem] uppercase text-white font-bold">
              Trabalhos e Projetos
            </h1>
            <p className="mt-[1rem] text-white text-opacity-70 text-[18px]">
              Aqui você pode explorar diversos projetos que desenvolvi ao longo da minha carreira. Cada um deles reflete minha paixão pela tecnologia e pelo desenvolvimento de soluções inovadoras.
            </p>
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
          <Image src={BurgerImg2} alt="sobre mim" className="hidden md:block" />
          {/* Informações do slide */}
          <div>
            <h1 className="text-[40px] font-semibold text-yellow-400">
              Sobre Mim
            </h1>
            <h1 className="text-[75px] sm:text-[90px] leading-[5rem] uppercase text-white font-bold">
              Conheça Minha Jornada
            </h1>
            <p className="mt-[1rem] text-white text-opacity-70 text-[18px]">
              Sou um desenvolvedor apaixonado por tecnologia e inovação. Com experiência em diversas áreas, busco sempre novos desafios e oportunidades para crescer e compartilhar meu conhecimento.
            </p>
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

export default Hero;
