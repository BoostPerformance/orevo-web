import Image from 'next/image';
import Button from '@/app/components/common/button';

export default function MainImage() {
  return (
    <section className="w-full relative h-[51rem] md:h-[45rem] sm:h-[40rem] sm:w-[10rem]">
      <Image
        src="/images/mainImage.png"
        alt="Orevo Hero"
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute flex flex-col items-start justify-center left-[14rem] top-[16rem] gap-[4.5rem] 
        "
      >
        <div className="flex flex-col items-start justify-center text-center gap-[1rem]">
          <Image
            src="/images/logo.png"
            alt="Orevo Hero"
            className="w-[15rem] h-auto sm:w-[8rem]"
            width={500}
            height={500}
            priority
          />
          <div className="text-1.25-500 mb-2 text-gray-14 md:text-1-500 sm:text-0.875-500">
            Forever Young, Forever Beautiful
          </div>
          <div className="text-2-700 text-white">
            <div className="text-2-700 mb-2 md:text-1.75-700 sm:text-1.5-700">
              젊음은 나이가 아닌 건강한 습관으로부터 시작됩니다.
            </div>
            <div className="text-2-700 mb-8 md:text-1.75-700 sm:text-1.5-700">
              40-50대 여성을 위한 프리미엄 피트니스 스튜디오.
            </div>
          </div>
        </div>
        <Button variant="green" href="/register">
          체험수업 신청하기
        </Button>
      </div>
    </section>
  );
}
