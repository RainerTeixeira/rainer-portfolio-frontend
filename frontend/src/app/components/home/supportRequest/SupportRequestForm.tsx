import React from "react";
import { GrRestaurant } from "react-icons/gr";
import { BiPhone } from "react-icons/bi";

const SUPPORT_INFO = {
  TITLE: "PRECISA DE SUPORTE EM TECNOLOGIA? ENTRE EM CONTATO CONOSCO",
  DESCRIPTION:
    "Se você está procurando soluções personalizadas em tecnologia, suporte técnico ou desenvolvimento de sistemas, estou aqui para ajudar! Com experiência em infraestrutura, programação e soluções em TI, posso apoiar sua empresa no que for necessário.",
  PHONE_NUMBER: "24 99913-7382",
  QUICK_SUPPORT_TEXT: "Suporte rápido 24/7",
};

const SUPPORT_FORM_INFO = {
  TITLE: "Solicitação de Suporte",
  SUBTITLE: "Preencha o formulário para solicitar suporte",
  OPTIONS: [
    { value: "1", label: "Suporte Técnico" },
    { value: "2", label: "Desenvolvimento de Sistemas" },
    { value: "3", label: "Consultoria em Infraestrutura" },
  ],
  BUTTON_TEXT: "Solicitar Suporte",
};

const ReservationAndSupportForm = () => {
  return (
    <div className="pt-[5rem] relative mt-[2rem] pb-[5rem] mb-[3rem] bg-[url('/images/bg-black.jpg')]">
      {/* overlay */}
      <div className="absolute w-full h-full bg-[#000000a6] top-0 left-0 right-0 bottom-0"></div>

      <div className="w-[80%] relative z-[20] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-[3rem]">
        {/* Text content */}
        <div>
          <h1 className="text-[30px] md:text-[40px] lg:text-[50px] text-white font-bold leading-[3rem] md:leading-[4rem]">
            {SUPPORT_INFO.TITLE}
          </h1>
          <p className="text-[17px] mt-[1rem] text-white text-opacity-50">
            {SUPPORT_INFO.DESCRIPTION}
          </p>
          <div className="flex mt-[2rem] items-center space-x-4">
            <div className="w-[3rem] h-[3rem] bg-red-500 rounded-full flex items-center justify-center flex-col">
              <BiPhone className="w-[1.7rem] h-[1.7rem] text-white" />
            </div>
            <div>
              <h1 className="text-[25px] text-white font-semibold">
                {SUPPORT_INFO.QUICK_SUPPORT_TEXT}
              </h1>
              <h1 className="text-yellow-300 text-[30px] font-bold">
                {SUPPORT_INFO.PHONE_NUMBER}
              </h1>
            </div>
          </div>
        </div>

        {/* Support form */}
        <div className="bg-green-700 p-6 rounded-lg">
          <GrRestaurant className="w-[5rem] h-[5rem] text-white mt-[2rem] mx-auto" />

          <h1 className="text-center font-bold uppercase text-[30px] md:text-[40px] lg:text-[50px] mt-[0.5rem] text-white">
            {SUPPORT_FORM_INFO.TITLE}
          </h1>

          <p className="uppercase text-[20px] md:text-[25px] text-white font-semibold text-center">
            {SUPPORT_FORM_INFO.SUBTITLE}
          </p>

          <div className="mt-[2rem]">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 items-center w-full sm:w-[80%] mx-auto justify-between lg:justify-center xl:justify-between space-x-4">
              <select
                className="px-4 py-2.5 bg-transparent rounded-lg outline-none font-bold text-[17px] text-white border-[2.2px] border-gray-100 w-full sm:w-[250px] md:w-[300px] lg:w-[350px] transition-all duration-300 hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                name="support_type"
                id="support_type"
              >
                {SUPPORT_FORM_INFO.OPTIONS.map((option) => (
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
                {SUPPORT_FORM_INFO.BUTTON_TEXT}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationAndSupportForm;
