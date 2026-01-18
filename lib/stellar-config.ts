// Stellar/Soroban Configuration
export const STELLAR_CONFIG = {
  network: 'TESTNET' as const,
  networkPassphrase: 'Test SDF Network ; September 2015',
  horizonUrl: 'https://horizon-testnet.stellar.org',
  sorobanRpcUrl: 'https://soroban-testnet.stellar.org',
  
  // Contract IDs (will be updated after deployment)
  contracts: {
    sbt: process.env.NEXT_PUBLIC_SBT_CONTRACT_ID || '',
    identityPool: process.env.NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID || '',
    dharmaPool: process.env.NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID || '',
  },
  
  // Demo configuration
  mockKycEnabled: true,
  defaultQueryFee: '100000', // 0.01 XLM in stroops
  
  // Spending limits (in USDC, for UI display)
  spendingLimits: {
    min: 100,
    max: 10000,
    default: 1000,
  },
  
  // Time bounds options
  timeBounds: [
    { label: '1 hour', value: 3600 },
    { label: '6 hours', value: 21600 },
    { label: '24 hours', value: 86400 },
    { label: '7 days', value: 604800 },
    { label: '30 days', value: 2592000 },
  ],
  
  // Mock APY for demo
  mockApy: 15,
};

export type StellarNetwork = typeof STELLAR_CONFIG.network;
