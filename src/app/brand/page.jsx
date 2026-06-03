export default function BrandPage() {
  return (
    <div>
      <div className="header">
        <h2>Brand Identity Matrix</h2>
        <p>The core brain instructions feeding the AI generation engine.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card glass">
          <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', marginBottom: '16px' }}>Core Promise</h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontStyle: 'italic' }}>
            "I am building the Indian equivalent of @Bindmove. My videos are not just about games—they are philosophical essays about life, loneliness, and growing up, painted over the canvas of beautiful video games."
          </p>
        </div>

        <div className="card glass">
          <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', marginBottom: '16px' }}>Tone & Language</h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '16px' }}>
            <li>Natural, poetic, and reflective Hinglish.</li>
            <li>Calm, melancholic, and deeply personal.</li>
            <li>Closer to a late-night conversation with a friend than a YouTube video.</li>
            <li>Never loud, never hyperactive. Absolute immersion.</li>
          </ul>
        </div>

        <div className="card glass" style={{ gridColumn: '1 / -1' }}>
          <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', marginBottom: '16px' }}>Content Pillars</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Pillar 1: Deep Immersion (Long-Form)</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>15-25m videos. Personal narrative over curated footage. Escaping the busy life.</p>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Pillar 2: Emotional Shorts</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>High-impact cinematic cutscenes, emotional moments. Serves as a gateway to the main channel.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
