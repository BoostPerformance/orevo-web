import Button from '@/app/components/common/button';
//import Image from 'next/image';
import Link from 'next/link';

export default function PaymentSuccess() {
  return (
    <div className="w-full max-w-4xl mx-auto flex py-[8rem] justify-center relative sm:items-center sm:flex-col sm:py-[6rem] sm:left-0">
      {/* <Image
        src="/images/sneakers.png"
        width={100}
        className="sm:w-[10rem] hidden sm:inline z-0 sm:relative pb-[2rem]"
        height={40}
        alt="신발이미지
        "
        priority
      /> */}
      <div className="flex flex-col gap-[3rem] w-[40rem] sm:w-auto sm:px-[2rem]">
        {/* <Image
          src="/images/logo.png"
          width={200}
          height={0}
          alt="logo"
          className="sm:hidden"
        /> */}
        <div className="flex flex-col sm:items-center sm:justify-center">
          <h1 className="text-1.875-300 font-theJamsil font-bold text-gray-5 xs:px-12">
            신청이 완료되었습니다.
          </h1>
          <p className="text-1.5-400 sm:text-center sm:text-base text-gray-5 mt-4 xs:text-1.25-500 xs:px-12">
            곧 작성하신 연락처로 연락드릴게요!
          </p>
        </div>

        <Link href="./" className="self-center">
          <Button variant="green">홈으로</Button>
        </Link>
      </div>
      <div className="absolute z-0 right-[20rem] sm:right-0 sm:hidden md:relative md:right-[20rem] md:z-[-1]">
        {/* <Image
          src="/images/sneakers.png"
          width={500}
          className="w-[27rem] h-[20.875rem] md:w-[30rem]"
          height={40}
          alt="404 이미지"
        /> */}
      </div>
    </div>
  );
}
