'use client';

import { AlertTriangle, Terminal, Zap } from 'lucide-react';
import { STELLAR_CONFIG } from '@/lib/stellar-config';

export function ContractNotice() {
  const hasContracts = 
    STELLAR_CONFIG.contracts.sbt && 
    STELLAR_CONFIG.contracts.identityPool && 
    STELLAR_CONFIG.contracts.dharmaPool;

  if (hasContracts) {
    return null;
  }

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 max-w-4xl w-full mx-6">
      <div className="neo-card-lg p-8 bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-600">
        <div className="flex items-start gap-6">
          <div className="icon-box bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex-shrink-0">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="neo-heading-md text-yellow-800">Contracts Not Deployed</h3>
              <div className="neo-badge neo-badge-warning">
                <Zap className="h-4 w-4" />
                Action Required
              </div>
            </div>
            
            <p className="text-lg font-semibold text-yellow-700 mb-6">
              Deploy smart contracts to Stellar testnet to unlock the full MVP experience with real blockchain transactions.
            </p>
            
            <div className="neo-card p-6 bg-black text-green-400 font-mono text-sm mb-6 overflow-x-auto">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="h-4 w-4" />
                <span className="font-bold text-green-300">Deployment Commands</span>
              </div>
              <div className="space-y-2">
                <div className="text-green-300"># Windows (PowerShell):</div>
                <div className="text-white bg-gray-800 px-3 py-1 rounded">.\scripts\deploy-contracts.ps1</div>
                <div className="text-green-300 mt-3"># Mac/Linux (Bash):</div>
                <div className="text-white bg-gray-800 px-3 py-1 rounded">./scripts/deploy-contracts.sh</div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="neo-card p-4 bg-white">
                <div className="font-bold text-sm text-gray-800 mb-1">✅ What You'll Get</div>
                <div className="text-xs text-gray-600">Real smart contracts on Stellar testnet</div>
              </div>
              <div className="neo-card p-4 bg-white">
                <div className="font-bold text-sm text-gray-800 mb-1">🔗 Blockchain Integration</div>
                <div className="text-xs text-gray-600">Actual transactions with Freighter wallet</div>
              </div>
              <div className="neo-card p-4 bg-white">
                <div className="font-bold text-sm text-gray-800 mb-1">🎯 MVP Ready</div>
                <div className="text-xs text-gray-600">Verifiable on Stellar Explorer</div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => window.open('https://github.com/stellar/soroban-tools/releases', '_blank')}
                className="neo-btn neo-btn-primary text-sm"
              >
                <Zap className="h-4 w-4 mr-2" />
                Install Soroban CLI
              </button>
              <button 
                onClick={() => window.open('/QUICK_START.md', '_blank')}
                className="neo-btn neo-btn-outline text-sm"
              >
                View Setup Guide
              </button>
            </div>
            
            <p className="text-xs text-yellow-600 mt-4 font-medium">
              💡 This will create .env.local with contract addresses and enable real blockchain functionality
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
