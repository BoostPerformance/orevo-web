import Link from 'next/link';
import Image from 'next/image';

export default function SnsIcons() {
  return (
    <div className="flex gap-[0.94rem] sm:mt-[1.2rem] justify-end">
      <Link href="mailto:info@fitculator.io">
        <Image
          className="sm:size-[1rem] w-[1.9rem]"
          src="/svg/email.svg"
          alt="email"
          width={100}
          height={100}
        />
      </Link>
      <Link href="https://www.threads.net/@fitculator_official">
        <Image
          className="sm:size-[1rem] w-[1.5rem]"
          src="/svg/threads-logo.svg"
          alt="threads-logo"
          width={22}
          height={10}
        />
      </Link>
      <Link href="https://instagram.com/fitculator_official/">
        <Image
          className="sm:size-[1rem] w-[1.7rem]"
          src="svg/instagram.svg"
          alt="instagram-logo"
          width={24}
          height={10}
        />
      </Link>
    </div>
  );
}
