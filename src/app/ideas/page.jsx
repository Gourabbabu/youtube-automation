"use client";

import { useState, useEffect } from 'react';

export default function IdeasPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('generated'); // 'generated' or 'saved'
  const [ideas, setIdeas] = useState([]);
  const [savedIdeas, setSavedIdeas] = useState([]);

  // Load saved ideas from Local Storage on mount
  useEffect(() => {
    const stored = localStorage.getItem('gourab_saved_ideas');
    if (stored) {
      setSavedIdeas(JSON.parse(stored));
    }
  }, []);

  const saveIdea = (idea) => {
    const newSaved = [idea, ...savedIdeas];
    setSavedIdeas(newSaved);
    localStorage.setItem('gourab_saved_ideas', JSON.stringify(newSaved));
    alert("Idea Saved!");
  };

  const removeIdea = (id) => {
    const newSaved = savedIdeas.filter(i => i.id !== id);
    setSavedIdeas(newSaved);
    localStorage.setItem('gourab_saved_ideas', JSON.stringify(newSaved));
  };

  const generateNewIdeas = async () => {
    setLoading(true);
    setActiveTab('generated');
    try {
      const res = await fetch('/api/ideas/generate', { method: 'POST' });
      const data = await res.json();
      if (data.success && data.ideas) {
        const newIdeas = data.ideas.map((idea, i) => ({ id: Date.now() + i, ...idea }));
        setIdeas(newIdeas); // Replace instead of append for clean view
      } else {
        alert(`Error from API: ${data.error || 'Failed to parse AI response'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error generating ideas. Check console.");
    }
    setLoading(false);
  };

  const renderIdeaCard = (idea, isSavedTab) => (
    <div key={idea.id} className="card glass" style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', margin: 0 }}>
            {idea.title}
          </h3>
          {idea.predictionScore && (
            <span style={{ 
              background: idea.predictionScore.includes('High') ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)', 
              color: idea.predictionScore.includes('High') ? 'var(--success)' : 'var(--warning)', 
              padding: '4px 12px', 
              borderRadius: '16px', 
              fontSize: '0.8rem', 
              fontWeight: 'bold',
              border: `1px solid ${idea.predictionScore.includes('High') ? 'var(--success)' : 'var(--warning)'}` 
            }}>
              Score: {idea.predictionScore}
            </span>
          )}
        </div>
        {isSavedTab ? (
          <button className="btn" style={{ background: 'var(--danger)' }} onClick={() => removeIdea(idea.id)}>Delete</button>
        ) : (
          <button className="btn" onClick={() => saveIdea(idea)}>💾 Save Idea</button>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
        <div>
          <h4 style={{ color: 'var(--accent)', marginBottom: '8px', fontSize: '1rem' }}>The Concept (Immersion Focus)</h4>
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
  );

  const activeArray = activeTab === 'generated' ? ideas : savedIdeas;

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

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('generated')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'generated' ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '1.1rem', cursor: 'pointer', fontWeight: activeTab === 'generated' ? '600' : '400' }}
        >
          Latest Generation
        </button>
        <button 
          onClick={() => setActiveTab('saved')} 
          style={{ background: 'none', border: 'none', color: activeTab === 'saved' ? 'var(--text-primary)' : 'var(--text-secondary)', fontSize: '1.1rem', cursor: 'pointer', fontWeight: activeTab === 'saved' ? '600' : '400' }}
        >
          Saved Ideas ({savedIdeas.length})
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {activeArray.length === 0 && !loading && (
          <div className="card glass" style={{ textAlign: 'center', padding: '60px' }}>
            <h3 style={{ color: 'var(--text-secondary)' }}>
              {activeTab === 'generated' ? 'No ideas yet. Click "Generate Detailed Ideas" to begin!' : 'You have no saved ideas.'}
            </h3>
          </div>
        )}
        {activeArray.map(idea => renderIdeaCard(idea, activeTab === 'saved'))}
      </div>
    </div>
  );
}
