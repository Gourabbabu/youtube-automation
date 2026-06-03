import { NextResponse } from 'next/server';
import { sendDiscordNotification } from '@/lib/discord';

export async function GET(request) {
  // Security check for Vercel Cron
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Generate daily tasks here based on logic
    // We send a Discord notification with the tasks at 6 PM.
    const message = `**Daily YouTube Tasks - Gourab's Gaming Channel** 🎬\n\nIt's 6 PM. Time to create!\n\n- [ ] Record Act 1 - Resident Evil Requiem (High Complexity)\n- [ ] Edit Cold Open (30s) (Medium Complexity)\n\n*Remember the North Star: Yeh channel realness ke baare mein hai.*`;

    await sendDiscordNotification(message);

    return NextResponse.json({ success: true, message: 'Cron executed and Discord notified.' });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
