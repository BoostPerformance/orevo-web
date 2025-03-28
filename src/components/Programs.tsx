export default function Programs() {
  return (
    <>
      {/* Program Section */}
      <section className="w-full max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-2-700 text-center text-green mb-[2rem]">
          프로그램 소개
        </h2>

        <div className="flex flex-col gap-12">
          <div className="text-center">
            <h3 className="text-2.5-700 mb-4 text-gray-13">
              Cardio Day (화/금)
            </h3>
            <div className="flex flex-col gap-4 text-1.75-500 text-gray-5">
              <div>심박자구간 향상과 체지방 감소를 위한</div>
              <div>균형잡힌 운동 프로그램</div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2.5-700 mb-4 text-gray-13">
              Strength Day (월/목)
            </h3>
            <div className="flex flex-col gap-4 text-1.75-500 text-gray-5">
              <div>근력 향상과 균형도 강화를 위한</div>
              <div>근력운동 중심 프로그램</div>
            </div>
          </div>
        </div>
      </section>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="900"
        height="2"
        viewBox="0 0 900 2"
        fill="none"
      >
        <path d="M0 1H900" stroke="#005E38" strokeOpacity="0.3" />
      </svg>

      {/* Schedule Section */}
      <section className="w-full max-w-4xl mx-auto py-20 px-4">
        <h2 className="text-2-700 text-center  text-green mb-[2rem]">스케줄</h2>

        <div className="flex flex-col gap-12">
          <div className="text-center text-1.75-500">
            <div className="text-2.5-700 mb-4 text-gray-13">Morning Class</div>
            <div className="flex flex-col gap-1 text-1.75-500 text-gray-5">
              <div>월/화/목/금 7:30 AM</div>
              <div>월/화/목/금 9:30 AM</div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-2.5-700 mb-4 text-gray-13">Evening Class</div>
            <div className="flex flex-col gap-1 text-1.75-500 text-gray-5">
              <div>화/목 7:30 PM</div>
              <div>화/목 9:30 PM</div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="900"
            height="2"
            viewBox="0 0 900 2"
            fill="none"
          >
            <path d="M0 1H900" stroke="#005E38" strokeOpacity="0.3" />
          </svg>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto py-20 px-4 mb-[2rem]">
        <div className="text-2-700 text-center mb-8 text-green">장소</div>
        <div className="text-1.5-500 text-center text-gray-5">
          서울 서대문구 연희로5길 26-17 4층 (신촌 현대백화점 도보 3분)
        </div>
      </section>
    </>
  );
}
