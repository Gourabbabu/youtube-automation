import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export async function POST(request) {
  try {
    const prompt = `
      You are the AI brain for Gourab's Gaming Channel.
      Based on the brand document (A busy B.Tech CSE professional, calm tone, Hinglish, emotional gaming experience, NOT a walkthrough channel), 
      generate 3 video ideas for the 'Resident Evil Requiem' series or general 'Developer Ki Nazar Se' pillar.
      
      For each idea, provide:
      1. Concept
      2. Title in Hinglish (e.g., 'Game Name — Hook | Hindi/Hinglish')
      3. Thumbnail visual description (Creator face + game moment)
      
      Return as a raw JSON array.
    `;

    const rawResponse = await generateText(prompt);
    // basic parsing for demo
    const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '');
    const ideas = JSON.parse(cleanJson);

    return NextResponse.json({ success: true, ideas });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
