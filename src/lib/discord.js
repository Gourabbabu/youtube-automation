export async function sendDiscordNotification(message, embeds = []) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn("No Discord Webhook URL provided. Skipping notification.");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: message,
        embeds: embeds
      }),
    });

    if (!response.ok) {
      throw new Error(`Discord API responded with ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error("Discord Notification Error:", error);
    return false;
  }
}
