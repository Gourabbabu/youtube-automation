import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { keyword } = await request.json();

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword is required' }, { status: 400 });
    }

    const prompt = `
      You are the AI brain for an Indian YouTube gaming channel designed to be EXACTLY like '@Bindmove' (deep immersion, philosophical, escaping the busy life).
      You are acting as a "VidIQ Keyword Explorer" algorithm. 
      
      Analyze the YouTube gaming keyword: "${keyword}"
      
      Provide a realistic, data-driven analysis of this keyword for the year 2026.
      
      Return EXACTLY a JSON object with this structure:
      {
        "keyword": "${keyword}",
        "volumeScore": [number 1-100 representing how many people are searching for this],
        "competitionScore": [number 1-100 representing how many videos exist. HIGH is bad, LOW is good],
        "overallScore": [number 1-100. High Volume + Low Competition = High Score],
        "analysis": "A 2-3 sentence paragraph analyzing if this keyword fits the Bind persona and how the creator should title/frame the video."
      }
      
      Do not include any markdown formatting like \`\`\`json. Just return the raw JSON object.
    `;

    const response = await generateText(prompt);
    
    // Clean up response if it contains markdown code blocks
    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```/g, '').trim();
    }

    const data = JSON.parse(cleanedResponse);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error analyzing keyword:', error);
    return NextResponse.json({ error: 'Failed to analyze keyword' }, { status: 500 });
  }
}
