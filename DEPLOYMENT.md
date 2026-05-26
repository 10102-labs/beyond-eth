# Deployment

This site auto-deploys to IPFS and updates the `beyond.eth` ENS contenthash on every push to `main` via [Omnipin](https://github.com/omnipin/omnipin).

## Setup

The deploy wallet must already be approved on the ENS Public Resolver 3 (one-time setup, shared across all 10102 ENS site repos — see `tokenpot-eth/DEPLOYMENT.md` for the original setApprovalForAll instructions).

Fast path to configure this repo's secrets (uses the shared local `~/DevMac/claude-config/secrets/ens-deploy.env`):

```bash
~/DevMac/claude-config/scripts/setup-ens-site-secrets.sh 10102-labs/beyond-eth beyond.eth
```

That sets:
- Variable: `OMNIPIN_ENS = beyond.eth`
- Secrets: `OMNIPIN_PK`, `OMNIPIN_PINATA_TOKEN`, `OMNIPIN_LIGHTHOUSE_TOKEN`, `OMNIPIN_4EVERLAND_TOKEN`

## Trigger deploy

Push to `main`, or run the workflow manually from Actions. The workflow:

1. Pins `./public/` to Pinata + Lighthouse + 4everland
2. Calls `setContenthash` on `beyond.eth`'s ENS resolver

## Verify

- `https://beyond.eth.limo`
- Direct IPFS via the CID in workflow logs

5-15 min for ENS gateway cache to refresh.
