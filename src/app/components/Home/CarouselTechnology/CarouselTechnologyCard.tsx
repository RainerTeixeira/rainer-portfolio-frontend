import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { BiShoppingBag } from "react-icons/bi";

// Atualizando a interface para incluir 'description'
interface Props {
  title: string;
  image: string;
  reviews: string;
  description: string; // Nova propriedade para descrição
}

const CarouselTechnologyCard: React.FC<Props> = ({ title, image, reviews, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg m-3 max-w-[300px] w-full">
      {/* Imagem */}
      <div className="w-full h-[200px]">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      {/* Título */}
      <h1 className="mt-5 text-xl text-black font-semibold">{title}</h1>
      {/* Avaliações */}
      <div className="flex items-center mt-2 space-x-3">
        <div className="flex items-center">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className="w-[1rem] h-[1rem] text-yellow-600" />
          ))}
        </div>
        <div className="text-black opacity-80">({reviews})</div>
      </div>
      {/* Descrição */}
      <p className="mt-2 text-black text-opacity-70 text-sm">
        {description} {/* Exibe a descrição passada */}
      </p>
    </div>
  );
};

export default CarouselTechnologyCard;
