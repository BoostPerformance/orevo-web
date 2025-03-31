import Button from '@/app/components/common/button';
//import Image from 'next/image';
import Link from 'next/link';

export default function PaymentFail() {
  return (
    <div className="flex py-[8rem] justify-center relative sm:items-center sm:flex-col sm:py-[6rem] sm:left-0">
      {/* <Image
        src="/svg/404.svg"
        width={10}
        className="sm:w-[15rem] hidden sm:inline z-0 sm:relative mr-[5rem] pb-[2rem]"
        height={40}
        alt="404 이미지"
        priority
      /> */}
      <div className="flex flex-col gap-[1rem] w-[40rem] sm:w-auto sm:px-[3rem]">
        {/* <Image
          src="/images/logo.png"
          width={200}
          height={0}
          alt="logo"
          className="sm:hidden"
        /> */}
        <div className="flex flex-col sm:items-center sm:justify-center font-theJamsil">
          <h1 className="text-4.25-500">앗</h1>
          <h2 className="text-1.875-300 text-gray-11 ">
            결제에 실패 했습니다.
          </h2>
        </div>
        <p className="text-1.875-400 sm:text-center sm:text-[1.7rem]">
          아래 버튼을 누르면 <br className="block" />
          신청 페이지로 갈 수 있어요.
        </p>

        <Link href="/register">
          <Button variant="green">이전으로돌아가기</Button>
        </Link>
      </div>
      <div className="absolute z-0 right-[20rem] sm:right-0 sm:hidden md:relative md:right-[20rem] md:z-[-1]">
        {/* <Image
          src="/svg/404.svg"
          width={10}
          className="w-[35.4375rem] h-[20.875rem] md:w-[30rem]"
          height={40}
          alt="404 이미지"
        /> */}
      </div>
    </div>
  );
}
