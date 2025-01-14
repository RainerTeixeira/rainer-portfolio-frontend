import Image from "next/image";
import React from "react";

interface Props {
  image: string;
  name: string;
  position: string;
  Text: string; // Adicionando a Text como propriedade
}

const SkillsCard = ({ image, name, position, Text }: Props) => {
  return (
    <div className="text-center">
      <Image
        src={image}
        alt={name}
        height={400}
        width={400}
        className="rounded-2xl mx-auto"
      />
      <h1 className="text-[40px] text-gray-800 mt-[1.5rem] font-bold">
        {name}
      </h1>
      <p className="mt-[0.4rem] mb-[0.4rem] px-4 py-1 bg-green-600 text-white mx-auto w-fit font-medium">
        {position}
      </p>
      <p className="text-center md:w-[70%] mx-auto text-gray-600 mt-[1rem]">
        {Text} {/* Renderiza o Text passada como prop */}
      </p>
    </div>
  );
};

export default SkillsCard;
