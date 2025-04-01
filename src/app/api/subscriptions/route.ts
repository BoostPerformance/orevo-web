// app/api/subscriptions/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { sendSlackNotification } from '@/app/utils/slack';

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
        transaction_id: payments.transaction_id, // payment_key 대신 transaction_id로 수정
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

    // 2. 결제 정보 저장 - 수정된 부분: 필드 매핑을 데이터베이스 스키마에 맞게 수정
    console.log('[API:subscriptions] 결제 정보 저장 시도');
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: payments.amount,
        payment_method: payments.payment_method,
        payment_status: payments.payment_status || 'COMPLETED',
        reference_type:
          programs.program_type === 'TRIAL' ? 'TRIAL' : 'MEMBERSHIP',
        transaction_id: payments.transaction_id,
        // 수정: 불필요한 필드 제거
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

    // 사용자가 기존에 체험을 했는지 확인 (trial_registrations 테이블 조회)
    const { data: existingTrialData, error: existingTrialError } =
      await supabase
        .from('trial_registrations')
        .select('is_first_time')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(1);

    if (!existingTrialData) {
      console.error(
        '[API:subscriptions] 체험 기록 조회 실패:',
        existingTrialError
      );
    } else {
      console.log('[API:subscriptions] 체험 기록:', existingTrialData);
    }

    // 이전 체험 여부 확인
    const isFirstTrial =
      !existingTrialData ||
      existingTrialData.length === 0 ||
      existingTrialData[0].is_first_time;
    console.log('[API:subscriptions] 첫 체험 여부:', isFirstTrial);

    let trialRegistrationId = null; // 체험 등록 ID를 저장하기 위한 변수

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

      // 체험 프로그램 등록 - 수정: payment_id 필드 제거
      const { data: newTrialData, error: trialError } = await supabase
        .from('trial_registrations')
        .insert({
          user_id: userId,
          preferred_start_date: programs.preferred_start_date,
          consent_to_terms: programs.consent_to_terms,
          is_first_time: isFirstTrial,
          registration_status: 'CONFIRMED',
          payment_status: 'COMPLETED',
          price: membershipTypeData.price,
          // payment_id 필드 제거
        })
        .select('id, is_first_time')
        .single();

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
      trialRegistrationId = newTrialData.id; // 체험 등록 ID 저장
    } else {
      console.log(
        '[API:subscriptions] 일반 멤버십 등록 시도, 프로그램 타입:',
        programType
      );
      // 멤버십 유형 조회 (일반 멤버십)
      const { data: membershipTypeData, error: membershipTypeError } =
        await supabase
          .from('membership_types')
          .select('id, period_days, is_active')
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

      // 시작일과 종료일 계산 - TRIAL일 경우 3주(21일)로 고정, 아닐 경우 membershipTypeData.period_days 사용
      const startDate = new Date();
      const endDate = new Date();

      // programType이 'TRIAL'이면 21일, 아니면 membershipTypeData.period_days 사용
      const periodDays =
        programType === 'TRIAL' ? 21 : membershipTypeData.period_days;
      endDate.setDate(startDate.getDate() + periodDays);

      console.log('[API:subscriptions] 멤버십 기간:', {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        periodDays: periodDays,
      });

      // 멤버십 등록 - 수정: is_first_trial 참조 오류 수정
      const { error: membershipError } = await supabase
        .from('user_memberships')
        .insert({
          user_id: userId,
          membership_type_id: membershipTypeData.id,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          payment_status: 'COMPLETED',
          is_first_trial: isFirstTrial, // trialData 대신 isFirstTrial 사용
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

    // TRIAL일 경우 생성된 trial_registration의 ID를 reference_id로 사용,
    // 그렇지 않으면 userId를 reference_id로 사용
    const referenceId = programType === 'TRIAL' ? trialRegistrationId : userId;

    const { error: paymentUpdateError } = await supabase
      .from('payments')
      .update({
        reference_id: referenceId,
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

    // Slack 알림 전송
    console.log('[API:subscriptions] Slack 알림 전송 시도');
    try {
      // 프로그램 타입 한글로 변환
      let programTypeKorean = '체험 수업';
      if (programType === 'MONTHLY') {
        programTypeKorean = '1개월 멤버십';
      } else if (programType === 'PACKAGE_10') {
        programTypeKorean = '10회권';
      }

      await sendSlackNotification({
        name: users.name,
        phone: users.phone,
        ageGroup: mapAgeGroupToKorean(users.age_group),
        preferredDate: programs.preferred_start_date,
        preferredTime: `오전 ${programs.preferred_time}`,
        paymentInfo: {
          amount: payments.amount,
          paymentMethod: payments.payment_method,
          paymentDate: new Date().toLocaleString('ko-KR', {
            timeZone: 'Asia/Seoul',
          }),
          programType: programTypeKorean,
        },
      });
      console.log('[API:subscriptions] Slack 알림 전송 성공');
    } catch (slackError) {
      console.error('[API:subscriptions] Slack 알림 전송 실패:', slackError);
      // Slack 알림 실패는 전체 프로세스를 실패시키지 않음
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

// 연령대 영문 코드를 한글로 변환하는 함수
function mapAgeGroupToKorean(ageGroup: string): string {
  switch (ageGroup) {
    case '40s':
      return '40대';
    case '50s':
      return '50대';
    case '60s':
      return '60대';
    default:
      return '그 외';
  }
}
