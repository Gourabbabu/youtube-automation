import './globals.css'
import Link from 'next/link'

import Providers from '@/components/Providers'

export const metadata = {
  title: 'Gourab Gaming - AI Brain',
  description: 'Automated YouTube Management Dashboard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <aside className="sidebar">
            <div>
              <h1>GOURAB'S SYSTEM</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '4px' }}>Automated AI Brain</p>
            </div>
            <nav className="nav-links">
              <Link href="/" className="nav-link">Dashboard</Link>
              <Link href="/keyword-explorer" className="nav-link" style={{ color: 'var(--accent)', fontWeight: 'bold' }}>🔍 Keyword Explorer</Link>
              <Link href="/ideas" className="nav-link">Video Ideas</Link>
              <Link href="/strategy" className="nav-link">Monthly Strategy</Link>
              <Link href="/brand" className="nav-link">Brand Identity</Link>
            </nav>
          </aside>
          <main className="main-content">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
