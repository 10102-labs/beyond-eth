# beyond.eth

The permanent index of [10102](https://10102.io)'s IPFS-hosted ENS sites. Beyond ENS, beyond traditional hosting — sites that run for eternity.

Built by [10102](https://10102.io) · permanence and self-custody on Ethereum.

Live at: [beyond.eth.limo](https://beyond.eth.limo)

## Stack

Pure HTML / CSS. No JS, no framework, no external dependencies. ~12KB total.

```
public/
├── index.html
└── img/
    └── favicon.png
```

`.github/workflows/omnipin.yml` deploys `./public` to IPFS via [Omnipin](https://github.com/omnipin/omnipin) and updates the ENS contenthash on `beyond.eth`.

## Deploy

See [DEPLOYMENT.md](./DEPLOYMENT.md).
