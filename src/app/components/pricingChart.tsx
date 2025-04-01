interface PricingOption {
  title: string;
  titleEn: string;
  price: number;
}

export default function PricingChart() {
  const pricingOptions: PricingOption[] = [
    {
      title: '1개월 멤버십',
      titleEn: '1 month membership',
      price: 300000,
    },
    {
      title: '10회권',
      titleEn: '10 classes pack',
      price: 250000,
    },
    {
      title: '3회 체험권',
      titleEn: '3 classes trial membership',
      price: 30000,
    },
  ];

  return (
    <div className="w-full rounded-3xl p-8 xs:py-6 xs:px-5 shadow-lg bg-green-800 xs:w-[95%] xs:flex xs:justify-center xs:items-center">
      <div className=" bg-white rounded-3xl p-8 shadow-lg xs:w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">Pricing</h2>
        </div>
        <div className="space-y-6 flex flex-col items-center">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className=" flex justify-between items-center py-4 border-b border-gray-200 last:border-0 w-[25rem] xs:w-full"
            >
              <div>
                <div className="lg:text-1.5-700 font-semibold text-green-800 xs:text-1-700">
                  {option.title}
                </div>
                <p className="text-gray-600 lg:text-1-500 xs:text-0.75-500">
                  {option.titleEn}
                </p>
              </div>
              <div className="text-right">
                <div className="lg:text-1.5-700 font-semibold text-green-800 xs:text-1-700">
                  {option.price.toLocaleString()}원
                </div>
                <p className="text-gray-600 lg:text-1-500 xs:text-0.75-500">
                  ₩{option.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
