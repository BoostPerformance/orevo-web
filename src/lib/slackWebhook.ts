interface RegistrationData {
  name: string;
  phone: string;
  ageGroup: string;
  preferredDate: string;
  preferredTime: string;
}

interface SlackMessage {
  text: string;
  blocks?: Array<{
    type: string;
    text?: {
      type: string;
      text: string;
    };
  }>;
}

// const getSlackWebhookUrl = (): string | undefined => {
//   return process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
// };

export async function sendSuccessToSlack(data: RegistrationData) {
  const message: SlackMessage = {
    text: '🎉 새로운 체험 신청이 들어왔습니다!',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 새로운 체험 신청이 들어왔습니다!',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*이름:* ${data.name}\n*연락처:* ${data.phone}\n*연령대:* ${data.ageGroup}\n*희망 수업일:* ${data.preferredDate}\n*희망 수업시간:* ${data.preferredTime}`,
        },
      },
    ],
  };

  await sendToSlack(message);
}

export async function sendErrorToSlack(error: Error, data?: RegistrationData) {
  const message: SlackMessage = {
    text: '❌ 체험 신청 중 오류가 발생했습니다',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '❌ 체험 신청 중 오류가 발생했습니다',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*에러 메시지:* ${error.message}\n*스택 트레이스:* \`\`\`${
            error.stack
          }\`\`\`${
            data
              ? `\n*요청 데이터:* \`\`\`${JSON.stringify(data, null, 2)}\`\`\``
              : ''
          }`,
        },
      },
    ],
  };

  await sendToSlack(message);
}

async function sendToSlack(message: SlackMessage) {
  const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('Slack webhook URL is not configured');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to send Slack notification: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}
