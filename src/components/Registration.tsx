import Link from 'next/link';

export default function Registration() {
  return (
    <>
      {/* Location Section */}

      {/* CTA Section */}
      <section className="w-full bg-green py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2-700 text-white mb-4">Orevo</h2>
          <p className="text-1.25-500 text-white mb-8">
            지금, 당신을 위한 건강한 변화를 시작하세요.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-green text-1-500 px-8 py-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            체험수업 신청하기
          </Link>
          <p className="text-white text-1-500 mt-8">문의: 010-7977-1101</p>
        </div>
      </section>
    </>
  );
}
