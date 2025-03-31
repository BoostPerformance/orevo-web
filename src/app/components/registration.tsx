import Image from 'next/image';
import Button from '@/app/components/common/button';

export default function Registration() {
  return (
    <>
      {/* CTA Section */}
      <section className="w-full bg-green py-16 lg:py-16 md:py-12 sm:py-10 xs:py-8">
        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center gap-[3rem] lg:gap-[3rem] md:gap-[2.5rem] sm:gap-[2rem] xs:gap-[1.5rem]">
          <div className="text-3-700 lg:text-3-700 md:text-2.5-700 sm:text-2-700 xs:text-1.75-700 text-white mb-8 flex flex-col items-center">
            <Image
              src="/svg/logo-white.svg"
              alt="Orevo"
              width={100}
              height={100}
              className="w-[16rem] h-[10rem] lg:w-[16rem] lg:h-[10rem] md:w-[14rem] md:h-[8rem] sm:w-[12rem] sm:h-[7rem] xs:w-[10rem] xs:h-[6rem]"
            />
            <div className="lg:text-3-700 md:text-2.5-700 sm:text-2-700 xs:text-1.25-700 ">
              지금, <br className="hidden xs:inline " />
              당신을 위한 건강한 변화를 시작하세요.
            </div>
          </div>
          <Button variant="white" href="/register">
            체험수업 신청하기
          </Button>
          <div className="text-white text-1.5-500 lg:text-1.5-500 md:text-1.25-500 sm:text-1-500 xs:text-0.875-500 mt-8">
            문의: 010-7977-1101
          </div>
        </div>
      </section>
    </>
  );
}
