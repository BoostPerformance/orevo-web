import './globals.css';
import Footer from '@/app/components/common/footer';
import Header from '@/app/components/common/header';
import Script from 'next/script';
import { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Orevo',
  description: '핏큘레이터와 함께 요요 없는 지속가능한 다이어트를 하세요',
  icons: {
    icon: '/svg/logo-white.svg',
  },
  keywords:
    '다이어트, 핏큘레이터, fitculator, 체중 관리, 식단관리, 운동관리, 비만탈출, 과체중, 운동 계획, 헬스, 체중감량, 고도비만, 다이어트 약, 위고비 다이어트, 위고비 효과, 위고비 감량, 위고비 체험, 비만치료제, 비만약, 다이어트주사, 오젬픽, 홈트레이닝, 체지방률 계산기, 피트니스 루틴, 개인 맞춤형 헬스 플랜, 칼로리 계산기, 초보자 운동, 체중 감량 여성, 근육 증가 남성',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`scrollbar-hide pretendard`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXX', { send_page_view: true });
        `}
      </Script>
      <body className="font-pretendard">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
