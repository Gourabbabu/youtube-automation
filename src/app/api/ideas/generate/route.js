import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const randomThemes = [
      "indie games with emotional depth (e.g., Firewatch, Hollow Knight, Outer Wilds)",
      "forgotten AA games or hidden gems",
      "new releases from 2025/2026",
      "horror games with psychological depth (e.g., Silent Hill 2 Remake, Alan Wake 2)",
      "narrative RPGs with difficult choices (e.g., Baldur's Gate 3, Disco Elysium)"
    ];
    const randomTheme = randomThemes[Math.floor(Math.random() * randomThemes.length)];

    const prompt = `
      You are the AI brain for an Indian YouTube gaming channel designed to be EXACTLY like '@Bindmove', but in Hindi/Hinglish.
      
      Current Date: ${currentDate} 2026. YOU MUST ONLY focus on games relevant RIGHT NOW. 

      CRITICAL RULE: DO NOT use Red Dead Redemption 2, Cyberpunk 2077, or Ghost of Tsushima. Those are too common.
      For this specific generation, please focus your ideas around: ${randomTheme}.

      Brand Identity (@Bindmove India): 
      - Format: Cinematic, slow-paced, philosophical video essays. 
      - Vibe: Melancholic, nostalgic, deep emotional resonance. Using video games as a canvas to talk about real life, loneliness, growing up, and human struggles.
      - Tone: Calm, poetic, reflective Hindi/Hinglish voiceover. Like a late-night conversation with a close friend.
      - NEVER just review a game or do a walkthrough. Every video is a life lesson disguised as a gaming video.
      
      Generate 3 highly specific, highly topical video ideas.
      
      For each idea, provide a detailed analysis:
      1. title: Title in Hinglish (e.g., 'Game Name — Zindagi ka sabse mushkil faisla | A Cinematic Essay')
      2. concept: The core philosophical and emotional narrative of the video essay. What real-life struggle does this game reflect?
      3. trendAnalysis: Why this game is highly relevant in ${currentDate} 2026 (e.g., recent DLC, sequel announcement, or current cultural mood).
      4. competitorAnalysis: How your cinematic, 'Bind-style' philosophical approach will completely stand out against typical loud Indian gaming videos.
      5. searchKeyword: A short 2-3 word English search term representing this video's core topic (to search YouTube for thumbnail references).
      
      Return as a raw JSON array. Do not include markdown code blocks, just the raw array.
    `;

    const rawResponse = await generateText(prompt);
    let cleanJson = rawResponse;
    const match = rawResponse.match(/\[[\s\S]*\]/);
    if (match) {
      cleanJson = match[0];
    } else {
      cleanJson = rawResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
    }
    let ideas = JSON.parse(cleanJson);

    // Fetch actual thumbnails for each idea using YouTube Data API
    const youtubeKey = process.env.YOUTUBE_API_KEY;
    
    if (youtubeKey) {
      for (let i = 0; i < ideas.length; i++) {
        const query = ideas[i].searchKeyword || ideas[i].title;
        try {
          const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${youtubeKey}`);
          const ytData = await ytRes.json();
          
          if (ytData.items) {
            ideas[i].referenceThumbnails = ytData.items.map(item => ({
              url: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
              title: item.snippet.title
            }));
          } else {
            ideas[i].referenceThumbnails = [];
          }
        } catch (ytError) {
          console.error("YouTube API Error:", ytError);
          ideas[i].referenceThumbnails = [];
        }
      }
    } else {
      // Provide fallback mock thumbnails if API key is missing
      ideas = ideas.map(idea => ({
        ...idea,
        referenceThumbnails: [
          { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80", title: "Add YOUTUBE_API_KEY to see real thumbs" },
          { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80", title: "Add YOUTUBE_API_KEY to see real thumbs" },
          { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80", title: "Add YOUTUBE_API_KEY to see real thumbs" }
        ]
      }));
    }

    return NextResponse.json({ success: true, ideas });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
