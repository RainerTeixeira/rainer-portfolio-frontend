import React from 'react';
import { FaLaptop, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="pt-[5rem] pb-[3rem] bg-gray-900">
      <div className="w-[80%] pb-[2rem] border-b-[2px] border-b-gray-300 border-opacity-50 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[3rem] items-start">
        <div>
          <div className="flex items-center text-white space-x-2">
            <FaLaptop className='w-[1.2rem] h-[1.2rem] sm:w-[1.4rem] sm:h-[1.4rem] text-orange-500' />
            <h1 className="text-[20px] sm:text-[30px] font-semibold">Rainer Soft</h1>
          </div>
          <p className="text-white text-opacity-60 mt-[0.4rem]">
            Soluções em TI, Desenvolvimento e Suporte Técnico. Seu parceiro para transformar processos e otimizar sistemas.
          </p>
          <p className="mt-[1rem] text-white">suporte@rainersoft.com.br</p>
          <p className="text-red-300 text-[19px] font-bold">+(55) 24 99913-7382</p>
        </div>

        <div>
          <h1 className="text-[23px] font-semibold mb-[2rem] text-white">Serviços</h1>
          {["Desenvolvimento de Software", "Consultoria em TI", "Infraestrutura de Rede", "Suporte Técnico", "Automação de Processos"].map((item) => (
            <p
              key={item}
              className="mt-[0.7rem] text-white opacity-60 hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit"
            >
              {item}
            </p>
          ))}
        </div>

        <div>
          <h1 className="text-[23px] font-semibold mb-[2rem] text-white">Links Rápidos</h1>
          {["Início", "Sobre", "Portfólio", "Blog", "Contato"].map((item) => (
            <p
              key={item}
              className="mt-[0.7rem] text-white opacity-60 hover:text-yellow-300 transition-all duration-200 cursor-pointer w-fit"
            >
              {item}
            </p>
          ))}
        </div>

        <div>
          <h1 className="text-[23px] font-semibold mb-[2rem] uppercase text-white">Redes Sociais</h1>
          <div className="flex mt-[2rem] items-center space-x-6">
            <FaFacebook className='w-[1.5rem] h-[1.5rem] text-blue-400' />
            <FaInstagram className='w-[1.5rem] h-[1.5rem] text-red-400' />
            <FaTwitter className='w-[1.5rem] h-[1.5rem] text-blue-300' />
          </div>
        </div>
      </div>
      <p className="text-center text-white opacity-50 mt-[1.5rem]">
        Copyright © {new Date().getFullYear()} <span className="text-yellow-300">Rainer Soft</span>. Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
