import SnsIcons from './snsIcons';

const Footer = () => {
  return (
    <footer className="pt-[4.7rem] pb-[6.8rem] px-[10rem] bg-gray-2 sm:pl-[1.5rem] sm:px-[1rem] sm:pb-[6.5rem] sm:pt-[2.5rem] md:px-0 relative z-0">
      <div className="flex flex-row px-[3rem] md:px-[2.5rem] justify-between sm:flex-col-reverse gap-[11rem] mt-[4.5rem] sm:gap-[1rem] sm:items-start sm:m-0 sm:px-[1rem] ">
        <div className="flex flex-col gap-[1rem]">
          <p className="text-gray-3 md:text-1.125-500 sm:text-1.125-500 sm:items-left sm:my-[1rem]">
            Fitculator (핏큘레이터) <br />
            사업자등록번호: 262-67-00523 | 대표:류현지 <br />
            통신판매신고: 2023-서울서대문-0576 <br />
            고객센터: 010-7977-1101 <br />
            서울특별시 중구 청계천로 100 (시그니처타워) 서관 10층 1029호 <br />
            ©2024 Fitculator. All rights reserved.
          </p>
          <p className="text-gray-3">
            <a href="/privacy-policy">privacy policy</a>
          </p>
        </div>
        <SnsIcons />
      </div>
    </footer>
  );
};

export default Footer;
