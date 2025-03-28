import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { RegistrationData } from '@/app/types/registration';
import {
  sendSuccessToSlack as sendRegistrationSuccess,
  sendErrorToSlack as sendRegistrationError,
} from '@/app/lib/slackWebhook';

// Constants
// const TRANSACTION_TIMEOUT = 10000;
// const TRANSACTION_MAX_WAIT = 7000;

// const getSlackWebhookUrl = (): string | undefined => {
//   return process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
// };

// const sendErrorToSlack = async (error: Error, requestData?: any) => {
//   const webhookUrl = getSlackWebhookUrl();
//   if (!webhookUrl) return;

//   const errorMessage = {
//     text: '❌ 등록 프로세스 에러 발생',
//     blocks: [
//       {
//         type: 'section',
//         text: {
//           type: 'mrkdwn',
//           text: '*❌ 등록 프로세스 에러 발생*',
//         },
//       },
//       {
//         type: 'section',
//         text: {
//           type: 'mrkdwn',
//           text: `*에러 메시지:*\n${error.message || error}`,
//         },
//       },
//     ],
//   };

//   if (requestData) {
//     errorMessage.blocks.push({
//       type: 'section',
//       text: {
//         type: 'mrkdwn',
//         text: `*요청 데이터:*\n\`\`\`${JSON.stringify(
//           requestData,
//           null,
//           2
//         )}\`\`\``,
//       },
//     });
//   }

//   try {
//     await fetch(webhookUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(errorMessage),
//     });
//   } catch (slackError) {
//     console.error('Error sending to Slack:', slackError);
//   }
// };

// const sendSuccessToSlack = async (data: RegistrationData) => {
//   const webhookUrl = getSlackWebhookUrl();
//   if (!webhookUrl) {
//     console.error('Slack webhook URL is not configured');
//     return;
//   }

//   const message = {
//     blocks: [
//       {
//         type: 'header',
//         text: {
//           type: 'plain_text',
//           text: '🎉 새로운 체험 수업 신청이 들어왔습니다!',
//           emoji: true,
//         },
//       },
//       {
//         type: 'section',
//         fields: [
//           {
//             type: 'mrkdwn',
//             text: `*이름:*\n${data.name}`,
//           },
//           {
//             type: 'mrkdwn',
//             text: `*연락처:*\n${data.phone}`,
//           },
//         ],
//       },
//       {
//         type: 'section',
//         fields: [
//           {
//             type: 'mrkdwn',
//             text: `*연령대:*\n${data.ageGroup}`,
//           },
//           {
//             type: 'mrkdwn',
//             text: `*희망 수업 시간:*\n${data.preferredTime}`,
//           },
//         ],
//       },
//       {
//         type: 'section',
//         fields: [
//           {
//             type: 'mrkdwn',
//             text: `*첫 수업 희망일:*\n${data.preferredDate}`,
//           },
//         ],
//       },
//       {
//         type: 'context',
//         elements: [
//           {
//             type: 'mrkdwn',
//             text: `📅 신청일시: ${new Date().toLocaleString('ko-KR', {
//               timeZone: 'Asia/Seoul',
//             })}`,
//           },
//         ],
//       },
//     ],
//   };

//   try {
//     const response = await fetch(webhookUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send Slack notification');
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       await sendErrorToSlack(error, data);
//     }
//   }
// };

export async function POST(request: Request) {
  try {
    const data: RegistrationData = await request.json();

    // Validate required fields
    if (
      !data.name ||
      !data.phone ||
      !data.ageGroup ||
      !data.preferredDate ||
      !data.preferredTime
    ) {
      return NextResponse.json(
        { success: false, message: '필수 항목이 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Generate unique ID for the submission
    const submissionId = nanoid();

    // Send success notification to Slack
    await sendRegistrationSuccess(data);

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
      submissionId,
    });
  } catch (error: unknown) {
    console.error('Error processing submission:', error);

    // Send error notification to Slack
    if (error instanceof Error) {
      await sendRegistrationError(error);
    }

    return NextResponse.json(
      { success: false, message: '신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
