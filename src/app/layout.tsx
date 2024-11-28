import type { Metadata } from 'next';
//import localFont from 'next/font/local';
import './globals.css';
import Head from 'next/head';
import Footer from './components/common/footer';
import Header from './components/common/header';

// const pretendard = localFont({
//   src: '@/fonts/PretendardVariable.woff2',
//   display: 'swap',
//   weight: '45 920',
//   variable: '--font-pretendard',
// });

export const metadata: Metadata = {
  title: 'Orevo',
  description: 'Orevo Web',
  icons: {
    icon: '/images/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <body className={`font-pretendard`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
