import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import { COLLECTION_SLUGS, getCollection } from '@/lib/collections';
import { ClaimFlow } from './ClaimFlow';
import { PromoBanner } from './PromoBanner';
import '../claim.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return COLLECTION_SLUGS.map((collection) => ({ collection }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection } = await params;
  const c = getCollection(collection);
  if (!c) return {};
  return {
    title: `Claim your ${c.parentName} name`,
    description: c.blurb,
  };
}

export default async function ClaimPage({ params }: { params: Promise<{ collection: string }> }) {
  const { collection } = await params;
  const c = getCollection(collection);
  if (!c) notFound();

  const rootStyle: CSSProperties = {
    background: c.theme.bg,
    ['--accent' as string]: c.theme.accent,
    ['--accent2' as string]: c.theme.accent2,
    ['--eyebrow' as string]: c.theme.eyebrow,
  };

  return (
    <main className="claim-root" style={rootStyle}>
      <div className="claim-inner">
        <div className="claim-eyebrow">{c.eyebrow}</div>
        <h1 className="claim-title" style={{ backgroundImage: c.theme.heroGradient }}>
          {c.parentName}
        </h1>
        <p className="claim-sub">{c.blurb}</p>
        {c.promo && <PromoBanner promo={c.promo} parentNode={c.parentNode} />}
        <ClaimFlow parentName={c.parentName} parentNode={c.parentNode} />
        <section className="claim-benefits" aria-label="What you get">
          <div className="benefit">
            <h3>Minted to your wallet</h3>
            <p>
              Your name is an ENS subname token that you hold. Use it, transfer it, or sell it. One
              payment: no renewal fees to 10102, no subscription.
            </p>
          </div>
          <div className="benefit">
            <h3>Only yours</h3>
            <p>
              Names are emancipated at mint. Onchain, 10102 cannot revoke, edit, or reclaim your
              name. Not now, not ever.
            </p>
          </div>
          <div className="benefit">
            <h3>Works everywhere ENS does</h3>
            <p>
              Point it at your address, avatar, and website in the{' '}
              <a href="https://app.ens.domains" target="_blank" rel="noopener noreferrer">
                ENS app
              </a>
              . Wallets and dapps resolve it like any .eth name.
            </p>
          </div>
          {c.slug === 'cyborg' ? (
            <div className="benefit">
              <h3>Ready for the agent era</h3>
              <p>
                Your name appears automatically in the live agent directory on{' '}
                <a href="https://cyborg.eth.limo" target="_blank" rel="noopener noreferrer">
                  cyborg.eth
                </a>
                . Activate it as a verifiable onchain agent with{' '}
                <a href="https://ens8004.xyz" target="_blank" rel="noopener noreferrer">
                  ERC-8004
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="benefit">
              <h3>Ready for the agent era</h3>
              <p>
                Give it to your AI agent as a verifiable onchain identity with{' '}
                <a href="https://ens8004.xyz" target="_blank" rel="noopener noreferrer">
                  ERC-8004
                </a>
                . Building agents? <a href="/claim/cyborg/">cyborg.eth</a> is the collection made
                for them, with a live agent directory.
              </p>
            </div>
          )}
        </section>
        <div className="claim-foot">
          Part of <a href="/">Beyond</a> · built by{' '}
          <a href="https://10102.io" target="_blank" rel="noopener noreferrer">
            10102
          </a>
        </div>
      </div>
    </main>
  );
}
