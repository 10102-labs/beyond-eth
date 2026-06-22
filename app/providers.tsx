'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const mainnetRpcUrl = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  ? `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  : 'https://ethereum-rpc.publicnode.com';

const config = getDefaultConfig({
  appName: 'Beyond',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'beyond_placeholder_projectid',
  chains: [mainnet],
  // Static export = client-only SPA, no server to coordinate SSR hydration.
  ssr: false,
  transports: { [mainnet.id]: http(mainnetRpcUrl) },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={darkTheme({ accentColor: '#5a95e4' })}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
