import { namehash } from 'viem';

export type Theme = {
  /** Full-page background (applied to a wrapper, not body, so routes can differ). */
  bg: string;
  accent: string; // primary CTA / highlight
  accent2: string; // secondary accent
  eyebrow: string; // eyebrow / label color
  heroGradient: string; // gradient for the big name
};

export type Collection = {
  slug: string; // /claim/<slug>
  parentName: string; // e.g. "miami.eth"
  parentNode: `0x${string}`;
  live: boolean; // claims open on-chain
  eyebrow: string;
  blurb: string;
  theme: Theme;
};

/** One entry per Beyond collection. Add a new hero domain here = new /claim route. */
export const COLLECTIONS: Record<string, Collection> = {
  miami: {
    slug: 'miami',
    parentName: 'miami.eth',
    parentNode: namehash('miami.eth') as `0x${string}`,
    live: true,
    eyebrow: 'Your name, onchain',
    blurb: 'A name on miami.eth that you own and keep, secured on Ethereum.',
    theme: {
      bg: 'radial-gradient(1200px 600px at 80% -10%, rgba(45,226,230,0.35), transparent 60%), radial-gradient(900px 500px at 10% 110%, rgba(255,184,108,0.30), transparent 55%), linear-gradient(160deg, #120a2e 0%, #0a0f2c 55%, #1a0f3a 100%)',
      accent: '#ff4f9a',
      accent2: '#ffb86c',
      eyebrow: '#2de2e6',
      heroGradient: 'linear-gradient(95deg, #ff4f9a, #ffb86c 55%, #2de2e6)',
    },
  },
  cyborg: {
    slug: 'cyborg',
    parentName: 'cyborg.eth',
    parentNode: namehash('cyborg.eth') as `0x${string}`,
    live: true,
    eyebrow: 'Identity for agents',
    blurb: 'A name on cyborg.eth: a verifiable onchain identity for you or your agent.',
    theme: {
      bg: 'radial-gradient(1000px 600px at 50% -10%, rgba(168,85,247,0.30), transparent 60%), radial-gradient(900px 500px at 90% 110%, rgba(45,226,230,0.22), transparent 55%), linear-gradient(160deg, #060814 0%, #0a0f1f 60%, #0c0820 100%)',
      accent: '#2de2e6',
      accent2: '#a855f7',
      eyebrow: '#7CFC9B',
      heroGradient: 'linear-gradient(95deg, #2de2e6, #7CFC9B 55%, #a855f7)',
    },
  },
  qubic: {
    slug: 'qubic',
    parentName: 'qubic.eth',
    parentNode: namehash('qubic.eth') as `0x${string}`,
    live: true,
    eyebrow: 'The bare metal blockchain',
    blurb: 'A name on qubic.eth that you own and keep, secured on Ethereum.',
    theme: {
      bg: 'radial-gradient(1100px 600px at 50% -10%, rgba(46,230,160,0.26), transparent 60%), linear-gradient(160deg, #04120c 0%, #06180f 55%, #03100a 100%)',
      accent: '#2ee6a0',
      accent2: '#9fffd6',
      eyebrow: '#9fffd6',
      heroGradient: 'linear-gradient(95deg, #2ee6a0, #9fffd6)',
    },
  },
};

export const COLLECTION_SLUGS = Object.keys(COLLECTIONS);
export const getCollection = (slug: string): Collection | undefined => COLLECTIONS[slug];
