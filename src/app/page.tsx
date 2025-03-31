'use client';

import MainImage from '@/app/components/mainImage';
import Intro from '@/app/components/intro';
import Programs from '@/app/components/programs';
import Registration from '@/app/components/registration';

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-beige-DEFAULT w-full">
      <MainImage />
      <Intro />
      <Programs />
      <Registration />
    </main>
  );
}
