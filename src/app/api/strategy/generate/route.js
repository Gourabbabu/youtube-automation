import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { savedIdeas } = await request.json();

    let ideasContext = "No saved ideas yet. Rely on general trends for emotional, immersive gaming.";
    if (savedIdeas && savedIdeas.length > 0) {
      ideasContext = "Here are the user's saved favorite video ideas to draw inspiration from:\n" + savedIdeas.map(i => `- ${i.title}: ${i.concept}`).join("\n");
    }

    const prompt = `
      You are the AI brain for Gourab's Gaming Channel.
      Brand Document: A busy guy who misses gaming, wants to not just love but live games. Think of the channel 'Bind'. Pure immersion, heavy emotional connection, escaping the busy life, calm tone, Hinglish. NO developer angle, NO walkthroughs.

      Current Context: ${ideasContext}

      Based on current gaming trends and the brand identity, generate a detailed 30-Day Content Strategy.
      Return the strategy as a raw JSON object with the following exact structure (no markdown blocks, just raw JSON):
      {
        "currentFocus": "A 1-2 sentence summary of the main goal for this month (e.g. Building emotional connection through story-heavy single-player games).",
        "pillars": [
          {
            "name": "Name of Content Pillar 1",
            "description": "Why this pillar works for the 'Bind' persona."
          },
          {
            "name": "Name of Content Pillar 2",
            "description": "Why this pillar works."
          }
        ],
        "weeklyPlan": [
          "Week 1: Focus on XYZ",
          "Week 2: Focus on ABC",
          "Week 3: Focus on DEF",
          "Week 4: Focus on GHI"
        ]
      }
    `;

    const rawResponse = await generateText(prompt);
    let cleanJson = rawResponse;
    const match = rawResponse.match(/\{[\s\S]*\}/);
    if (match) {
      cleanJson = match[0];
    } else {
      cleanJson = rawResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
    }
    
    const strategy = JSON.parse(cleanJson);
    return NextResponse.json({ success: true, strategy });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
