'use client';

import MainImage from '@/app/components/mainImage';
import Intro from '@/app/components/intro';
import Programs from '@/app/components/programs';
import Registration from '@/app/components/registration';

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
