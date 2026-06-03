import { NextResponse } from 'next/server';
import { generateText } from '@/lib/gemini';

export async function POST(request) {
  try {
    const prompt = `
      You are the AI brain for Gourab's Gaming Channel.
      Based on the brand document (A busy B.Tech CSE professional, calm tone, Hinglish, emotional gaming experience, NOT a walkthrough channel), 
      generate 3 video ideas for the 'Resident Evil Requiem' series or general 'Developer Ki Nazar Se' pillar.
      
      For each idea, provide a detailed analysis:
      1. title: Title in Hinglish (e.g., 'Game Name — Hook | Hindi/Hinglish')
      2. concept: The core narrative and personal angle of the video.
      3. trendAnalysis: Why this specific angle or game moment is trending or highly searched right now.
      4. competitorAnalysis: What other Indian gaming creators are doing wrong with this topic, and how your calm/developer approach beats them.
      5. searchKeyword: A short 2-3 word English search term representing this video's core topic (to search YouTube for thumbnail references).
      
      Return as a raw JSON array. Do not include markdown code blocks, just the raw array.
    `;

    const rawResponse = await generateText(prompt);
    const cleanJson = rawResponse.replace(/```json/g, '').replace(/```/g, '');
    let ideas = JSON.parse(cleanJson);

    // Fetch actual thumbnails for each idea using YouTube Data API
    const youtubeKey = process.env.YOUTUBE_API_KEY;
    
    if (youtubeKey) {
      for (let i = 0; i < ideas.length; i++) {
        const query = ideas[i].searchKeyword || ideas[i].title;
        try {
          const ytRes = await fetch(\`https://www.googleapis.com/youtube/v3/search?part=snippet&q=\${encodeURIComponent(query)}&type=video&maxResults=3&key=\${youtubeKey}\`);
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
