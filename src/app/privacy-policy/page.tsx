import { ReactNode } from 'react';
import privacyPolicyItems from '../data/privacyPolicyItems';

const Element = ({
  title,
  children,
}: {
  title: string;
  children: string | ReactNode;
}) => {
  return (
    <div className="pb-[3.75rem] flex flex-col gap-[0.81rem]">
      <div className="text-1.25-700 text-gray-5">{title}</div>
      <div className="text-1-500 text-gray-4">{children}</div>
    </div>
  );
};

export default function PrivacyPolicy() {
  return (
    <div className="flex justify-center items-center sm:p-[2rem] p-[6.88rem]">
      <div className="  flex flex-col items-start justify-center gap-[5rem]">
        <h1 className="text-3-700 sm:text-2-700 text-black-1">
          개인정보처리방침
        </h1>
        <div className="w-[53.6rem] sm:w-auto sm:p-0 flex flex-col gap-[0.81rem] pl-[3.16rem] pt-[3.12rem] pr-[4.47rem] pb-[6.5rem] ">
          {privacyPolicyItems.map((it, index) => (
            <Element key={index} title={it.title}>
              {it.content}
            </Element>
          ))}
        </div>
      </div>
    </div>
  );
}
