import { Github, Twitter, Diamond as Discord, Shield, Zap, Coins, Globe, Code2, Lock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DharmaLanding() {
  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 bg-background text-foreground">
      <div
        className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0">
        <div className="text-xl font-black tracking-tighter uppercase italic text-primary">Dharma</div>
        <div className="hidden md:flex gap-10 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#compliance" className="hover:text-primary transition-colors">
            Compliance
          </a>
          <a href="#economics" className="hover:text-primary transition-colors">
            Economics
          </a>
          <a href="#developers" className="hover:text-primary transition-colors">
            Developers
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest hidden sm:flex">
            Log In
          </Button>
          <Button className="rounded-none px-6 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-primary/20">
            Request Access
          </Button>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="px-6 md:px-12 pt-24 pb-32 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-primary/20 bg-primary/5 text-[10px] uppercase tracking-[0.2em] font-bold text-primary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Soroban Protocol v1.4
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]">
              Liquid <br />
              <span className="text-primary italic">Identity</span>.
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg mb-12 leading-relaxed font-medium">
              Transforming institutional compliance into a tradeable RWA. Complete KYC once, unlock global liquidity
              forever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="rounded-none px-10 h-14 text-[10px] uppercase tracking-widest font-black">
                Start Integration
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-none px-10 h-14 text-[10px] uppercase tracking-widest font-black group bg-transparent"
              >
                Documentation <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="relative">
            {/* Visual representation of "Liquid Identity" */}
            <div className="aspect-square bg-primary/5 border border-primary/10 rounded-2xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="relative z-10 w-4/5 aspect-[1.6/1] bg-white shadow-2xl rounded-xl border border-border p-8 transform -rotate-6">
                <div className="h-6 w-12 bg-primary/10 rounded mb-6" />
                <div className="space-y-3">
                  <div className="h-2 w-3/4 bg-muted rounded" />
                  <div className="h-2 w-1/2 bg-muted/50 rounded" />
                </div>
                <div className="absolute bottom-8 right-8 text-primary font-mono text-xs font-bold tracking-widest">
                  VERIFIED-ID // 0X1...F4
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 aspect-[1.6/1] bg-primary/80 backdrop-blur shadow-2xl rounded-xl border border-primary/20 p-8 transform rotate-6 flex flex-col justify-between">
                <Shield className="h-10 w-10 text-white" />
                <div className="text-white font-mono text-xs font-bold tracking-[0.2em] uppercase">ZK-PROOF ACTIVE</div>
              </div>
            </div>
          </div>
        </section>

        <section id="compliance" className="bg-foreground text-background py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-end mb-24">
              <div className="lg:col-span-2">
                <div className="text-[10px] uppercase tracking-[0.4em] text-primary font-black mb-6">Network reach</div>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]">
                  142 Jurisdictions. <br />
                  One Standard.
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Dharma's smart-KYC engine adapts in real-time to evolving FATF guidelines across every major global
                market.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: "European Union", status: "MiCA Ready" },
                { label: "Singapore", status: "MAS Compliant" },
                { label: "United Arab Emirates", status: "VARA Enabled" },
                { label: "United States", status: "FinCEN Track" },
              ].map((item, i) => (
                <div key={i} className="border-l border-border/20 pl-6 py-4">
                  <div className="text-xs font-bold tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="text-[10px] font-mono text-primary uppercase">{item.status}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Infrastructure Stack</h2>
            <div className="h-1 w-12 bg-primary mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-12 bg-white border border-border flex flex-col justify-between min-h-[400px]">
              <div>
                <Lock className="h-12 w-12 text-primary mb-8" />
                <h3 className="text-4xl font-black tracking-tighter mb-4">Programmable Privacy.</h3>
                <p className="text-muted-foreground leading-relaxed max-w-md">
                  Leverage Soroban's smart contracts to define precisely who can access your compliance data, for how
                  long, and for what purpose.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="px-3 py-1 bg-muted rounded text-[10px] font-bold uppercase tracking-widest">
                  ZK-SNARK
                </div>
                <div className="px-3 py-1 bg-muted rounded text-[10px] font-bold uppercase tracking-widest">
                  On-Chain PII
                </div>
              </div>
            </div>
            <div className="p-12 bg-primary text-white flex flex-col justify-between">
              <Zap className="h-12 w-12 mb-8" />
              <div>
                <h3 className="text-3xl font-black tracking-tighter mb-4">Instant Onboarding.</h3>
                <p className="text-primary-foreground/80 text-sm leading-relaxed">
                  Reduce KYC drop-off rates by 94% with one-click institutional verification.
                </p>
              </div>
            </div>
            <div className="p-12 bg-white border border-border flex flex-col justify-between">
              <Code2 className="h-12 w-12 text-primary mb-8" />
              <div>
                <h4 className="text-xl font-black tracking-tighter mb-2 uppercase">Developer API</h4>
                <p className="text-muted-foreground text-sm">
                  Integrate global compliance with 3 lines of code. Support for TS, Rust, and Go.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 p-12 bg-white border border-border flex flex-col lg:flex-row gap-12 items-center">
              <div className="flex-1">
                <Globe className="h-12 w-12 text-primary mb-8" />
                <h3 className="text-3xl font-black tracking-tighter mb-4">Global Settlement.</h3>
                <p className="text-muted-foreground text-sm">
                  Identity tokens can be used as collateral for instant cross-border settlement on the Stellar network.
                </p>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="h-12 bg-muted/50 rounded flex items-center justify-center text-[10px] font-bold uppercase">
                  USD-C
                </div>
                <div className="h-12 bg-muted/50 rounded flex items-center justify-center text-[10px] font-bold uppercase">
                  EUR-L
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Existing Sections adapted for light theme */}
        <section id="economics" className="py-32 px-6 md:px-12 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Protocol Economics</h2>
              <div className="h-1 w-12 bg-primary mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {[
                {
                  icon: <Shield />,
                  step: "1. Verify",
                  desc: "Connect your institutional identity once via our trusted validator network.",
                },
                {
                  icon: <Zap />,
                  step: "2. Liquidate",
                  desc: "Mint your non-transferable Identity NFT (iNFT) and stake it in liquidity pools.",
                },
                {
                  icon: <Coins />,
                  step: "3. Yield",
                  desc: "Earn a percentage of all transaction fees from protocols using your verified status.",
                },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-6 group">
                  <div className="w-24 h-24 flex items-center justify-center border-2 border-border group-hover:border-primary transition-all duration-300 bg-white shadow-xl group-hover:shadow-primary/10 rounded-2xl">
                    <div className="text-primary scale-125 transition-transform group-hover:scale-110">{item.icon}</div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-black uppercase tracking-tighter">{item.step}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border max-w-6xl mx-auto border border-border my-32 rounded-2xl overflow-hidden shadow-2xl shadow-primary/5">
          {[
            { value: "2.8s", label: "Verification Latency", sub: "Global Average" },
            { value: "$0.0001", label: "Cost Per Check", sub: "Marginal Cost" },
            { value: "100%", label: "PII Sovereignty", sub: "User Owned Data" },
          ].map((m, i) => (
            <div key={i} className="bg-white p-12 text-center group">
              <div className="font-mono text-6xl font-black text-primary mb-4 transition-transform group-hover:scale-105">
                {m.value}
              </div>
              <div className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground">{m.label}</div>
              <div className="text-[10px] text-muted-foreground mt-2 italic font-medium">{m.sub}</div>
            </div>
          ))}
        </section>

        {/* Footer */}
        <footer className="bg-foreground text-background py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
              <div className="max-w-xs">
                <div className="text-2xl font-black tracking-tighter uppercase italic text-primary mb-6">Dharma</div>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium mb-8">
                  The institutional liquidity layer for decentralized identity. Built for the future of regulated
                  finance.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 border border-border/20 hover:border-primary transition-colors rounded-lg">
                    <Twitter className="h-4 w-4" />
                  </a>
                  <a href="#" className="p-3 border border-border/20 hover:border-primary transition-colors rounded-lg">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="#" className="p-3 border border-border/20 hover:border-primary transition-colors rounded-lg">
                    <Discord className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-24">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Protocol</div>
                  <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <li>
                      <a href="#" className="hover:text-background">
                        Whitepaper
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-background">
                        Staking
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-background">
                        Validators
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">Developers</div>
                  <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <li>
                      <a href="#" className="hover:text-background">
                        Docs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-background">
                        SDKs
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-background">
                        API Status
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-border/10 text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em]">
              <div>© 2026 Dharma Protocol Foundation</div>
              <div className="flex gap-8">
                <a href="#">Privacy</a>
                <a href="#">Terms</a>
                <a href="#">Security</a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
