'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WalletContextType {
  publicKey: string | null;
  isConnected: boolean;
  isLoading: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  signTransaction: (xdr: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // Check if Freighter is installed
      if (typeof window !== 'undefined' && (window as any).freighter) {
        const connected = await (window as any).freighter.isConnected();
        if (connected) {
          const key = await (window as any).freighter.getPublicKey();
          setPublicKey(key);
          setIsConnected(true);
        }
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const connect = async () => {
    try {
      setIsLoading(true);
      
      if (typeof window === 'undefined' || !(window as any).freighter) {
        throw new Error('Freighter wallet not installed');
      }
      
      const key = await (window as any).freighter.getPublicKey();
      setPublicKey(key);
      setIsConnected(true);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    setIsConnected(false);
  };

  const handleSignTransaction = async (xdr: string): Promise<string> => {
    try {
      if (typeof window === 'undefined' || !(window as any).freighter) {
        throw new Error('Freighter wallet not installed');
      }
      
      const result = await (window as any).freighter.signTransaction(xdr, {
        networkPassphrase: 'Test SDF Network ; September 2015',
      });
      
      return result.signedTxXdr || result;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        publicKey,
        isConnected,
        isLoading,
        connect,
        disconnect,
        signTransaction: handleSignTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
