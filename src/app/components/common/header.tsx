import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="sticky w-full sm:w-auto z-50 flex justify-center top-0 bg-beige sm:py-[0.5rem]">
      <Link href="/">
        <Image
          className="h-[5rem] sm:h-[1rem]"
          src="/svg/logo.svg"
          width={150}
          height={150}
          alt="orevo logo"
        />
      </Link>
    </header>
  );
};

export default Header;
