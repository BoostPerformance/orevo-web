import Image from 'next/image';

export default function Intro() {
  return (
    <section className="w-full max-w-4xl mx-auto py-20 lg:py-20 md:py-16 sm:py-12 xs:py-10">
      {/* 로고와 텍스트를 포함하는 컨테이너 수정 */}
      <div className="flex flex-col items-center justify-center gap-2 text-2-700 lg:text-2-700 md:text-1.75-700 sm:text-1.5-700 xs:text-1.25-700 text-center mb-16 lg:mb-16 md:mb-12 sm:mb-10 xs:mb-8 text-green">
        <div className="flex items-center justify-center gap-2">
          <Image
            src="/svg/logo.svg"
            alt="Orevo"
            width={100}
            height={100}
            className="w-[6rem] h-[6rem] lg:w-[6rem] lg:h-[6rem] md:w-[5rem] md:h-[5rem] sm:w-[4rem] sm:h-[4rem] xs:w-[3.5rem] xs:h-[3.5rem]"
          />
          <div>차별점</div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-[1.38rem] lg:gap-[1.38rem] md:gap-[1.25rem] sm:gap-[1rem] xs:gap-[0.75rem] text-center text-gray-5 text-2-600 lg:text-2-600 md:text-1.75-600 sm:text-1.5-600 xs:text-1-700">
        <div>4060 여성을 위한 맞춤 운동 강도</div>
        <div className="bg-gray-5 w-3 h-3 lg:w-3 lg:h-3 md:w-2.5 md:h-2.5 sm:w-2 sm:h-2 xs:w-1.5 xs:h-1.5 rounded-full"></div>
        <div>근력운동과 유산소운동의 조화</div>
        <div className="bg-gray-5 w-3 h-3 lg:w-3 lg:h-3 md:w-2.5 md:h-2.5 sm:w-2 sm:h-2 xs:w-1.5 xs:h-1.5 rounded-full"></div>
        <div>소수정예 8인 클래스로 섬세한 지도</div>
        <div className="bg-gray-5 w-3 h-3 lg:w-3 lg:h-3 md:w-2.5 md:h-2.5 sm:w-2 sm:h-2 xs:w-1.5 xs:h-1.5 rounded-full"></div>
        <div>같은 연령대가 함께하는 편안한 분위기</div>
      </div>
    </section>
  );
}
