type ButtonProps = {
  variant: 'green' | 'white'; // Union type for allowed variants
};

const buttonStyles = {
  green: 'bg-green text-white',
  white: 'bg-white text-green',
};

export default function Button({ variant }: ButtonProps) {
  return (
    <button
      className={`flex w-[29rem] py-[1.75rem] rounded-[0.75rem] px-[4.25rem] items-center justify-center text-1.75-900 ${buttonStyles[variant]}`}
    >
      체험수업 신청하기
    </button>
  );
}
