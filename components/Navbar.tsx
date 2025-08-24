import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MobileNavigation from './MobileNavigation';
import { SignedIn, UserButton } from '@clerk/nextjs';

import logoIcon from '@/public/icons/logo.svg';

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10 border-b-4 border-b-dark-2">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src={logoIcon}
          width={32}
          height={32}
          alt="yoom logo"
          className="max-sm:size-10"
        />

        <p className="text-[24px] font-extrabold text-white max-sm:hidden">
          Yoom
        </p>
      </Link>

      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>

        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
