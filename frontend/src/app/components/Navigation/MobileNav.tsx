import { navLinks } from '@/app/constant/constant';
import Link from 'next/link';
import React from 'react';
import { ImCross } from 'react-icons/im';

interface Props {
  showNav: boolean;
  closeNavHandler: () => void;
}

const MobileNav = ({ showNav, closeNavHandler }: Props) => {
  const navStyle = showNav ? "translate-x-0" : "translate-x-[-100%]";

  return (
    <div className={`fixed ${navStyle} top-0 left-0 bottom-0 right-0 h-screen bg-[#000000e0] z-[1002] transition-all duration-500`}>
      <ImCross onClick={closeNavHandler} className="absolute top-[2rem] right-[2rem] w-[2rem] h-[2rem] text-white" />
      {/* nav links */}
      <div className="bg-emerald-700 transition-all duration-500 delay-400 flex flex-col items-center justify-center w-[70%] h-[100%]">
        <ul className="space-y-10">
          {navLinks.map((navlink) => (
            <li key={navlink.id} className="text-[35px] font-medium hover:text-yellow-400 text-white">
              <Link href={navlink.url}>{navlink.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MobileNav;
