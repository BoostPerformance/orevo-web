export default function Programs() {
  return (
    <>
      {/* Program Section */}
      <section className="w-full max-w-4xl mx-auto py-20 lg:py-20 md:py-16 sm:py-12 xs:py-10">
        <h2 className="text-2-700 lg:text-2-700 md:text-1.75-700 sm:text-1.5-700 xs:text-1.25-700 text-center text-green mb-[2rem] lg:mb-[2rem] md:mb-[1.5rem] sm:mb-[1.25rem] xs:mb-[1rem]">
          프로그램 소개
        </h2>

        <div className="flex flex-col gap-12 lg:gap-12 md:gap-10 sm:gap-8 xs:gap-6">
          <div className="text-center">
            <div className="text-center">
              <h3 className="text-2.5-700 lg:text-2.5-700 md:text-2-700 sm:text-1.75-700 xs:text-1.25-700 mb-4 text-gray-13">
                Strength Training (월 · 목)
              </h3>
              <div className="flex flex-col gap-4 lg:gap-4 md:gap-3 sm:gap-2 xs:gap-1 text-1.75-500 lg:text-1.75-500 md:text-1.5-500 sm:text-1.25-500 xs:text-1-500 text-gray-5">
                <div>근력과 근육량 증가를 위한 운동</div>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-2.5-700 lg:text-2.5-700 md:text-2-700 sm:text-1.75-700 xs:text-1.25-700 mb-4 text-gray-13">
                Hybrid Training (화)
              </h3>
              <div className="flex flex-col gap-4 lg:gap-4 md:gap-3 sm:gap-2 xs:gap-1 text-1.75-500 lg:text-1.75-500 md:text-1.5-500 sm:text-1.25-500 xs:text-1-500 text-gray-5">
                <div>근력과 신체 협응성 향상을 위한 복합 운동</div>
              </div>
            </div>
            <h3 className="text-2.5-700 lg:text-2.5-700 md:text-2-700 sm:text-1.75-700 xs:text-1.25-700 mb-4 text-gray-13">
              Cardio Training (금)
            </h3>
            <div className="flex flex-col gap-4 lg:gap-4 md:gap-3 sm:gap-2 xs:gap-1 text-1.75-500 lg:text-1.75-500 md:text-1.5-500 sm:text-1.25-500 xs:text-1-500 text-gray-5">
              <div>근지구력 향상과 체지방 연소를 위한 운동</div>
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
        className="w-full max-w-[900px] mx-auto"
      >
        <path d="M0 1H900" stroke="#005E38" strokeOpacity="0.3" />
      </svg>

      {/* Schedule Section */}
      <section className="w-full max-w-4xl mx-auto py-20 lg:py-20 md:py-16 sm:py-12 xs:py-10">
        <div className="text-center">
          {/* <h2 className="text-green-700 text-2xl font-bold mb-4">스케줄</h2> */}
          <h2 className="text-2-700 lg:text-2-700 md:text-1.75-700 sm:text-1.5-700 xs:text-1.25-700 text-center text-green mb-[2rem] lg:mb-[2rem] md:mb-[1.5rem] sm:mb-[1.25rem] xs:mb-[1rem]">
            스케줄
          </h2>

          <div className="flex flex-col gap-12 lg:gap-12 md:gap-10 sm:gap-8 xs:gap-6">
            <div className="text-center">
              <div className="flex flex-col gap-4 lg:gap-4 md:gap-3 sm:gap-2 xs:gap-1 text-1.75-500 lg:text-1.75-500 md:text-1.5-500 sm:text-1.25-500 xs:text-1-500 text-gray-5">
                <div>월 · 화 · 목 · 금</div>
                <div>8:15 · 9:30 · 10:45 am</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-12 md:mt-10 sm:mt-8 xs:mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="900"
            height="2"
            viewBox="0 0 900 2"
            fill="none"
            className="w-full max-w-[900px] mx-auto"
          >
            <path d="M0 1H900" stroke="#005E38" strokeOpacity="0.3" />
          </svg>
        </div>
      </section>

      <section className="w-full max-w-4xl mx-auto py-20 lg:py-20 md:py-16 sm:py-12 xs:py-10 px-4 mb-[2rem] lg:mb-[2rem] md:mb-[1.5rem] sm:mb-[1.25rem] xs:mb-[1rem] xs:px-0">
        <div className="text-2-700 lg:text-2-700 md:text-1.75-700 sm:text-1.5-700 xs:text-1.25-700 text-center mb-8 lg:mb-8 md:mb-6 sm:mb-4 xs:mb-3 text-green">
          위치
        </div>
        <div className="text-1.5-500 lg:text-1.5-500 md:text-1.25-500 sm:text-1.25-500 xs:text-1-500 text-center text-gray-5">
          <span className="lg:inline md:inline sm:inline xs:block">
            서울특별시 서대문구 증가로 26-1 (1층)
          </span>
        </div>
      </section>
    </>
  );
}
