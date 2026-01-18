'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { STELLAR_CONFIG } from '@/lib/stellar-config';
import { toast } from 'sonner';
import { Coins, Clock, TrendingUp, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/lib/wallet-context';
import { contractClient } from '@/lib/contract-client';

export default function StakePage() {
  const { publicKey, isConnected, signTransaction } = useWallet();
  const [spendingLimit, setSpendingLimit] = useState(1000);
  const [timeBound, setTimeBound] = useState('86400');
  const [isStaking, setIsStaking] = useState(false);
  const [isStaked, setIsStaked] = useState(false);
  const [txHash, setTxHash] = useState('');

  const handleStake = async () => {
    if (!isConnected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsStaking(true);

      // Stake identity on-chain
      const xdr = await contractClient.stakeIdentity(
        publicKey,
        spendingLimit,
        parseInt(timeBound)
      );
      const signedXDR = await signTransaction(xdr);
      const result = await contractClient.submitTransaction(signedXDR);

      setTxHash(result.hash);
      setIsStaked(true);
      toast.success('Identity staked on Stellar!');
    } catch (error: any) {
      console.error('Error staking:', error);
      toast.error(error.message || 'Failed to stake identity');
    } finally {
      setIsStaking(false);
    }
  };

  const selectedTimeBound = STELLAR_CONFIG.timeBounds.find(
    tb => tb.value.toString() === timeBound
  );

  const estimatedEarnings = (spendingLimit * STELLAR_CONFIG.mockApy) / 100;

  if (isStaked) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <div className="neo-card p-8 text-center fade-in">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 border-2 border-black mb-6 shadow-[4px_4px_0px_0px_#0a0a0a]">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-black mb-3">Identity Staked!</h3>
              <p className="text-gray-600 mb-8">
                Your compliance capacity is now available for AI agents
              </p>

              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 mb-8">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 mb-1">Spending Limit</p>
                    <p className="text-2xl font-black">${spendingLimit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Time Bound</p>
                    <p className="text-2xl font-black">{selectedTimeBound?.label}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Estimated APY</p>
                    <p className="text-2xl font-black text-green-600">{STELLAR_CONFIG.mockApy}%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Annual Earnings</p>
                    <p className="text-2xl font-black text-green-600">${estimatedEarnings}</p>
                  </div>
                  {txHash && (
                    <div className="col-span-2">
                      <p className="text-gray-600 mb-1">Transaction</p>
                      <a 
                        href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-sm text-indigo-600 hover:underline"
                      >
                        View on Explorer
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/dashboard" className="flex-1">
                  <button className="neo-btn neo-btn-primary w-full py-4">
                    View Dashboard
                    <ArrowRight className="inline ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/agent" className="flex-1">
                  <button className="neo-btn neo-btn-outline w-full py-4">
                    Monitor Agents
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4">Stake Your Identity</h1>
            <p className="text-xl text-gray-600">Set your limits and start earning passive income</p>
          </div>

          {/* SBT Status */}
          <div className="neo-card p-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="icon-box bg-green-100">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-black text-lg">SBT Status: Active</h3>
                <p className="text-sm text-gray-600">Ready to stake</p>
              </div>
            </div>
          </div>

          {/* Staking Configuration */}
          <div className="neo-card p-8 mb-8">
            <h2 className="text-2xl font-black mb-6">Configure Staking</h2>

            <div className="space-y-8">
              {/* Spending Limit */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="flex items-center gap-2 text-sm font-bold">
                    <Coins className="h-5 w-5 text-indigo-600" />
                    Spending Limit
                  </Label>
                  <span className="text-3xl font-black">${spendingLimit.toLocaleString()}</span>
                </div>
                <Slider
                  value={[spendingLimit]}
                  onValueChange={(value) => setSpendingLimit(value[0])}
                  min={STELLAR_CONFIG.spendingLimits.min}
                  max={STELLAR_CONFIG.spendingLimits.max}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>${STELLAR_CONFIG.spendingLimits.min}</span>
                  <span>${STELLAR_CONFIG.spendingLimits.max}</span>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Maximum amount agents can spend using your compliance
                </p>
              </div>

              {/* Time Bound */}
              <div>
                <Label className="flex items-center gap-2 text-sm font-bold mb-3">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Time Bound
                </Label>
                <Select value={timeBound} onValueChange={setTimeBound}>
                  <SelectTrigger className="neo-input w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STELLAR_CONFIG.timeBounds.map((tb) => (
                      <SelectItem key={tb.value} value={tb.value.toString()}>
                        {tb.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-600 mt-3">
                  How long your identity will remain staked
                </p>
              </div>

              {/* Estimated Earnings */}
              <div className="neo-card p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4" />
                      Estimated Annual Earnings
                    </p>
                    <p className="text-4xl font-black text-green-600">
                      ${estimatedEarnings.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Based on {STELLAR_CONFIG.mockApy}% APY
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">APY</p>
                    <p className="text-3xl font-black">{STELLAR_CONFIG.mockApy}%</p>
                  </div>
                </div>
              </div>

              {/* Stake Button */}
              <button 
                onClick={handleStake} 
                disabled={isStaking}
                className="neo-btn neo-btn-success w-full py-4 text-lg"
              >
                {isStaking ? 'Staking...' : 'Stake Identity'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                You can unstake and withdraw earnings at any time
              </p>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="neo-card p-6">
              <h4 className="font-bold mb-2">Full Control</h4>
              <p className="text-sm text-gray-600">
                Kill Switch instantly revokes all agent access
              </p>
            </div>
            <div className="neo-card p-6">
              <h4 className="font-bold mb-2">Automatic Earnings</h4>
              <p className="text-sm text-gray-600">
                Receive 88% of query fees automatically
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
