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
            "Main tumhare saath pehli baar yeh games experience kar raha hoon — honestly, bina kisi script ke feeling ke, bina pretend kiye ki main pro hoon."
          </p>
        </div>

        <div className="card glass">
          <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '16px', marginBottom: '16px' }}>Tone & Language</h3>
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '16px' }}>
            <li>Natural conversational Hinglish.</li>
            <li>Calm, reflective, understated.</li>
            <li>Closer to a personal diary than a YouTube performance.</li>
            <li>Never loud, never fake energy (Think Bind).</li>
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
