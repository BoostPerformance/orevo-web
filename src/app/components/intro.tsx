import Image from 'next/image';

export default function Intro() {
  return (
    <div className="py-[20rem] bg-beige flex flex-col items-center justify-center sm:py-[6rem]">
      <div className="flex flex-col gap-[3rem] items-center">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700 sm:text-1.75-700">
          <Image
            className="w-[9rem] sm:w-[6rem]"
            src="/svg/logo.svg"
            width={100}
            height={100}
            alt="logo"
          />
          차별점
        </div>
        <div className="flex flex-col items-center justify-center gap-[1.38rem] text-gray-3 text-2-600 sm:gap-[0.8rem]">
          <div>4060 여성을 위한 맞춤 운동 강도</div>
          <div>
            <Image
              className="sm:w-[0.5rem]"
              src="/svg/ellipse.svg"
              width={10}
              height={10}
              alt="ellipse"
            />
          </div>
          <div>근력운동과 유산소운동의 조화</div>
          <div>
            <Image
              className="sm:w-[0.5rem]"
              src="/svg/ellipse.svg"
              width={10}
              height={10}
              alt="ellipse"
            />
          </div>
          <div>소수정예 8인 클래스로 섬세한 지도</div>
          <div>
            <Image
              className="sm:w-[0.5rem]"
              src="/svg/ellipse.svg"
              width={10}
              height={10}
              alt="ellipse"
            />
          </div>
          <div>같은 연령대가 함께하는 편안한 분위기</div>
        </div>
      </div>
    </div>
  );
}
