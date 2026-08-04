# Deployment

Every push to `main` (or a manual Actions run) triggers `.github/workflows/omnipin.yml`, which:

1. Builds the Next.js static export (`npm run build` to `./out`), injecting `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` and `NEXT_PUBLIC_ALCHEMY_API_KEY` from repo variables at build time
2. Pins `./out` to Pinata + Lighthouse + 4everland via [Omnipin](https://github.com/omnipin/omnipin) (`--strict`: all pins must succeed)
3. Updates the ENS contenthash on `beyond.eth` (directly with the deploy key, or via a Safe if the `OMNIPIN_SAFE` variable is set)

## One-time setup

The deploy wallet must already be approved on the ENS Public Resolver 3 (shared across all 10102 ENS site repos; see `tokenpot-eth/DEPLOYMENT.md` for the original setApprovalForAll instructions).

Fast path to configure this repo (uses the shared local `~/DevMac/claude-config/secrets/ens-deploy.env`):

```bash
~/DevMac/claude-config/scripts/setup-ens-site-secrets.sh 10102-labs/beyond-eth beyond.eth
```

That sets:

- Variable: `OMNIPIN_ENS = beyond.eth`
- Secrets: `OMNIPIN_PK`, `OMNIPIN_PINATA_TOKEN`, `OMNIPIN_LIGHTHOUSE_TOKEN`, `OMNIPIN_4EVERLAND_TOKEN`

In addition, this dApp needs repo variables for the client build (public values, inlined into the bundle):

- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` (required)
- `NEXT_PUBLIC_ALCHEMY_API_KEY` (optional; publicnode RPC fallback without it)

## Verify

- https://beyond.eth.limo
- Direct IPFS via the CID in the workflow logs

Allow 5 to 15 minutes for the ENS gateway cache to refresh.
