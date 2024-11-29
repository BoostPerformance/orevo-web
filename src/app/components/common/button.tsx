'use client';
import { useRouter } from 'next/navigation';

type ButtonProps = {
  variant: 'green' | 'white';
};

const buttonStyles = {
  green: 'bg-green text-white',
  white: 'bg-white text-green',
};

export default function Button({ variant }: ButtonProps) {
  const router = useRouter();
  return (
    <button
      className={`flex w-[29rem] py-[1.75rem] rounded-[0.75rem] px-[4.25rem] items-center justify-center text-1.75-900 sm:text-1-700 sm:w-[12rem] sm:py-[1rem] sm:px-[2rem] md:px-[1rem] md:w-[22rem] ${buttonStyles[variant]}`}
      onClick={() => router.push('https://tally.so/r/wQJdZG')}
    >
      체험수업 신청하기
    </button>
  );
}
