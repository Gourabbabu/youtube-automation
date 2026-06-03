export default function Dashboard() {
  // Mock data for the dashboard UI
  const tasks = [
    { id: 1, title: 'Record Act 1 - Resident Evil Requiem', complexity: 'High', deadline: 'Today, 8:00 PM', done: false },
    { id: 2, title: 'Edit Cold Open (30s)', complexity: 'Medium', deadline: 'Today, 10:00 PM', done: false },
    { id: 3, title: 'Draft Thumbnail Concept for RE9', complexity: 'Low', deadline: 'Tomorrow, 7:00 PM', done: false },
  ];

  return (
    <div>
      <div className="header">
        <h2>Welcome back, Gourab.</h2>
        <p>Your automated tasks for today have been generated. It's time to create.</p>
      </div>

      <div className="dashboard-grid">
        <div className="card glass">
          <h3>
            Today's Tasks
            <span className="tag" style={{ background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>Active</span>
          </h3>
          <div className="task-list">
            {tasks.map(task => (
              <div key={task.id} className="task-item">
                <input type="checkbox" className="task-checkbox" defaultChecked={task.done} />
                <div className="task-content">
                  <div className="task-title">{task.title}</div>
                  <div className="task-meta">
                    <span className="tag" style={{ marginRight: '8px' }}>{task.complexity}</span>
                    Deadline: {task.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn" style={{ width: '100%', marginTop: '20px' }}>Mark Day Complete</button>
        </div>

        <div className="card glass">
          <h3>Channel North Star</h3>
          <p style={{ lineHeight: '1.6', color: 'var(--text-secondary)' }}>
            "Main ek banda hoon jo games se pyaar karta hai par time nahi hai. Jab bhi time milta hai — woh experience real hota hai. Yeh channel usi realness ke baare mein hai."
          </p>
          <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Current Series</div>
            <div style={{ fontWeight: '600' }}>Resident Evil Requiem</div>
            <div style={{ width: '100%', height: '6px', background: 'var(--surface)', borderRadius: '3px', marginTop: '8px' }}>
              <div style={{ width: '40%', height: '100%', background: 'var(--accent)', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
