interface LoadingProps {
  ismessage?: boolean;
}
export default function Loading({ ismessage }: LoadingProps) {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="w-[100px] h-[100px] border-[8px] border-t-[#005E38] border-r-[#005E38] border-b-[#005E38] border-l-transparent rounded-full animate-spin"></div>
      {ismessage && (
        <div className="py-[2rem] text-1.5-400">결제가 진행중입니다.</div>
      )}
    </div>
  );
}
