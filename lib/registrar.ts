import { parseAbi } from 'viem';
import { mainnet } from 'wagmi/chains';

/** Deployed + Etherscan-verified parent-agnostic SubnameRegistrar (mainnet). */
export const REGISTRAR_ADDRESS = '0x16ebaA4A7f29E6c44DC344A4b81d78995C67ecD0' as const;
export const CHAIN = mainnet;

export const registrarAbi = parseAbi([
  'function parents(bytes32) view returns (bool enabled, uint64 ttl, uint256 standardPrice, uint256 memberFreeQuota)',
  'function available(bytes32 parentNode, string label) view returns (bool)',
  'function priceOf(bytes32 parentNode, string label, address buyer) view returns (uint256)',
  'function register(bytes32 parentNode, string label, address owner) payable returns (bytes32)',
]);

/** Post-mint: turn the new name into a verifiable onchain AI agent (Unruggable's app). */
export const ENS8004_URL = 'https://ens8004.xyz';
