'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { DollarSign, TrendingUp, Activity, AlertTriangle, CheckCircle2, Clock, Zap } from 'lucide-react';
import { useWallet } from '@/lib/wallet-context';
import { contractClient } from '@/lib/contract-client';

export default function DashboardPage() {
  const { publicKey, isConnected, signTransaction } = useWallet();
  const [stakeData, setStakeData] = useState<any>(null);
  const [activeRails, setActiveRails] = useState<any[]>([]);
  const [isKillSwitchActive, setIsKillSwitchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isConnected && publicKey) {
      loadDashboardData();
    }
  }, [isConnected, publicKey]);

  const loadDashboardData = async () => {
    if (!publicKey) return;

    try {
      setIsLoading(true);
      
      // Load stake data
      const stake = await contractClient.getStake(publicKey);
      setStakeData(stake);

      // Load active rails
      const rails = await contractClient.getUserRails(publicKey);
      setActiveRails(rails || []);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKillSwitch = async () => {
    if (!publicKey) return;

    try {
      setIsKillSwitchActive(true);
      
      const xdr = await contractClient.revokeAllRails(publicKey);
      const signedXDR = await signTransaction(xdr);
      await contractClient.submitTransaction(signedXDR);

      toast.success(`Kill Switch activated! All rails revoked.`);
      await loadDashboardData();
    } catch (error: any) {
      console.error('Error activating kill switch:', error);
      toast.error(error.message || 'Failed to activate kill switch');
    } finally {
      setIsKillSwitchActive(false);
    }
  };

  const activeRailsCount = activeRails.filter(r => r.isActive).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-black mb-2">Dashboard</h1>
            <p className="text-gray-600">Monitor your staked identity and earnings</p>
          </div>

          {/* Kill Switch */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button 
                className="neo-btn neo-btn-danger px-8 py-4 text-lg"
                disabled={activeRailsCount === 0}
              >
                <AlertTriangle className="inline mr-2 h-6 w-6" />
                KILL SWITCH
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="neo-card max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2 text-red-600 text-2xl font-black">
                  <AlertTriangle className="h-7 w-7" />
                  Activate Kill Switch?
                </AlertDialogTitle>
                <AlertDialogDescription className="space-y-3 text-base">
                  <p>
                    This will immediately revoke <span className="font-bold">ALL {activeRailsCount} active rails</span>.
                  </p>
                  <p className="font-semibold">
                    AI agents will lose access instantly.
                  </p>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="neo-btn neo-btn-outline">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleKillSwitch}
                  disabled={isKillSwitchActive}
                  className="neo-btn neo-btn-danger"
                >
                  {isKillSwitchActive ? 'Revoking...' : 'Activate'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4 mb-12">
          <div className="stats-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-600">Staked Amount</p>
              <DollarSign className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-black">
              {isLoading ? '...' : stakeData ? `$${(stakeData.spending_limit / 10000000).toLocaleString()}` : '$0'}
            </p>
            <p className="text-xs text-gray-500 mt-1">USDC</p>
          </div>

          <div className="stats-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-600">Accumulated Fees</p>
              <TrendingUp className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-black text-green-600">
              {isLoading ? '...' : stakeData ? `$${(stakeData.accumulated_fees / 10000000).toFixed(2)}` : '$0'}
            </p>
            <p className="text-xs text-gray-500 mt-1">+15% APY</p>
          </div>

          <div className="stats-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-600">Active Rails</p>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-black">{activeRailsCount}</p>
            <p className="text-xs text-gray-500 mt-1">Agents using capacity</p>
          </div>

          <div className="stats-card">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-600">Status</p>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-3xl font-black">{stakeData ? 'Active' : 'Inactive'}</p>
            <p className="text-xs text-gray-500 mt-1">
              {isConnected ? 'Connected' : 'Not connected'}
            </p>
          </div>
        </div>

        {/* Active Rails */}
        <div className="neo-card p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="icon-box bg-yellow-100">
              <Zap className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black">Active Compliance Rails</h2>
              <p className="text-sm text-gray-600">AI agents currently using your compliance</p>
            </div>
          </div>

          {activeRails.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Activity className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p className="font-semibold">No active rails</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeRails.map((rail) => (
                <div key={rail.id} className="neo-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold">
                        Agent: {rail.agent.slice(0, 8)}...{rail.agent.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-600">
                        Expires: {new Date(rail.expires_at * 1000).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {rail.isActive ? (
                        <span className="neo-badge neo-badge-success">
                          <CheckCircle2 className="inline h-3 w-3 mr-1" />
                          Active
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500 font-semibold">Revoked</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Limit: ${(rail.spending_limit / 10000000).toLocaleString()}
                      </span>
                      <span className="font-bold">Rail ID: {rail.rail_id}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Transaction History */}
        <div className="neo-card p-8">
          <h2 className="text-2xl font-black mb-6">Recent Activity</h2>
          {isConnected && publicKey ? (
            <div className="text-center py-8 text-gray-500">
              <p className="font-semibold">Transaction history coming soon</p>
              <p className="text-sm mt-2">View your transactions on Stellar Expert</p>
              <a 
                href={`https://stellar.expert/explorer/testnet/account/${publicKey}`}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-outline mt-4 inline-block"
              >
                View on Explorer
              </a>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="font-semibold">Connect wallet to view activity</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
