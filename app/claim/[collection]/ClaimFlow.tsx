'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { normalize } from 'viem/ens';
import { formatEther, zeroAddress } from 'viem';
import { REGISTRAR_ADDRESS, registrarAbi, ENS8004_URL } from '@/lib/registrar';

export function ClaimFlow({ parentName, parentNode }: { parentName: string; parentNode: `0x${string}` }) {
  const { address, isConnected } = useAccount();
  const [raw, setRaw] = useState('');
  const [label, setLabel] = useState('');
  const [labelError, setLabelError] = useState('');

  // Debounce + ENSIP-15 normalize the typed label.
  useEffect(() => {
    const t = setTimeout(() => {
      const v = raw.trim().toLowerCase();
      if (!v) {
        setLabel('');
        setLabelError('');
        return;
      }
      try {
        const n = normalize(v);
        if (n.includes('.')) {
          setLabel('');
          setLabelError('one label only, no dots');
        } else {
          setLabel(n);
          setLabelError('');
        }
      } catch {
        setLabel('');
        setLabelError('invalid characters');
      }
    }, 300);
    return () => clearTimeout(t);
  }, [raw]);

  // Non-blocking: used only to phrase the "unavailable" message correctly.
  const { data: parentCfg } = useReadContract({
    address: REGISTRAR_ADDRESS,
    abi: registrarAbi,
    functionName: 'parents',
    args: [parentNode],
  });
  const parentEnabled = parentCfg ? parentCfg[0] : false;

  const { data: isAvail, isLoading: checkingAvail } = useReadContract({
    address: REGISTRAR_ADDRESS,
    abi: registrarAbi,
    functionName: 'available',
    args: [parentNode, label],
    query: { enabled: !!label },
  });

  const { data: price } = useReadContract({
    address: REGISTRAR_ADDRESS,
    abi: registrarAbi,
    functionName: 'priceOf',
    args: [parentNode, label, address ?? zeroAddress],
    query: { enabled: !!label && isAvail === true },
  });

  const { writeContract, data: hash, isPending, error: writeError } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  const fullName = label ? `${label}.${parentName}` : '';
  const priceLabel = price !== undefined ? `${formatEther(price)} ETH` : '';

  function claim() {
    if (!address || price === undefined) return;
    writeContract({
      address: REGISTRAR_ADDRESS,
      abi: registrarAbi,
      functionName: 'register',
      args: [parentNode, label, address],
      value: price,
    });
  }

  if (isSuccess) {
    return (
      <div className="card">
        <div className="success">
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>{fullName} is yours.</div>
          <div className="muted" style={{ marginBottom: 12 }}>It is in your wallet now.</div>
          <a href={ENS8004_URL} target="_blank" rel="noopener noreferrer">
            Make it a verifiable AI agent →
          </a>
        </div>
      </div>
    );
  }

  const canClaim = !!label && isAvail === true && price !== undefined && !isPending && !confirming;

  return (
    <div className="card">
      <div className="field">
        <input
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder="yourname"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Desired name"
        />
        <span className="suffix">.{parentName}</span>
      </div>

      <div className="status">
        {labelError && <span className="no">{labelError}</span>}
        {!labelError && label && checkingAvail && <span className="muted">Checking {fullName}…</span>}
        {!labelError && label && isAvail === true && price !== undefined && (
          <span className="ok">
            {fullName} is available for {priceLabel}
          </span>
        )}
        {!labelError && label && isAvail === false && parentEnabled && (
          <span className="no">{fullName} is taken</span>
        )}
        {!labelError && label && isAvail === false && !parentEnabled && (
          <span className="muted">Registration opens at launch</span>
        )}
      </div>

      {!isConnected ? (
        <div className="connect-row">
          <ConnectButton />
        </div>
      ) : (
        <button className="cta" disabled={!canClaim} onClick={claim}>
          {isPending
            ? 'Confirm in wallet…'
            : confirming
              ? 'Minting…'
              : canClaim
                ? `Claim ${fullName} for ${priceLabel}`
                : 'Claim'}
        </button>
      )}

      {writeError && (
        <div className="status no">{(writeError as { shortMessage?: string }).shortMessage || 'Transaction failed'}</div>
      )}
    </div>
  );
}
