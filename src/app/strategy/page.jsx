"use client";

import { useState, useEffect } from 'react';

export default function StrategyPage() {
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('gourab_strategy');
    if (stored) {
      setStrategy(JSON.parse(stored));
    }
  }, []);

  const generateStrategy = async () => {
    setLoading(true);
    try {
      const savedIdeas = JSON.parse(localStorage.getItem('gourab_saved_ideas') || '[]');
      
      const res = await fetch('/api/strategy/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ savedIdeas })
      });
      const data = await res.json();
      
      if (data.success && data.strategy) {
        setStrategy(data.strategy);
        localStorage.setItem('gourab_strategy', JSON.stringify(data.strategy));
      } else {
        alert(`Error: ${data.error || 'Failed to generate strategy'}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error generating strategy. Check console.");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2>Monthly Strategy Map</h2>
          <p>Dynamic 30-Day Content Path tailored to the 'Bind' persona.</p>
        </div>
        <button className="btn" onClick={generateStrategy} disabled={loading}>
          {loading ? 'Analyzing...' : '🧭 Generate Monthly Path'}
        </button>
      </div>

      {!strategy ? (
        <div className="card glass" style={{ textAlign: 'center', padding: '60px' }}>
          <h3 style={{ color: 'var(--text-secondary)' }}>No strategy set. Click "Generate Monthly Path" to build your roadmap based on current trends and your saved ideas.</h3>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div className="card glass" style={{ borderLeft: '4px solid var(--accent)' }}>
            <h3 style={{ color: 'var(--accent)', marginBottom: '16px' }}>Current Focus</h3>
            <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
              {strategy.currentFocus}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {strategy.pillars && strategy.pillars.map((pillar, idx) => (
              <div key={idx} className="card glass">
                <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Pillar {idx + 1}: {pillar.name}</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="card glass">
            <h3 style={{ marginBottom: '24px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px' }}>Weekly Execution Plan</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {strategy.weeklyPlan && strategy.weeklyPlan.map((week, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
                  <div style={{ background: 'var(--primary)', color: 'black', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                    {idx + 1}
                  </div>
                  <p style={{ color: 'var(--text-primary)' }}>{week}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
