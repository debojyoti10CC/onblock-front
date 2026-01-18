'use client';

import { useState, useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Play, Square, Activity, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const mockLogs = [
  '[12:34:56] BOT-X initialized',
  '[12:34:57] Scanning Stellar DEX for opportunities...',
  '[12:35:02] Found arbitrage opportunity: XLM/USDC',
  '[12:35:03] Requesting compliance from Dharma Pool...',
  '[12:35:04] Compliance Rail issued: rail_abc123',
  '[12:35:05] Executing swap: 100 USDC → XLM',
  '[12:35:07] Transaction successful: TX_xyz789',
  '[12:35:08] Profit: $2.50 | Fee paid: $0.88',
  '[12:35:10] Scanning for next opportunity...',
];

const mockRails = [
  {
    id: 'rail_abc123',
    spendingLimit: 500,
    usedAmount: 100,
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000),
    isActive: true,
  },
];

const mockTransactions = [
  {
    id: '1',
    type: 'Swap',
    from: '100 USDC',
    to: '105 XLM',
    profit: 2.50,
    fee: 0.88,
    time: '2 min ago',
    status: 'success',
  },
  {
    id: '2',
    type: 'Swap',
    from: '50 USDC',
    to: '52 XLM',
    profit: 1.20,
    fee: 0.88,
    time: '15 min ago',
    status: 'success',
  },
];

export default function AgentPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [stats, setStats] = useState({
    totalSwaps: 2,
    totalProfit: 3.70,
    totalFees: 1.76,
    successRate: 100,
  });

  useEffect(() => {
    if (isRunning) {
      // Simulate log streaming
      const interval = setInterval(() => {
        const newLog = `[${new Date().toLocaleTimeString()}] Scanning market...`;
        setLogs(prev => [...prev, newLog].slice(-20)); // Keep last 20 logs
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
    setLogs(mockLogs);
    toast.success('BOT-X started successfully');
  };

  const handleStop = () => {
    setIsRunning(false);
    toast.info('BOT-X stopped');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container py-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">BOT-X Agent</h1>
                <p className="text-muted-foreground">Autonomous trading agent with rented compliance</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant={isRunning ? "default" : "secondary"} className="text-sm px-3 py-1">
                {isRunning ? (
                  <>
                    <Activity className="mr-1 h-3 w-3 animate-pulse" />
                    Running
                  </>
                ) : (
                  <>
                    <Square className="mr-1 h-3 w-3" />
                    Stopped
                  </>
                )}
              </Badge>

              {isRunning ? (
                <Button onClick={handleStop} variant="outline">
                  <Square className="mr-2 h-4 w-4" />
                  Stop Agent
                </Button>
              ) : (
                <Button onClick={handleStart}>
                  <Play className="mr-2 h-4 w-4" />
                  Start Agent
                </Button>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Swaps</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSwaps}</div>
                <p className="text-xs text-muted-foreground">Executed successfully</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${stats.totalProfit}</div>
                <p className="text-xs text-muted-foreground">From arbitrage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fees Paid</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalFees}</div>
                <p className="text-xs text-muted-foreground">To stakers (88%)</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.successRate}%</div>
                <p className="text-xs text-muted-foreground">All transactions</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Live Logs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Live Agent Logs
                </CardTitle>
                <CardDescription>
                  Real-time activity from BOT-X
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-1 font-mono text-xs">
                    {logs.length === 0 ? (
                      <p className="text-muted-foreground">Agent not running. Click "Start Agent" to begin.</p>
                    ) : (
                      logs.map((log, i) => (
                        <div key={i} className="text-muted-foreground">
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Active Rails */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  Active Compliance Rails
                </CardTitle>
                <CardDescription>
                  Rails currently in use by BOT-X
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mockRails.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No active rails</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {mockRails.map((rail) => (
                      <div key={rail.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium font-mono">{rail.id}</p>
                          <Badge variant="default" className="text-xs">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Active
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Spending Limit:</span>
                            <span className="font-semibold">${rail.spendingLimit}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Used:</span>
                            <span className="font-semibold">${rail.usedAmount}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Remaining:</span>
                            <span className="font-semibold text-green-600">
                              ${rail.spendingLimit - rail.usedAmount}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span>Expires:</span>
                            <span className="font-semibold">{rail.expiresAt.toLocaleTimeString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest swaps executed by BOT-X</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTransactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{tx.type}: {tx.from} → {tx.to}</p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-semibold text-green-600">
                        Profit: +${tx.profit}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Fee: ${tx.fee}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 border-blue-600/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Bot className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-semibold">How BOT-X Works</h3>
                  <p className="text-sm text-muted-foreground">
                    BOT-X scans the Stellar DEX for arbitrage opportunities. When it finds a profitable trade, 
                    it requests a Compliance Rail from the Dharma Pool, pays a query fee (88% goes to stakers), 
                    and executes the swap using the rented compliance capacity. The agent never touches your 
                    private keys or personal information.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
