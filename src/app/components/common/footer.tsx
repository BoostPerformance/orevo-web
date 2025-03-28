import Link from 'next/link';
import SnsIcons from './snsIcons';

export default function Footer() {
  return (
    <footer className="w-full py-[3rem] px-4 border-t border-gray-3">
      <div className="flex justify-between max-w-4xl mx-auto">
        <div className="flex flex-col gap-[2rem]">
          {/* Company Info */}
          <div className="leading-7 text-gray-1 text-1.25-500">
            <div>
              Fitculator (핏큘레이터) <br />
              사업자등록번호: 262-67-00523 | 대표:류현지
              <br />
              통신판매신고: 2023-서울서대문-0576
              <br />
              고객센터: 010-7977-1101
              <br />
              서울특별시 중구 청계천로 100 (시그니처타워)
              <br className="hidden sm:inline" /> 서관 10층 1029호
            </div>
            <div> ©2024 Fitculator. All rights reserved.</div>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-center gap-4 text-1.25-500">
            <Link
              href="/privacy-policy"
              className="text-gray-1 no-underline hover:text-gray-7"
            >
              개인정보처리방침
            </Link>
          </div>

          {/* Social Links */}
        </div>
        <SnsIcons />
      </div>
    </footer>
  );
}
