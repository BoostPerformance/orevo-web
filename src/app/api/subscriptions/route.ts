// /api/subscriptions/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// 서버 사이드에서 supabase 클라이언트 생성
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 필수 데이터 확인
    const { users, exercise_preferences, programs, payment_info } = data;

    if (!users || !exercise_preferences || !programs || !payment_info) {
      return NextResponse.json(
        { error: true, message: '필수 데이터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 1. 사용자 정보 저장
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
      console.error('사용자 정보 저장 실패:', userError);
      return NextResponse.json(
        { error: true, message: '사용자 정보 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    const userId = userData.id;

    // 2. 멤버십 유형 확인 및 결제 정보 저장
    const programType = programs.program_type; // 'TRIAL', 'MONTHLY', 'PACKAGE_10' 등

    const { data: membershipTypeData, error: membershipTypeError } =
      await supabase
        .from('membership_types')
        .select('id, price')
        .eq('name', programType)
        .single();

    if (membershipTypeError) {
      console.error('멤버십 유형 조회 실패:', membershipTypeError);
      return NextResponse.json(
        { error: true, message: '멤버십 유형 조회에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 3. 결제 정보 저장
    const { data: paymentData, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: payment_info.amount,
        payment_method: payment_info.payment_method,
        payment_status: 'COMPLETED',
        reference_type: programType === 'TRIAL' ? 'TRIAL' : 'MEMBERSHIP',
        transaction_id: payment_info.payment_key,
      })
      .select('id')
      .single();

    if (paymentError) {
      console.error('결제 정보 저장 실패:', paymentError);
      return NextResponse.json(
        { error: true, message: '결제 정보 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    const paymentId = paymentData.id;

    // 4. 프로그램 유형에 따라 다른 처리
    if (programType === 'TRIAL') {
      // 체험 프로그램 등록
      const { error: trialError } = await supabase
        .from('trial_registrations')
        .insert({
          user_id: userId,
          preferred_start_date: programs.preferred_start_date || new Date(),
          preferred_time: programs.preferred_time || '08:15',
          consent_to_terms: true,
          is_first_time: true,
          registration_status: 'CONFIRMED',
          payment_status: 'COMPLETED',
          price: membershipTypeData.price,
        });

      if (trialError) {
        console.error('체험 프로그램 등록 실패:', trialError);
        return NextResponse.json(
          { error: true, message: '체험 프로그램 등록에 실패했습니다.' },
          { status: 500 }
        );
      }
    } else {
      // 일반 멤버십 등록
      const startDate = new Date();

      // 기간 계산 (멤버십 유형에 따라)
      const { data: periodData, error: periodError } = await supabase
        .from('membership_types')
        .select('period_days, class_limit')
        .eq('name', programType)
        .single();

      if (periodError) {
        console.error('멤버십 기간 조회 실패:', periodError);
        return NextResponse.json(
          { error: true, message: '멤버십 기간 조회에 실패했습니다.' },
          { status: 500 }
        );
      }

      const endDate = new Date();
      endDate.setDate(startDate.getDate() + periodData.period_days);

      const { error: membershipError } = await supabase
        .from('user_memberships')
        .insert({
          user_id: userId,
          membership_type_id: membershipTypeData.id,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
          remaining_classes: periodData.class_limit,
          payment_status: 'COMPLETED',
        });

      if (membershipError) {
        console.error('멤버십 등록 실패:', membershipError);
        return NextResponse.json(
          { error: true, message: '멤버십 등록에 실패했습니다.' },
          { status: 500 }
        );
      }
    }

    // 5. 결제 정보 업데이트 (reference_id 연결)
    const { error: paymentUpdateError } = await supabase
      .from('payments')
      .update({
        reference_id: userId,
      })
      .eq('id', paymentId);

    if (paymentUpdateError) {
      console.error('결제 정보 업데이트 실패:', paymentUpdateError);
      // 이 에러는 치명적이지 않으므로 진행
    }

    return NextResponse.json(
      {
        success: true,
        message: '결제 및 등록이 완료되었습니다.',
        user_id: userId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('결제 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: true, message: '결제 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
