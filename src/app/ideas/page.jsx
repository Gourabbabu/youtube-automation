"use client";

import { useState } from 'react';

export default function IdeasPage() {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "Resident Evil Requiem — Yeh Game Mujhe Ek Cheez Bhool Nahi Dega | RE9",
      concept: "Focus on the emotional exhaustion of the mid-game twist where Grace sacrifices her squad. Relate it to the feeling of trying so hard in real life and still failing.",
      thumbnail: "Split screen: Your face looking tired but thoughtful on the left. Right side: The exact moment Grace drops her weapon in the rain, heavily color-graded in cold blues."
    },
    {
      id: 2,
      title: "Maine Pehli Baar Valorant Khela — Aur Yeh Hua",
      concept: "A complete beginner's perspective on the chaotic comms and precise mechanics of Valorant. Highlight the 'developer ki nazar se' view on how the hit registration feels compared to single-player games.",
      thumbnail: "High contrast: You looking genuinely confused (not over-exaggerated) on the left. A chaotic, colorful explosion of abilities on a Valorant site on the right."
    }
  ]);

  const generateNewIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ideas/generate', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.ideas) {
        // Just appending mock IDs for UI purposes
        const newIdeas = data.ideas.map((idea, i) => ({ id: Date.now() + i, ...idea }));
        setIdeas([...newIdeas, ...ideas]);
      } else {
        alert("Make sure you added your GEMINI_API_KEY in Vercel!");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating ideas. Check console.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Video Ideas & Concepts</h2>
          <p>AI-generated concepts aligned with your Brand Identity.</p>
        </div>
        <button className="btn" onClick={generateNewIdeas} disabled={loading}>
          {loading ? 'Generating...' : '✨ Generate New Ideas'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {ideas.map((idea) => (
          <div key={idea.id} className="card glass">
            <h3 style={{ color: 'var(--accent)', fontSize: '1.25rem' }}>{idea.title}</h3>
            <div style={{ marginTop: '16px' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Concept: </strong>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{idea.concept}</span>
            </div>
            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: '3px solid var(--accent)' }}>
              <strong style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>🖼️ Thumbnail Vision: </strong>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{idea.thumbnail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
