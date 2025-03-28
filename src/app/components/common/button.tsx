'use client';
import { useRouter } from 'next/navigation';

type ButtonProps = {
  variant: 'green' | 'white';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
};

const buttonStyles = {
  green: 'bg-green text-white',
  white: 'bg-white text-green',
};

export default function Button({
  variant,
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  href,
  children,
}: ButtonProps) {
  const router = useRouter();
  const handleClick = () => {
    if (href) {
      router.push(href);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`flex w-[29rem] py-[1.75rem] rounded-[0.75rem] px-[4.25rem] items-center justify-center text-1.75-900 sm:text-1-700 xs:w-[15rem] xs:py-[1rem] xs:px-[2rem] xs:text-1-700 md:px-[1rem] md:w-[22rem] cursor-pointer border-none ${buttonStyles[variant]} ${className}`}
      onClick={handleClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
