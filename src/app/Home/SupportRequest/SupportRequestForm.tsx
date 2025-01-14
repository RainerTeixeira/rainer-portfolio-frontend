import React from 'react';
import { GrRestaurant } from 'react-icons/gr';

// Constantes para textos e ícones
const supportFormInfo = {
  title: "Solicitação de Suporte",
  subtitle: "Preencha o formulário para solicitar suporte",
  options: [
    { value: "1", label: "Suporte Técnico" },
    { value: "2", label: "Desenvolvimento de Sistemas" },
    { value: "3", label: "Consultoria em Infraestrutura" }
  ],
  buttonText: "Solicitar Suporte"
};

const SupportRequestForm = () => {
  return (
    <div className="bg-green-700 p-6 rounded-lg">
      <GrRestaurant className="w-[5rem] h-[5rem] text-white mt-[2rem] mx-auto" />

      <h1 className="text-center font-bold uppercase text-[30px] md:text-[40px] lg:text-[50px] mt-[0.5rem] text-white">
        {supportFormInfo.title}
      </h1>

      <p className="uppercase text-[20px] md:text-[25px] text-white font-semibold text-center">
        {supportFormInfo.subtitle}
      </p>

      <div className="mt-[2rem]">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center w-full sm:w-[80%] mx-auto justify-between lg:justify-center xl:justify-between space-x-4">
          <select
            className="px-4 py-2.5 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100 w-full sm:w-[250px] md:w-[300px] lg:w-[350px] transition-all duration-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            name="support_type"
            id="support_type"
          >
            {supportFormInfo.options.map(option => (
              <option key={option.value} value={option.value} className="text-black">
                {option.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="px-4 py-2.5 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100 w-full sm:w-[250px] md:w-[300px] lg:w-[350px] transition-all duration-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="time"
          className="px-4 py-2.5 bg-transparent block w-full mx-auto mt-[1rem] rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100 transition-all duration-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-[2rem] w-full text-center mx-auto">
          <button className="px-8 py-3 rounded-lg mb-[3rem] text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] w-full sm:w-auto bg-blue-950 transition-all duration-300 hover:bg-red-600 focus:ring-2 focus:ring-blue-500 text-white shadow-md hover:shadow-lg transform hover:scale-105">
            {supportFormInfo.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportRequestForm;
