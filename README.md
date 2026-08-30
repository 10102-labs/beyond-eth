# beyond.eth

The Beyond dApp by [10102](https://10102.io): a gallery of permanent ENS sites plus a claim flow for Beyond ENS subnames, all served from IPFS behind the `beyond.eth` name.

Live at [beyond.eth.limo](https://beyond.eth.limo).

## Stack

Next.js 16 App Router, exported as a fully static site (`output: 'export'`, no server). Wallet and chain layer: wagmi 2 + viem 2 + RainbowKit 2 on Ethereum mainnet.

## Routes

- `/` gallery of Beyond ENS sites
- `/claim` collection picker
- `/claim/[collection]` themed claim page per collection (miami, cyborg, qubic), defined in `lib/collections.ts`

The claim flow (`app/claim/[collection]/ClaimFlow.tsx`) normalizes the typed label, checks availability and price, then calls `register` on the SubnameRegistrar:

- Mainnet: `0x16ebaA4A7f29E6c44DC344A4b81d78995C67ecD0`
- Sepolia: `0xB0C77D01CbFa411C1d33F99B4afAD908Ae55c2C6`

After a successful mint the app links to [ens8004.xyz](https://ens8004.xyz) to activate the name as a verifiable onchain agent.

## Setup

```bash
npm install
cp .env.example .env
```

Environment variables (all client-visible `NEXT_PUBLIC_*`, no secrets):

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: required for wallet connections (WalletConnect/Reown project id)
- `NEXT_PUBLIC_ALCHEMY_API_KEY`: optional; without it the app uses the public `ethereum-rpc.publicnode.com` RPC

## Develop and build

```bash
npm run dev     # local dev server
npm run build   # static export to ./out
```

## Deploy

Every push to `main` builds the site and publishes `./out` to IPFS, then updates the `beyond.eth` contenthash. See [DEPLOYMENT.md](./DEPLOYMENT.md).
