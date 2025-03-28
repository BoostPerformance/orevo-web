import Link from 'next/link';
import SnsIcons from './snsIcons';

export default function Footer() {
  return (
    <footer className="w-full py-[3rem] px-4 border-t border-gray-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-[2rem]">
          {/* Company Info */}
          <div className="leading-8 text-gray-5">
            <div>Fitculator (핏큘레이터)</div>
            <div>사업자등록번호: 262-67-00523 | 대표:류현지</div>
            <div>통신판매신고: 2023-서울서대문-0576</div>
            <div>고객센터: 010-7977-1101</div>
            <div>
              서울특별시 중구 청계천로 100 (시그니처타워){' '}
              <br className="hidden sm:inline" /> 서관 10층 1029호
            </div>
            <div> ©2024 Fitculator. All rights reserved.</div>
          </div>

          {/* Privacy Policy */}
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-gray-5 no-underline hover:text-gray-7"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social Links */}
          <SnsIcons />
        </div>
      </div>
    </footer>
  );
}
