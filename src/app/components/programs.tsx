import Image from 'next/image';

const Programs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[5.625rem] px-[10rem] gap-[6.875rem] text-gray-3 bg-beige-1 sm:px-[1rem] md:px-[1rem] md:py-[4rem] md:pb-[6rem]">
      <div className="flex flex-col items-center justify-center gap-[2rem] ">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700 sm:text-1.5-700">
          프로그램 소개
        </div>
        <div className="flex flex-col gap-[3rem] md:gap-[2rem]">
          <div className="flex flex-col items-center justify-center md:gap-[0.5rem]">
            <div className="text-2.5-700 sm:text-1.5-700 text-black">
              Cardio Day (화/금)
            </div>
            <div className="text-1.75-500 sm:text-1.25-500 text-center ">
              심폐지구력 향상과 체지방 감소를 위한 <br /> 유산소 운동 중심
              프로그램
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2.5-700 text-black sm:text-1.5-700">
              Strength Day (월/목)
            </div>
            <div className="text-1.75-500 sm:text-1.25-500 text-center ">
              근력 향상과 골밀도 강화를 위한 <br /> 근력운동 중심 프로그램
            </div>
          </div>
        </div>
      </div>
      <Image src="/svg/linear.svg" width={1000} height={1000} alt="linear" />

      <div className="flex flex-col items-center justify-center gap-[2rem]">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700 sm:text-1.5-700">
          스케줄
        </div>
        <div className="md:flex md:flex-col md:gap-[2rem]">
          <div className="flex flex-col items-center justify-center md:gap-[0.5rem]">
            <div className="text-2.5-700 text-black sm:text-1.5-700">
              Morning Class
            </div>
            <div className="text-1.75-500 sm:text-1.25-500 sm:text-center">
              월・화・목・금 &nbsp; 7:30 AM <br />
              월・화・목・금 &nbsp; 9:30 AM
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2.5-700 text-black  sm:text-1.5-700">
              Evening Class
            </div>
            <div className="text-1.75-500 sm:text-1.25-500 sm:text-center">
              화・목 &nbsp; 7:30 PM
            </div>
          </div>
        </div>
      </div>

      <Image src="/svg/linear.svg" width={1000} height={1000} alt="linear" />

      <div className="flex flex-col items-center gap-[1rem]">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700 sm:text-1.5-700">
          장소
        </div>
        <div className="text-1.75-500 sm:text-1.25-500 sm:text-center">
          서울 서대문구 연세로5길 26-17 4층 <br className="sm:inline hidden" />
          (신촌 현대백화점 도보 3분)
        </div>
      </div>
    </div>
  );
};

export default Programs;
