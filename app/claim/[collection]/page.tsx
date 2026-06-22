import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import { COLLECTION_SLUGS, getCollection } from '@/lib/collections';
import { ClaimFlow } from './ClaimFlow';
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
        <ClaimFlow parentName={c.parentName} parentNode={c.parentNode} />
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
