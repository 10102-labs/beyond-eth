import { Providers } from '../providers';

// Wallet stack loads ONLY under /claim — the gallery at / stays light.
export default function ClaimLayout({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
