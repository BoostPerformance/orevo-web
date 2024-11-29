import Image from 'next/image';
import Button from './common/button';
const Registration = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[3rem] text-gray-1 bg-green py-[5.62rem]">
      <div className="flex flex-col items-center gap-[1rem]">
        <Image
          className="w-[14rem] sm:w-[8rem]"
          src="svg/logo-white.svg"
          width={1000}
          height={1000}
          alt="logo white"
        />
        <div className="text-2.5-700 text-white sm:text-1-700">
          지금, 당신을 위한 건강한 변화를 시작하세요.
        </div>
      </div>
      <Button variant="white" />
      <div className="sm:text-0.75-500">문의 010-7977-1101</div>
    </div>
  );
};

export default Registration;
