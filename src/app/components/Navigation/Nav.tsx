import { useEffect, useState } from 'react';
import { navLinks } from '@/src/app/constant/constant';
import Link from 'next/link';
import React from 'react';
import { BiPhone, BiEnvelope } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';
import { HiBars3BottomRight } from 'react-icons/hi2';

interface Props {
  openNavHandler: () => void;
}

const Nav = ({ openNavHandler }: Props) => {
  const [isClient, setIsClient] = useState(false);

  // Garantir que só renderize no cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Retorna null ou um loader enquanto o cliente não estiver pronto
  }

  // Definindo as classes do Tailwind como constantes
  const containerClass = "h-[12vh] bg-white";
  const wrapperClass = "sm:w-[90%] w-[95%] mx-auto flex h-[100%] items-center justify-between";
  const logoClass = "flex items-center space-x-2";
  const logoTextClass = "text-[20px] sm:text-[30px] font-semibold";
  const navLinkClass = "text-[20px] font-medium hover:text-red-600";
  const buttonGroupClass = "flex items-center space-x-4";
  const contactButtonClass = "hidden sm:flex px-6 py-2 sm:px-8 sm:py-3 text-[14px] sm:text-[16px] bg-blue-950 transition-all duration-200 hover:bg-red-600 items-center rounded-md space-x-2 text-white";
  const envelopeButtonClass = "px-4 py-2 sm:px-6 sm:py-3 hover:bg-green-700 transition-all duration-200 bg-orange-600 flex items-center rounded-md text-white";
  const menuIconClass = "lg:hidden w-[2rem] h-[2rem] text-black";

  return (
    <div className={containerClass}>
      <div className={wrapperClass}>
        {/* Logo */}
        <div className={logoClass}>
          <FaUserTie className="w-[1.2rem] h-[1.2rem] sm:w-[1.4rem] sm:h-[1.4rem] text-orange-500" />
          <h1 className={logoTextClass}>Rainer Soft</h1>
        </div>

        {/* Nav Links */}
        <ul className="hidden lg:flex items-center space-x-10">
          {navLinks.map((navlink) => (
            <li key={navlink.id} className={navLinkClass}>
              <Link href={navlink.url}>{navlink.label}</Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className={buttonGroupClass}>
          <button className={contactButtonClass}>
            <span>
              <BiPhone className="w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]" />
            </span>
            <span className="font-bold">Contato</span>
          </button>

          <button className={envelopeButtonClass}>
            <BiEnvelope className="w-[1.3rem] h-[1.3rem] sm:w-[1.7rem] sm:h-[1.7rem]" />
          </button>

          <HiBars3BottomRight onClick={openNavHandler} className={menuIconClass} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
