'use client';
import Image from 'next/image';
import Button from '@/app/components/common/button';
import { useEffect, useState } from 'react';

export default function MainImage() {
  const [objectPosition, setObjectPosition] = useState('60% center');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1025) {
        // lg
        setObjectPosition('60% center');
      } else if (width >= 768 && width <= 1024) {
        // md
        setObjectPosition('65% center');
      } else if (width >= 480 && width <= 767) {
        // sm
        setObjectPosition('70% center');
      } else {
        // xs
        setObjectPosition('75% center');
      }
    };

    // Set initial position
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="w-full relative h-[51rem] lg:h-[51rem] md:h-[45rem] sm:h-[40rem] xs:h-[35rem]">
      <Image
        src="/images/mainImage.png"
        alt="Orevo Hero"
        fill
        className="object-cover"
        style={{ objectPosition }}
        sizes="100vw"
        priority
      />

      <div className="absolute flex flex-col items-start justify-center lg:left-[14rem] md:left-[10rem] sm:left-[5rem] xs:left-[2rem] lg:top-[16rem] md:top-[14rem] sm:top-[12rem] xs:top-[10rem] gap-[4.5rem] lg:gap-[4.5rem] md:gap-[3.5rem] sm:gap-[2.5rem] xs:gap-[2rem]">
        <div className="flex flex-col items-start justify-center gap-[1rem] lg:gap-[1rem] md:gap-[0.8rem] sm:gap-[0.6rem] xs:gap-[0.4rem]">
          <Image
            src="/images/logo.png"
            alt="Orevo Hero"
            className="w-[15rem] lg:w-[15rem] md:w-[12rem] sm:w-[10rem] xs:w-[8rem] h-auto"
            width={500}
            height={500}
            priority
          />
          <div className="text-1.25-500 lg:text-1.25-500 md:text-1-500 sm:text-0.875-500 xs:text-1-500 mb-2 text-gray-14">
            Forever Young, Forever Beautiful
          </div>
          <div className="text-white">
            <div className="text-2-700 lg:text-2-700 md:text-1.75-700 sm:text-1.5-700 xs:text-1-500 mb-2">
              젊음은 나이가 아닌 건강한 습관으로부터 시작됩니다.
            </div>
            <div className="text-2-700 lg:text-2-700 md:text-1.75-700 sm:text-1.5-700 xs:text-1-500 mb-2">
              40-60대 여성을 위한 프리미엄 피트니스 스튜디오
            </div>
          </div>
        </div>
        <Button
          variant="green"
          href="/register"
          className=" md:text-0.875-700 sm:text-0.875-700 xs:text-0.75-700"
        >
          체험수업 신청하기
        </Button>
      </div>
    </section>
  );
}
