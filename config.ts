import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected, metaMask, safe } from 'wagmi/connectors'

const MetaMaskOptions = {
  dappMetadata: {
    name: "nextjs-basics",
  },
  infuraAPIKey: "7d64820b87974b35b8a5cea853e23fd9",
  // Other options.
};

export const config = createConfig({
  chains: [sepolia, mainnet],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  connectors: [
    injected(),
    metaMask(MetaMaskOptions),
    safe(),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})