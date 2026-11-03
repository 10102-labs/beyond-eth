'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { namehash, zeroAddress } from 'viem';
import { ENS_REGISTRY, ensRegistryAbi, resolverAbi } from '@/lib/registrar';

/**
 * The registrar sets a resolver on mint but no address record, so a fresh
 * name resolves to nothing until its owner links it. The minting wallet owns
 * the name, which is all the resolver needs to accept setAddr.
 */
export function LinkWallet({ name, owner }: { name: string; owner: `0x${string}` }) {
  const node = namehash(name);

  // The RPC can trail the mint receipt by a block; poll until the resolver shows up.
  const { data: resolver } = useReadContract({
    address: ENS_REGISTRY,
    abi: ensRegistryAbi,
    functionName: 'resolver',
    args: [node],
    query: { refetchInterval: (q) => (q.state.data && q.state.data !== zeroAddress ? false : 3000) },
  });
  const hasResolver = !!resolver && resolver !== zeroAddress;

  const { data: current } = useReadContract({
    address: resolver,
    abi: resolverAbi,
    functionName: 'addr',
    args: [node],
    query: { enabled: hasResolver },
  });

  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (!hasResolver || current === undefined) return null;

  if (isSuccess || current.toLowerCase() === owner.toLowerCase()) {
    return <p className="link-step ok">Linked. Payments sent to {name} on Ethereum now arrive in this wallet.</p>;
  }

  return (
    <div className="link-step">
      <p>One more step: link {name} to this wallet so payments sent to the name on Ethereum arrive here. It costs only a network fee.</p>
      <button
        className="cta"
        disabled={isPending || confirming}
        onClick={() =>
          writeContract({ address: resolver, abi: resolverAbi, functionName: 'setAddr', args: [node, owner] })
        }
      >
        {isPending ? 'Confirm in wallet…' : confirming ? 'Linking…' : 'Link to my wallet'}
      </button>
      {error && <p className="no">{(error as { shortMessage?: string }).shortMessage || 'Transaction failed'}</p>}
    </div>
  );
}
