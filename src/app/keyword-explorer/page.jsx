"use client";

import { useState } from 'react';
import { useSession } from "next-auth/react";

export default function KeywordExplorer() {
  const { data: session } = useSession();
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword) return;

    setLoading(true);
    setResults(null);
    try {
      const response = await fetch('/api/keyword/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword })
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error analyzing keyword", error);
    }
    setLoading(false);
  };

  const getScoreColor = (score) => {
    if (score >= 70) return 'var(--success)';
    if (score >= 40) return '#f59e0b'; // warning/orange
    return 'var(--danger)';
  };

  return (
    <div>
      <div className="header" style={{ marginBottom: '24px' }}>
        <h2>🔍 Keyword Explorer</h2>
        <p>Analyze search volume, competition, and overall score like VidIQ.</p>
      </div>

      {!session ? (
        <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '24px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-secondary)' }}>You must connect your YouTube channel on the Dashboard to use the Keyword Explorer.</p>
        </div>
      ) : (
        <div style={{ maxWidth: '800px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
            <input 
              type="text" 
              placeholder="Enter a keyword (e.g. Resident Evil 9 leaks)" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface)', color: 'white', fontSize: '1.1rem' }}
            />
            <button type="submit" className="btn" disabled={loading} style={{ padding: '0 32px', fontSize: '1.1rem' }}>
              {loading ? "Analyzing..." : "Search"}
            </button>
          </form>

          {results && (
            <div className="card glass" style={{ animation: 'fadeIn 0.5s ease' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>"{results.keyword}"</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Based on current 2026 gaming trends</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Overall Score</p>
                  <p style={{ fontSize: '3rem', fontWeight: 'bold', color: getScoreColor(results.overallScore), lineHeight: '1' }}>
                    {results.overallScore}<span style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>/100</span>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '500' }}>Search Volume</span>
                    <span style={{ color: results.volumeScore > 50 ? 'var(--success)' : 'var(--danger)' }}>{results.volumeScore}/100</span>
                  </div>
                  <div style={{ width: '100%', height: '12px', background: 'var(--surface-border)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${results.volumeScore}%`, height: '100%', background: results.volumeScore > 50 ? 'var(--success)' : 'var(--danger)' }}></div>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: '500' }}>Competition</span>
                    <span style={{ color: results.competitionScore < 50 ? 'var(--success)' : 'var(--danger)' }}>
                      {results.competitionScore}/100 ({results.competitionScore > 70 ? 'High' : results.competitionScore > 40 ? 'Medium' : 'Low'})
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '12px', background: 'var(--surface-border)', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{ width: `${results.competitionScore}%`, height: '100%', background: results.competitionScore < 50 ? 'var(--success)' : 'var(--danger)' }}></div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '40px', padding: '24px', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--accent)' }}>
                <h4 style={{ marginBottom: '12px', color: 'var(--accent)' }}>AI Optimization Analysis</h4>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{results.analysis}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
