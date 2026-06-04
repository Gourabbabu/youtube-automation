import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const youtubeKey = process.env.YOUTUBE_API_KEY;
    let marketDataContext = "Could not fetch live YouTube data. Rely on general 2026 gaming trends.";

    // 1. Live Market Data Pull (VidIQ Style)
    if (youtubeKey) {
      try {
        // Calculate date for 14 days ago (ISO 8601 format required by YouTube API)
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const publishedAfter = twoWeeksAgo.toISOString();

        // Search for highly viewed recent gaming essays
        const ytRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=gaming+video+essay|game+analysis&type=video&order=viewCount&publishedAfter=${publishedAfter}&maxResults=8&key=${youtubeKey}`);
        const ytData = await ytRes.json();

        if (ytData.items && ytData.items.length > 0) {
          const trendingVideos = ytData.items.map(item => `Title: "${item.snippet.title}" by ${item.snippet.channelTitle}`).join("\n");
          marketDataContext = `Here are the top trending gaming video essays from the last 14 days (ranked by views):\n${trendingVideos}`;
        }
      } catch (e) {
        console.error("Failed to fetch live trends:", e);
      }
    }

    // 2. Data-Augmented Generation
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const prompt = `
      You are the AI brain for an Indian YouTube gaming channel designed to be EXACTLY like '@Bindmove', but in Hindi/Hinglish.
      
      Current Date: ${currentDate} 2026.
      
      LIVE MARKET DATA (CRITICAL):
      ${marketDataContext}

      Your task is to analyze the LIVE MARKET DATA above (what is actually going viral right now) and generate 3 highly specific video ideas that capitalize on these trends but apply the '@Bindmove' philosophical style.

      Brand Identity (@Bindmove India): 
      - Format: Cinematic, slow-paced, philosophical video essays. 
      - Vibe: Melancholic, nostalgic, deep emotional resonance. Using video games as a canvas to talk about real life, loneliness, growing up, and human struggles.
      - Tone: Calm, poetic, reflective Hindi/Hinglish voiceover. Like a late-night conversation with a close friend.
      - NEVER just review a game or do a walkthrough. Every video is a life lesson.
      
      For each idea, provide a detailed analysis:
      1. title: Title in Hinglish (e.g., 'Game Name — Zindagi ka sabse mushkil faisla | A Cinematic Essay')
      2. concept: The core philosophical narrative of the video essay.
      3. trendAnalysis: Exactly how this idea taps into the LIVE MARKET DATA provided above.
      4. competitorAnalysis: How your cinematic approach stands out.
      5. searchKeyword: A short 2-3 word English search term representing this video's core topic (to search YouTube for thumbnail references).
      6. predictionScore: "Very High", "High", or "Medium". Based strictly on how strongly the idea correlates with the LIVE MARKET DATA trends.
      
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

    // 3. Fetch Thumbnail References (Same as before)
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
          console.error("YouTube API Error for thumbnails:", ytError);
          ideas[i].referenceThumbnails = [];
        }
      }
    } else {
      ideas = ideas.map(idea => ({
        ...idea,
        referenceThumbnails: [
          { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80", title: "Add YOUTUBE_API_KEY to see real thumbs" }
        ]
      }));
    }

    return NextResponse.json({ success: true, ideas });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
