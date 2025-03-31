// app/api/subscriptions/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_ROLE_KEY!;

// 서버 사이드에서 supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  console.log('[API:subscriptions] 요청 수신');

  try {
    const data = await request.json();
    console.log(
      '[API:subscriptions] 수신된 데이터:',
      JSON.stringify(data, null, 2)
    );

    // 필수 데이터 확인
    console.log('[API:subscriptions] 필수 데이터 확인');
    const { users, programs, payments } = data;

    if (!users) {
      console.error('[API:subscriptions] users 데이터 누락');
      return NextResponse.json(
        { error: true, message: 'users 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (!programs) {
      console.error('[API:subscriptions] programs 데이터 누락');
      return NextResponse.json(
        { error: true, message: 'programs 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (!payments) {
      console.error('[API:subscriptions] payments 데이터 누락');
      return NextResponse.json(
        { error: true, message: 'payments 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    console.log('[API:subscriptions] 데이터 검증 통과, 세부 정보:', users, {
      users: {
        name: users.name,
        phone: users.phone,
        age_group: users.age_group,
        email: users.email,
      },
      programs: {
        program_type: programs.program_type,
        preferred_start_date: programs.preferred_start_date,
        preferred_time: programs.preferred_time,
      },
      payments: {
        amount: payments.amount,
        payment_key: payments.payment_key,
        order_id: payments.order_id,
      },
    });

    // supabase 연결 확인
    console.log('[API:subscriptions] Supabase 연결 확인');
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('[API:subscriptions] Supabase 환경변수 누락:', {
        supabaseUrl: !!supabaseUrl,
        supabaseServiceKey: !!supabaseServiceKey,
      });
      return NextResponse.json(
        { error: true, message: 'Supabase 연결 정보가 없습니다.' },
        { status: 500 }
      );
    }

    // 1. 사용자 정보 저장
    console.log('[API:subscriptions] 사용자 정보 저장 시도');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .upsert(
        {
          name: users.name,
          phone: users.phone,
          age_group: users.age_group,
          email: users.email || null,
          profile_image_url: users.profile_image_url || null,
          kakao_id: users.kakao_id || null,
        },
        { onConflict: 'phone' }
      )
      .select('id')
      .single();

    if (userError) {
      console.error('[API:subscriptions] 사용자 정보 저장 실패:', userError);
      return NextResponse.json(
        {
          error: true,
          message: '사용자 정보 저장에 실패했습니다.',
          details: userError,
        },
        { status: 500 }
      );
    }

    const userId = userData.id;
    console.log('[API:subscriptions] 사용자 정보 저장 성공, userId:', userId);

    // 2. 결제 정보 저장
    console.log('[API:subscriptions] 결제 정보 저장 시도');
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: payments.amount,
        payment_method: payments.payment_method,
        payment_status: 'COMPLETED',
        reference_type:
          programs.program_type === 'TRIAL' ? 'TRIAL' : 'MEMBERSHIP',
        transaction_id: payments.payment_key,
        order_id: payments.order_id,
        payment_date: payments.payment_date,
        card_type: payments.card_type,
        owner_type: payments.owner_type,
        currency: payments.currency,
        status: payments.status,
        approve_no: payments.approve_no,
      })
      .select('id')
      .single();

    if (paymentError) {
      console.error('[API:subscriptions] 결제 정보 저장 실패:', paymentError);
      return NextResponse.json(
        {
          error: true,
          message: '결제 정보 저장에 실패했습니다.',
          details: paymentError,
        },
        { status: 500 }
      );
    }

    const paymentId = paymentData.id;
    console.log(
      '[API:subscriptions] 결제 정보 저장 성공, paymentId:',
      paymentId
    );

    // 3. 프로그램 유형에 따라 다른 테이블에 데이터 저장
    const programType = programs.program_type; // 'TRIAL', 'MONTHLY', 'PACKAGE_10' 등
    console.log('[API:subscriptions] 프로그램 유형:', programType);

    if (programType === 'TRIAL') {
      console.log('[API:subscriptions] TRIAL 프로그램 등록 시도');
      // 멤버십 유형 조회 (TRIAL)
      const { data: membershipTypeData, error: membershipTypeError } =
        await supabase
          .from('membership_types')
          .select('id, price')
          .eq('name', 'TRIAL')
          .single();

      if (membershipTypeError) {
        console.error(
          '[API:subscriptions] 멤버십 유형 조회 실패:',
          membershipTypeError
        );
        return NextResponse.json(
          {
            error: true,
            message: '멤버십 유형 조회에 실패했습니다.',
            details: membershipTypeError,
          },
          { status: 500 }
        );
      }

      console.log(
        '[API:subscriptions] 멤버십 유형 조회 성공:',
        membershipTypeData
      );

      // 체험 프로그램 등록
      const { error: trialError } = await supabase
        .from('trial_registrations')
        .insert({
          user_id: userId,
          preferred_start_date: programs.preferred_start_date,
          preferred_time: programs.preferred_time,
          consent_to_terms: programs.consent_to_terms,
          is_first_time: true,
          registration_status: 'CONFIRMED',
          payment_status: 'COMPLETED',
          price: membershipTypeData.price,
          payment_id: paymentId,
        });

      if (trialError) {
        console.error(
          '[API:subscriptions] 체험 프로그램 등록 실패:',
          trialError
        );
        return NextResponse.json(
          {
            error: true,
            message: '체험 프로그램 등록에 실패했습니다.',
            details: trialError,
          },
          { status: 500 }
        );
      }

      console.log('[API:subscriptions] 체험 프로그램 등록 성공');
    } else {
      console.log(
        '[API:subscriptions] 일반 멤버십 등록 시도, 프로그램 타입:',
        programType
      );
      // 멤버십 유형 조회 (일반 멤버십)
      const { data: membershipTypeData, error: membershipTypeError } =
        await supabase
          .from('membership_types')
          .select('id, price, period_days, class_limit')
          .eq('name', programType)
          .single();

      if (membershipTypeError) {
        console.error(
          '[API:subscriptions] 멤버십 유형 조회 실패:',
          membershipTypeError
        );
        return NextResponse.json(
          {
            error: true,
            message: '멤버십 유형 조회에 실패했습니다.',
            details: membershipTypeError,
          },
          { status: 500 }
        );
      }

      console.log(
        '[API:subscriptions] 멤버십 유형 조회 성공:',
        membershipTypeData
      );

      // 시작일과 종료일 계산
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(startDate.getDate() + membershipTypeData.period_days);

      console.log('[API:subscriptions] 멤버십 기간:', {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        periodDays: membershipTypeData.period_days,
      });

      // 멤버십 등록
      const { error: membershipError } = await supabase
        .from('user_memberships')
        .insert({
          user_id: userId,
          membership_type_id: membershipTypeData.id,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          remaining_classes: membershipTypeData.class_limit,
          payment_status: 'COMPLETED',
          payment_id: paymentId,
          preferred_time: programs.preferred_time,
        });

      if (membershipError) {
        console.error('[API:subscriptions] 멤버십 등록 실패:', membershipError);
        return NextResponse.json(
          {
            error: true,
            message: '멤버십 등록에 실패했습니다.',
            details: membershipError,
          },
          { status: 500 }
        );
      }

      console.log('[API:subscriptions] 멤버십 등록 성공');
    }

    // 4. 결제 정보 업데이트 (reference_id 연결)
    console.log(
      '[API:subscriptions] 결제 정보 업데이트 시도 (reference_id 설정)'
    );
    const { error: paymentUpdateError } = await supabase
      .from('payments')
      .update({
        reference_id: userId,
      })
      .eq('id', paymentId);

    if (paymentUpdateError) {
      console.error(
        '[API:subscriptions] 결제 정보 업데이트 실패:',
        paymentUpdateError
      );
      // 이 에러는 치명적이지 않으므로 진행
    } else {
      console.log('[API:subscriptions] 결제 정보 업데이트 성공');
    }

    console.log('[API:subscriptions] 모든 처리 성공, 응답 반환');
    return NextResponse.json(
      {
        success: true,
        message: '결제 및 등록이 완료되었습니다.',
        user_id: userId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API:subscriptions] 처리 중 예외 발생:', error);
    return NextResponse.json(
      {
        error: true,
        message: '결제 처리 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
