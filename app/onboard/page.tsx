'use client';

import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CheckCircle2, Loader2, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useWallet } from '@/lib/wallet-context';
import { contractClient } from '@/lib/contract-client';

export default function OnboardPage() {
  const { publicKey, isConnected, signTransaction } = useWallet();
  const [step, setStep] = useState<'kyc' | 'issuing' | 'complete'>('kyc');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sbtId, setSbtId] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleMockKYC = async () => {
    if (!name || !email) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!isConnected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setStep('issuing');

      // Generate KYC hash (in production, this would come from real KYC provider)
      const kycData = `${name}:${email}:${Date.now()}`;
      const encoder = new TextEncoder();
      const data = encoder.encode(kycData);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const kycHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

      // Issue SBT on-chain
      const xdr = await contractClient.issueSBT(publicKey, kycHash);
      const signedXDR = await signTransaction(xdr);
      const result = await contractClient.submitTransaction(signedXDR);

      setSbtId(kycHash);
      setTxHash(result.hash);
      setStep('complete');
      toast.success('SBT issued successfully on Stellar!');
    } catch (error: any) {
      console.error('Error issuing SBT:', error);
      toast.error(error.message || 'Failed to issue SBT');
      setStep('kyc');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-black mb-4">Onboard to Dharma</h1>
            <p className="text-xl text-gray-600">Complete KYC to receive your Soulbound Token</p>
          </div>

          {step === 'kyc' && (
            <div className="neo-card p-8 fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="icon-box bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">Mock KYC Verification</h2>
                  <p className="text-sm text-gray-600">Demo purposes only</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-sm font-bold mb-2 block">Full Name</Label>
                  <input
                    id="name"
                    className="neo-input w-full"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-bold mb-2 block">Email Address</Label>
                  <input
                    id="email"
                    type="email"
                    className="neo-input w-full"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
                  <p className="text-sm font-semibold mb-2">Connected Wallet</p>
                  <p className="text-xs text-gray-600 font-mono">
                    {isConnected && publicKey 
                      ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}`
                      : 'Not connected'}
                  </p>
                </div>

                <button 
                  onClick={handleMockKYC} 
                  className="neo-btn neo-btn-success w-full py-4 text-lg"
                >
                  Complete KYC & Issue SBT
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By continuing, you agree to our Terms of Service
                </p>
              </div>
            </div>
          )}

          {step === 'issuing' && (
            <div className="neo-card p-12 text-center fade-in">
              <Loader2 className="h-16 w-16 animate-spin text-indigo-600 mx-auto mb-6" />
              <h3 className="text-2xl font-black mb-3">Issuing Your SBT...</h3>
              <p className="text-gray-600">
                Verifying your identity and creating your Soulbound Token
              </p>
            </div>
          )}

          {step === 'complete' && (
            <div className="neo-card p-8 fade-in">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 border-2 border-black mb-6 shadow-[4px_4px_0px_0px_#0a0a0a]">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-3xl font-black mb-3">SBT Issued Successfully!</h3>
                <p className="text-gray-600">
                  Your Soulbound Token is now active
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 mb-8">
                <p className="text-sm font-bold mb-4">SBT Details:</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner:</span>
                    <span className="font-mono font-semibold">
                      {publicKey ? `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">KYC Hash:</span>
                    <span className="font-mono font-semibold">{sbtId.slice(0, 12)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="neo-badge neo-badge-success">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transferable:</span>
                    <span className="font-semibold text-red-600">No (Soulbound)</span>
                  </div>
                  {txHash && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction:</span>
                      <a 
                        href={`https://stellar.expert/explorer/testnet/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono font-semibold text-indigo-600 hover:underline"
                      >
                        View on Explorer
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/stake" className="flex-1">
                  <button className="neo-btn neo-btn-primary w-full py-4">
                    Stake Your Identity
                    <ArrowRight className="inline ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/dashboard" className="flex-1">
                  <button className="neo-btn neo-btn-outline w-full py-4">
                    View Dashboard
                  </button>
                </Link>
              </div>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="neo-card p-4">
              <h4 className="font-bold text-sm mb-2">Non-Transferable</h4>
              <p className="text-xs text-gray-600">
                Bound to your wallet, cannot be sold
              </p>
            </div>
            <div className="neo-card p-4">
              <h4 className="font-bold text-sm mb-2">Privacy Protected</h4>
              <p className="text-xs text-gray-600">
                Only hash stored on-chain
              </p>
            </div>
            <div className="neo-card p-4">
              <h4 className="font-bold text-sm mb-2">Revocable</h4>
              <p className="text-xs text-gray-600">
                You can revoke anytime
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
