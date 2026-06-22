import type { Metadata } from 'next';
import Link from 'next/link';
import { COLLECTIONS } from '@/lib/collections';
import '../gallery.css';

export const metadata: Metadata = {
  title: 'Claim a name',
  description: 'Claim a permanent ENS name you own across the Beyond collections, secured on Ethereum.',
};

export default function ClaimIndex() {
  const collections = Object.values(COLLECTIONS);
  return (
    <div className="gallery-bg">
      <div className="container">
        <section className="hero">
          <div className="hero-eyebrow">Beyond</div>
          <h1 className="hero-title" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
            Claim a name
          </h1>
          <p className="hero-subtitle">Pick a collection. A permanent name you own, secured on Ethereum.</p>
        </section>

        <section>
          <div className="tile-grid">
            {collections.map((c) => (
              <Link key={c.slug} href={`/claim/${c.slug}`} className="tile">
                <div className="tile-header">
                  <span className="tile-name">{c.parentName}</span>
                  <span className={`tile-status ${c.live ? 'live' : ''}`}>{c.live ? 'Live' : 'Soon'}</span>
                </div>
                <div className="tile-category">Collection</div>
                <div className="tile-title">{c.eyebrow}</div>
                <div className="tile-description">{c.blurb}</div>
                <div className="tile-arrow">{c.live ? 'Claim →' : 'Preview →'}</div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="footer">
          <div className="footer-text">
            Part of <a href="/">Beyond</a> · built by{' '}
            <a href="https://10102.io" target="_blank" rel="noopener noreferrer">
              10102
            </a>
          </div>
          <div className="footer-meta">names are ENS subnames you hold in your own wallet</div>
        </footer>
      </div>
    </div>
  );
}
