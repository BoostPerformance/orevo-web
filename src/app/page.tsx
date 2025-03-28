'use client';

import MainImage from '@/components/MainImage';
import Intro from '@/components/Intro';
import Programs from '@/components/Programs';
import Registration from '@/components/Registration';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-beige-DEFAULT">
      <MainImage />
      <Intro />
      <Programs />
      <Registration />
    </main>
  );
}
