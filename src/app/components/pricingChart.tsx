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
      titleEn: '10 class packs',
      price: 250000,
    },
    {
      title: '3회 체험권',
      titleEn: '3 class trial membership',
      price: 30000,
    },
  ];

  return (
    <div className="w-full rounded-3xl p-8 shadow-lg bg-green-800">
      <div className=" bg-white rounded-3xl p-8 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800">Pricing</h2>
        </div>
        <div className="space-y-6">
          {pricingOptions.map((option, index) => (
            <div
              key={index}
              className=" flex justify-around items-center py-4 border-b border-gray-200 last:border-0"
            >
              <div>
                <h3 className="text-xl font-semibold text-green-800">
                  {option.title}
                </h3>
                <p className="text-gray-600 text-sm">{option.titleEn}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-800">
                  {option.price.toLocaleString()}원
                </p>
                <p className="text-gray-600 text-sm">
                  ₩{option.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
          @orevo_official
        </div>
      </div>
    </div>
  );
}
