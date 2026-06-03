"use client";

import { useState } from 'react';

export default function IdeasPage() {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "Resident Evil Requiem — Yeh Game Mujhe Ek Cheez Bhool Nahi Dega | RE9",
      concept: "Focus on the emotional exhaustion of the mid-game twist where Grace sacrifices her squad. Relate it to the feeling of trying so hard in real life and still failing.",
      trendAnalysis: "Search volume for 'RE9 ending explained' and 'Grace death scene' is currently peaking. Viewers are actively looking for narrative deep-dives rather than just walkthroughs.",
      competitorAnalysis: "Most Indian creators are just screaming at the jump scares. No one is sitting down to discuss the actual trauma of the protagonist. Your calm reflection will stand out massively.",
      referenceThumbnails: [
        { url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80", title: "Reference 1" },
        { url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&q=80", title: "Reference 2" },
        { url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80", title: "Reference 3" }
      ]
    }
  ]);

  const generateNewIdeas = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ideas/generate', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.ideas) {
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
          <h2>Video Ideas & Market Context</h2>
          <p>AI-generated concepts, trend analysis, and real thumbnail references.</p>
        </div>
        <button className="btn" onClick={generateNewIdeas} disabled={loading}>
          {loading ? 'Generating...' : '✨ Generate Detailed Ideas'}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {ideas.map((idea) => (
          <div key={idea.id} className="card glass" style={{ padding: '32px' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', marginBottom: '24px' }}>
              {idea.title}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
              <div>
                <h4 style={{ color: 'var(--accent)', marginBottom: '8px', fontSize: '1rem' }}>The Concept</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>{idea.concept}</p>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                  <h4 style={{ color: 'var(--success)', marginBottom: '8px', fontSize: '0.9rem' }}>📈 Trend Analysis</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.85rem' }}>{idea.trendAnalysis}</p>
                </div>
                
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
                  <h4 style={{ color: 'var(--danger)', marginBottom: '8px', fontSize: '0.9rem' }}>⚔️ Competitor Analysis</h4>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '0.85rem' }}>{idea.competitorAnalysis}</p>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '1rem' }}>Top Thumbnail References (From YouTube)</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {idea.referenceThumbnails && idea.referenceThumbnails.map((thumb, idx) => (
                  <div key={idx} style={{ borderRadius: '8px', overflow: 'hidden', background: 'var(--background)' }}>
                    <img src={thumb.url} alt="Thumbnail Reference" style={{ width: '100%', height: 'auto', aspectRatio: '16/9', objectFit: 'cover' }} />
                    <div style={{ padding: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {thumb.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
