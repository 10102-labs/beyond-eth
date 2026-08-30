'use client';

import { useState } from 'react';

const KV_URL = 'https://counters.10102.workers.dev';

/**
 * Optional post-claim email capture. Writes to the counters worker's public
 * email: prefix (anonymously writable by design, never anonymously listable)
 * with a per-collection source tag, e.g. email:qubic-claim:<address>.
 */
export function EmailCapture({ source }: { source: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'done' | 'already' | 'error'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (!normalized.includes('@')) return;
    const key = `email:${source}:${encodeURIComponent(normalized)}`;
    try {
      const existing = await fetch(`${KV_URL}?key=${key}`)
        .then((r) => (r.ok ? r.text() : null))
        .catch(() => null);
      if (existing) {
        setState('already');
        return;
      }
      const res = await fetch(`${KV_URL}?key=${key}&ttl=31536000`, {
        method: 'PUT',
        body: JSON.stringify({ email: normalized, timestamp: Date.now() }),
      });
      if (!res.ok) {
        setState('error');
        return;
      }
      fetch(`${KV_URL}?key=email_count_${source}`, { method: 'POST' }).catch(() => {});
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done' || state === 'already') {
    return <p className="email-note ok">{state === 'already' ? 'You are already in. Thanks!' : 'You are in. We will be in touch.'}</p>;
  }

  return (
    <form className="email-row" onSubmit={submit}>
      <p className="email-note">Want updates on drops and new collections? Optional.</p>
      <div className="email-fields">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address (optional)"
        />
        <button type="submit" disabled={!email.includes('@')}>
          Keep me posted
        </button>
      </div>
      {state === 'error' && <p className="email-note no">Something went wrong. Try again.</p>}
      <p className="email-note faint">No spam. Unsubscribe anytime.</p>
    </form>
  );
}
