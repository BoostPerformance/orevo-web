import Image from 'next/image';
const Header = () => {
  return (
    <header className="sticky w-full sm:w-auto z-50 flex justify-center py-[1rem]">
      <Image src="/svg/logo.svg" width={100} height={100} alt="orevo logo" />
    </header>
  );
};

export default Header;
