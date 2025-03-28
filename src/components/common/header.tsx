import Image from 'next/image';
const Header = () => {
  return (
    <header className="sticky w-full sm:w-auto z-50 flex justify-center top-0 bg-beige sm:py-[0.5rem]">
      <Image
        className="h-[5rem] sm:h-[1rem]"
        src="/svg/logo.svg"
        width={150}
        height={150}
        alt="orevo logo"
      />
    </header>
  );
};

export default Header;
