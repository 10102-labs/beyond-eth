'use client';

import { useEffect, useState } from 'react';
import { useReadContract } from 'wagmi';
import { parseEther } from 'viem';
import { REGISTRAR_ADDRESS, registrarAbi } from '@/lib/registrar';
import type { Promo } from '@/lib/collections';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

/**
 * Time-limited pricing banner with a live countdown.
 * Renders nothing until mounted (static export: the pre-rendered HTML has no
 * clock), nothing after the deadline, and nothing unless the registrar's live
 * standardPrice actually equals the advertised promo price. Old IPFS pins can
 * therefore never advertise a price the chain does not charge.
 */
export function PromoBanner({ promo, parentNode }: { promo: Promo; parentNode: `0x${string}` }) {
  const endsAt = Date.parse(promo.endsAtIso);
  const [remaining, setRemaining] = useState<number | null>(null);

  const { data: parentCfg } = useReadContract({
    address: REGISTRAR_ADDRESS,
    abi: registrarAbi,
    functionName: 'parents',
    args: [parentNode],
  });
  const priceMatches =
    parentCfg !== undefined && parentCfg[0] === true && parentCfg[2] === parseEther(promo.priceEth);

  useEffect(() => {
    setRemaining(endsAt - Date.now());
    const t = setInterval(() => {
      const left = endsAt - Date.now();
      setRemaining(left);
      if (left <= 0) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, [endsAt]);

  if (remaining === null || remaining <= 0 || !priceMatches) return null;

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);

  return (
    <div className="claim-promo">
      <div className="claim-promo-price">
        Launch window: <s>{promo.regularPriceEth} ETH</s> <strong>{promo.priceEth} ETH</strong> per name
      </div>
      <div className="claim-promo-timer">
        Ends {promo.endsAtLabel} ·{' '}
        {/* Per-second updates are noise for screen readers; the static end date above carries the information. */}
        <span className="claim-promo-count" aria-hidden="true">
          {days}d {pad(hours)}:{pad(minutes)}:{pad(seconds)} left
        </span>
      </div>
    </div>
  );
}
