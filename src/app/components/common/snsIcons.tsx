import Link from 'next/link';
import Image from 'next/image';

export default function SnsIcons() {
  return (
    <div className="flex gap-[0.94rem] sm:mt-[1.2rem] justify-center items-start">
      <Link href="mailto:info@fitculator.io">
        <Image
          src="/svg/email.svg"
          alt="Instagram"
          width={24}
          height={24}
          className="w-[1.7rem] h-[1.7rem]"
        />
      </Link>
      <Link href="https://instagram.com" target="_blank">
        <Image
          src="/svg/instagram.svg"
          alt="Instagram"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Link>
      <Link href="https://www.threads.net/@fitculator_official">
        <Image
          src="/svg/threads-logo.svg"
          alt="threads-logo"
          width={24}
          height={24}
          className="w-6 h-6"
        />
      </Link>
    </div>
  );
}
