import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa6";
import { BiShoppingBag } from "react-icons/bi";

interface Prope {
  title: string;
  image: string;
  price: string;
  reviews: string;
}

const CarouselTechnologyCard = ({ title, image, price, reviews }: Prope) => {
  return (
    <div className="bg-white p-6 rounded-lg m-3 max-w-[300px] w-full">
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
      <div className="flex items-center mt-2 space-x-3">
        <div className="flex items-center">
          <FaStar className="w-[1rem] h-[1rem] text-yellow-600" />
          <FaStar className="w-[1rem] h-[1rem] text-yellow-600" />
          <FaStar className="w-[1rem] h-[1rem] text-yellow-600" />
          <FaStar className="w-[1rem] h-[1rem] text-yellow-600" />
          <FaStar className="w-[1rem] h-[1rem] text-yellow-600" />
        </div>
        <div className="text-black opacity-80">({reviews})</div>
      </div>
      <p className="mt-2 text-black text-opacity-70 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <div className="flex mt-5 items-center justify-between">
        <h1 className="text-lg font-bold text-red-600">{price}</h1>
        <button className="px-4 py-2 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center rounded-md text-white flex-shrink-0">
          <BiShoppingBag className="w-[1.3rem] h-[1.3rem]" />
        </button>
      </div>
    </div>
  );
};

export default CarouselTechnologyCard;
