const Programs = () => {
  return (
    <div className="flex flex-col items-center justify-center py-[5.625rem] px-[31.875rem] gap-[6.875rem] text-gray-3">
      <div className="flex flex-col items-center justify-center gap-[2rem]">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700">
          프로그램 소개
        </div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2.5-700 text-black">Cardio Day (화/금)</div>
            <div>
              심폐지구력 향상과 체지방 감소를 위한 <br /> 유산소 운동 중심
              프로그램
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2.5-700 text-black">Strength Day (월/목)</div>
            <div>
              근력 향상과 골밀도 강화를 위한 <br /> 근력운동 중심 프로그램
            </div>
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="900"
        height="2"
        viewBox="0 0 900 2"
        fill="none"
      >
        <path d="M0 1H900" stroke="#005E38" strokeOpacity="0.3" />
      </svg>
      <div className="flex flex-col items-center justify-center gap-[2rem]">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700">
          스케줄
        </div>
        <div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2.5-700 text-black">Morning Class</div>
            <div>
              월/화/목/금 7:30 AM <br />
              월/화/목/금 9:30 AM
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-2.5-700 text-black">Evening Class</div>
            <div>화/목 7:30 PM</div>
          </div>
        </div>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="900"
        height="2"
        viewBox="0 0 900 2"
        fill="none"
      >
        <path d="M0 1H900" stroke="#005E38" strokeOpacity="0.3" />
      </svg>

      <div className="flex flex-col items-center gap-[1rem]">
        <div className="text-green flex items-center gap-[1rem] text-2.5-700">
          장소
        </div>
        <div>서울 서대문구 연세로5길 26-17 4층 (신촌 현대백화점 도보 3분)</div>
      </div>
    </div>
  );
};

export default Programs;
