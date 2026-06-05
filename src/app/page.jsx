"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { useSession, signIn, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [strategy, setStrategy] = useState(null);

  useEffect(() => {
    const ideas = localStorage.getItem('gourab_saved_ideas');
    if (ideas) setSavedIdeas(JSON.parse(ideas));

    const strat = localStorage.getItem('gourab_strategy');
    if (strat) setStrategy(JSON.parse(strat));
  }, []);

  return (
    <div>
      <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Dashboard</h2>
          <p>Your automated system status and priority tasks.</p>
        </div>
        <div>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{session.user?.name}</p>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--success)' }}>Channel Connected</p>
              </div>
              <button className="btn" style={{ background: 'var(--danger)' }} onClick={() => signOut()}>Disconnect</button>
            </div>
          ) : (
            <button className="btn" style={{ background: 'var(--primary)', color: 'black' }} onClick={() => signIn("google")}>
              Connect YouTube Channel
            </button>
          )}
        </div>
      </div>

      <div className="stats-grid">
        <div className="card glass">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Saved Concepts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginTop: '8px' }}>
            {savedIdeas.length}
          </p>
        </div>
        <div className="card glass">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Strategy</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: strategy ? 'var(--success)' : 'var(--danger)', marginTop: '8px' }}>
            {strategy ? "Active" : "Not Set"}
          </p>
        </div>
        <div className="card glass">
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Brand Persona</h3>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--accent)', marginTop: '8px' }}>
            "Live The Game" (Bind)
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div className="card glass">
          <h3 style={{ marginBottom: '24px' }}>Today's Priority Focus</h3>
          
          {strategy ? (
            <div style={{ background: 'rgba(56, 189, 248, 0.05)', borderLeft: '4px solid var(--primary)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Monthly Objective:</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{strategy.currentFocus}</p>
            </div>
          ) : (
             <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
              <p style={{ color: 'var(--text-secondary)' }}>You don't have a strategy set yet. <Link href="/strategy" style={{color: 'var(--primary)'}}>Generate one here.</Link></p>
            </div>
          )}

          <h4 style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>Your Saved Ideas Ready for Production:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {savedIdeas.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)' }}>No ideas saved. <Link href="/ideas" style={{color: 'var(--primary)'}}>Go generate some concepts.</Link></p>
            ) : (
              savedIdeas.slice(0, 3).map(idea => (
                <div key={idea.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--background)', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
                  <div>
                    <h5 style={{ color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '4px' }}>{idea.title}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{idea.searchKeyword}</p>
                  </div>
                  <button className="btn" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Start Script</button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card glass">
          <h3 style={{ marginBottom: '24px' }}>System Logs</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--success)', marginRight: '8px' }}>●</span>
              System Online - Awaiting 6 PM Trigger
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--success)', marginRight: '8px' }}>●</span>
              Gemini AI Connected (3.5-flash)
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span style={{ color: 'var(--success)', marginRight: '8px' }}>●</span>
              YouTube Data API Synced
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
