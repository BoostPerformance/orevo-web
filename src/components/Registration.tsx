import Image from 'next/image';
import Button from '@/components/common/button';
export default function Registration() {
  return (
    <>
      {/* Location Section */}

      {/* CTA Section */}
      <section className="w-full bg-green py-16 ">
        <div className="max-w-4xl mx-auto text-center px-4 flex flex-col items-center gap-[3rem]">
          <div className="text-3-700 text-white mb-8 flex flex-col items-center">
            <Image
              src="/svg/logo-white.svg"
              alt="Orevo"
              width={100}
              height={100}
              className="w-[16rem] h-[10rem]"
            />
            <div>지금, 당신을 위한 건강한 변화를 시작하세요.</div>
          </div>
          <Button variant="white" />
          <div className="text-white text-1.5-500 mt-8">
            문의: 010-7977-1101
          </div>
        </div>
      </section>
    </>
  );
}
