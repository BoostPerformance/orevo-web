interface RegistrationData {
  name: string;
  phone: string;
  ageGroup: string;
  preferredDate: string;
  preferredTime: string;
}

export async function sendSlackNotification(data: RegistrationData) {
  const SLACK_WEBHOOK_URL = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;

  if (!SLACK_WEBHOOK_URL) {
    console.error('Slack webhook URL is not configured');
    return;
  }

  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 새로운 체험 수업 신청이 들어왔습니다!',
          emoji: true,
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*이름:*\n${data.name}`,
          },
          {
            type: 'mrkdwn',
            text: `*연락처:*\n${data.phone}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*연령대:*\n${data.ageGroup}`,
          },
          {
            type: 'mrkdwn',
            text: `*희망 수업 시간:*\n${data.preferredTime}`,
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*첫 수업 희망일:*\n${data.preferredDate}`,
          },
        ],
      },
      {
        type: 'context',
        elements: [
          {
            type: 'mrkdwn',
            text: `📅 신청일시: ${new Date().toLocaleString('ko-KR', {
              timeZone: 'Asia/Seoul',
            })}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error('Failed to send Slack notification');
    }
  } catch (error) {
    console.error('Error sending Slack notification:', error);
  }
}
