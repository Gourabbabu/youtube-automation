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

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const prompt = `
      You are the AI brain for an Indian YouTube gaming channel designed to be EXACTLY like '@Bindmove', but in Hindi/Hinglish.
      Brand Document: Cinematic, slow-paced, philosophical video essays. Using video games as a canvas to talk about real life, loneliness, growing up, and human struggles. Calm, poetic voiceover. NEVER just review a game or do a walkthrough. Every video is a life lesson.

      Current Date: ${currentDate} 2026. Focus your strategy on the gaming climate of right now (late 2025/2026 releases or relevant resurgences).
      Current Context (User's Saved Ideas): ${ideasContext}

      Based on current 2026 gaming trends and the deeply emotional '@Bindmove' brand identity, generate a detailed 30-Day Content Strategy.
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
