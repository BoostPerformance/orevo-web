import Image from 'next/image';
import Button from './common/button';

export default function MainImage() {
  return (
    <div className="relative flex items-center top-[6rem] sm:top-[0rem] sm:overflow-hidden sm:h-[17.5rem]">
      <Image
        className="w-full absolute z-0 sm:scale-175"
        src="/images/mainImage.png"
        width={1000}
        height={1000}
        alt="main image"
      />
      <div className="z-20 flex flex-col gap-[3rem] sm:gap-[1.5rem] text-white pl-[15rem] sm:pl-[1rem]">
        <div className="flex flex-col gap-[0.8rem] sm:gap-0">
          <div>
            <Image
              className="w-[14rem] sm:w-[6rem]"
              src="/svg/logo-white.svg"
              width={1000}
              height={1000}
              alt="logo white"
            />
          </div>
          <div className="text-gray-1 text-1.75-500 sm:text-1-500">
            Forever Young, Forever Beautiful
          </div>
          <div className="text-2-700 sm:text-1-500">
            <div className="h-[2.2rem] sm:h-[1rem]">
              젊음은 나이가 아닌 건강한 습관으로부터 시작됩니다.
            </div>
            <div>40-60대 여성을 위한 프리미엄 피트니스 스튜디오.</div>
          </div>
        </div>
        <Button variant="green" />
      </div>
    </div>
  );
}
