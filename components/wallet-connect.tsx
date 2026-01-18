'use client';

import { useWallet } from '@/lib/wallet-context';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

export function WalletConnect() {
  const { publicKey, isConnected, connect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
      toast.success('Connected');
    } catch (error) {
      toast.info('Demo mode');
    }
  };

  if (isConnected && publicKey) {
    return (
      <button className="neo-btn neo-btn-outline px-4 py-2 text-sm">
        <Wallet className="inline mr-2 h-4 w-4" />
        {publicKey.slice(0, 4)}...{publicKey.slice(-4)}
      </button>
    );
  }

  return (
    <button onClick={handleConnect} className="neo-btn neo-btn-primary px-6 py-2 text-sm">
      <Wallet className="inline mr-2 h-4 w-4" />
      Connect
    </button>
  );
}
