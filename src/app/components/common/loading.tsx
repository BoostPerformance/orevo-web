import Image from 'next/image';
interface LoadingProps {
  ismessage?: boolean;
}
export default function Loading({ ismessage }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        src="/images/logo-2.png"
        alt="로딩중 로고"
        width={100}
        height={100}
        className="animate-spin"
      />
      {ismessage && (
        <div className="py-[2rem] text-1.5-400">결제가 진행중입니다.</div>
      )}
    </div>
  );
}
