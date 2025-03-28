import Image from 'next/image';

export default function Intro() {
  return (
    <section className="w-full max-w-4xl mx-auto py-20 px-4">
      <div className="flex items-center justify-center gap-2 text-2-700 text-center mb-16 text-green">
        <Image
          src="/svg/logo.svg"
          alt="Orevo"
          width={100}
          height={100}
          className="w-[6rem] h-[6rem]"
        />
        차별점
      </div>

      <div className="flex flex-col items-center gap-[1.38rem] text-center text-gray-5 text-2-600 ">
        <div className="">4060 여성을 위한 맞춤 운동 강도</div>
        <div className="bg-gray-5 w-3 h-3  rounded-full"></div>
        <div className="">근력운동과 유산소운동의 조화</div>
        <div className="bg-gray-5 w-3 h-3  rounded-full"></div>
        <div className="">소수정예 8인 클래스로 설계된 강도</div>
        <div className="bg-gray-5 w-3 h-3  rounded-full"></div>
        <div className="">같은 연령대가 함께하는 편안한 분위기</div>
      </div>
    </section>
  );
}
