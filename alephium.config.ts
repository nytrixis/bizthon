import { Configuration } from '@alephium/cli'
const configuration: Configuration = {
  networks: {
    devnet: {
      nodeUrl: 'http://localhost:22973',
      networkId: 4,
      privateKeys: ['3b14b6e260a25099f647ea53945bcd79b3eb8250b17d31d1e19e36c91dbe8382'],
      settings: {}
    },
    testnet: {
      nodeUrl: '',
      networkId: 0,
      privateKeys: [],
      settings: {}
    },
    mainnet: {
      nodeUrl: '',
      networkId: 0,
      privateKeys: [],
      settings: {}
    }
  }
}

export default configuration
