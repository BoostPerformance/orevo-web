import Image from 'next/image';
import Button from '@/components/common/button';

export default function MainImage() {
  return (
    <section className="w-full relative h-[51rem]">
      <Image
        src="/images/mainImage.png"
        alt="Orevo Hero"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute flex flex-col items-start justify-center left-[14rem] top-[16rem] gap-[4.5rem]">
        <div className="flex flex-col items-start justify-center text-center gap-[1rem]">
          <Image
            src="/images/logo.png"
            alt="Orevo Hero"
            className="w-[15rem] h-auto"
            width={500}
            height={500}
            priority
          />
          <div className="text-1.25-500 mb-2 text-gray-14">
            Forever Young, Forever Beautiful
          </div>
          <div className="text-2-700 text-white">
            <div className="text-2-700 mb-2">
              젊음은 나이가 아닌 건강한 습관으로부터 시작됩니다.
            </div>
            <div className="text-2-700 mb-8">
              40-50대 여성을 위한 프리미엄 피트니스 스튜디오.
            </div>
          </div>
        </div>
        <Button variant="green" />
      </div>
    </section>
  );
}
