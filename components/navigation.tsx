'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WalletConnect } from './wallet-connect';
import { Home, UserPlus, Coins, LayoutDashboard, Bot } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/onboard', label: 'Onboard', icon: UserPlus },
  { href: '/stake', label: 'Stake', icon: Coins },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/agent', label: 'Agent', icon: Bot },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b-[3px] border-black sticky top-0 z-50 shadow-[0_4px_0px_0px_#000000]">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-4 group">
            <div className="flex items-center gap-3">
              <div>
                <span className="neo-heading text-2xl text-gray-900">Dharma Protocol</span>
                <div className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Identity as Liquidity
                </div>
              </div>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-6 py-3 font-bold text-sm transition-all border-[3px] uppercase tracking-wide
                    ${isActive 
                      ? 'bg-gray-900 text-white border-black shadow-[4px_4px_0px_0px_#000000]' 
                      : 'bg-white text-gray-700 border-transparent hover:border-black hover:shadow-[4px_4px_0px_0px_#000000] hover:transform hover:-translate-x-1 hover:-translate-y-1'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="neo-btn neo-btn-outline px-4 py-2 text-sm">
              Menu
            </button>
          </div>
          
          <WalletConnect />
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="grid grid-cols-2 gap-2">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 font-bold text-xs transition-all border-[2px] uppercase tracking-wide
                    ${isActive 
                      ? 'bg-gray-900 text-white border-black shadow-[2px_2px_0px_0px_#000000]' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-black hover:shadow-[2px_2px_0px_0px_#000000]'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
