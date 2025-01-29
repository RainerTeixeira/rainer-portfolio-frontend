import { navLinks } from '@/app/constant/constant';
import Link from 'next/link';
import React from 'react';
import { ImCross } from 'react-icons/im';

// Constantes de estilo
const NAV_STYLE = (showNav: boolean) =>
  showNav ? "translate-x-0" : "translate-x-[-100%]";

const RESPONSIVE_STYLE = (responsive: boolean) =>
  responsive ? "w-[80%] sm:w-[70%]" : "w-[70%]";

const BUTTON_STYLE = "absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white cursor-pointer";

const NAV_ITEMS_STYLE = "space-y-10";
const LINK_STYLE = "text-[30px] sm:text-[35px] font-medium hover:text-yellow-400 text-white";
const NAV_BG_STYLE = "bg-emerald-700 transition-all duration-500 delay-400 flex flex-col items-center justify-center h-[100%]";

// Interface de Props
interface Props {
  showNav: boolean;
  closeNavHandler: () => void;
  responsive: boolean;
}

const MobileNav = ({ showNav, closeNavHandler, responsive }: Props) => {
  return (
    <div
      className={`fixed ${NAV_STYLE(showNav)} top-0 left-0 bottom-0 right-0 h-screen bg-[#000000e0] z-[1002] transition-all duration-500`}
    >
      {/* Botão para fechar o menu */}
      <ImCross
        onClick={closeNavHandler}
        className={BUTTON_STYLE}
      />
      {/* Navegação responsiva */}
      <div className={`${NAV_BG_STYLE} ${RESPONSIVE_STYLE(responsive)}`}>
        <ul className={NAV_ITEMS_STYLE}>
          {navLinks.map((navlink) => (
            <li key={navlink.id} className={LINK_STYLE}>
              <Link href={navlink.url}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
