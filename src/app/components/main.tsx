import Image from 'next/image';
import Button from './common/button';

export default function Main() {
  return (
    <div className="relative flex items-center pt-[8rem]">
      <Image
        className="w-full absolute z-0"
        src="/images/mainImage.png"
        width={1000}
        height={1000}
        alt="main image"
      />
      <div className="z-20 flex flex-col gap-[3rem] text-white pl-[15rem]">
        <div>
          <div>
            <Image
              className="w-[14rem]"
              src="/svg/logo-white.svg"
              width={1000}
              height={1000}
              alt="logo white"
            />
          </div>
          <div className="text-gray-1 text-1.75-500">
            Forever Young, Forever Beautiful
          </div>
          <div className="text-2-900">
            <div>젊음은 나이가 아닌 건강한 습관으로부터 시작됩니다.</div>
            <div>40-60대 여성을 위한 프리미엄 피트니스 스튜디오.</div>
          </div>
        </div>
        <Button variant="green" />
      </div>
    </div>
  );
}
