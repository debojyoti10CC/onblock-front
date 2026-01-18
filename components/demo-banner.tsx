'use client';

import { Info, X } from 'lucide-react';
import { useState } from 'react';

export function DemoBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-yellow-400 border-b-2 border-black py-3 px-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Info className="h-5 w-5" />
          <p className="font-bold text-sm">
            <span className="font-black">DEMO MODE:</span> This is a functional mockup. Smart contracts are ready to deploy to Stellar testnet.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="hover:bg-black/10 p-1 rounded"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
