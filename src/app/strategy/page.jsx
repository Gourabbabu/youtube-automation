export default function StrategyPage() {
  return (
    <div>
      <div className="header">
        <h2>Monthly Strategy Roadmap</h2>
        <p>Your curated franchise path. No random game hopping.</p>
      </div>

      <div className="card glass" style={{ marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '24px' }}>Current Path</h3>
        
        <div style={{ position: 'relative', paddingLeft: '30px', borderLeft: '2px solid var(--surface-border)', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-39px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--accent)', border: '4px solid var(--background)' }}></div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Series 1: Resident Evil Requiem</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
              Horror survival. Emotional, atmospheric. Chosen because of high search demand and zero saturation of honest Hinglish commentary.
            </p>
            <span className="tag" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', marginTop: '12px', display: 'inline-block' }}>In Progress (Video 1 of 4)</span>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-39px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--surface-border)', border: '4px solid var(--background)' }}></div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Pivot: Valorant</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
              Strategic pivot for traffic. Highest search volume among Indian gaming audiences. Positioned as learning competitive gaming as a beginner.
            </p>
            <span className="tag" style={{ marginTop: '12px', display: 'inline-block' }}>Up Next</span>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '-39px', top: '0', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--surface-border)', border: '4px solid var(--background)' }}></div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>Series 2: God of War (2018)</h4>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px', lineHeight: '1.5' }}>
              Return to story-driven content. Emotional father-son narrative. Evergreen content that accumulates views for years.
            </p>
            <span className="tag" style={{ marginTop: '12px', display: 'inline-block' }}>Planned</span>
          </div>

        </div>
      </div>
    </div>
  );
}
