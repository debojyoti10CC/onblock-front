import { Navigation } from '@/components/navigation';
import Link from 'next/link';
import { ArrowRight, Shield, DollarSign, Zap, TrendingUp, Users, Globe } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navigation />
      
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="max-w-6xl mx-auto text-center mb-32 fade-in">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-[3px] border-black mb-8 shadow-[4px_4px_0px_0px_#000000]">
            <div className="w-3 h-3 bg-green-500 rounded-full pulse"></div>
            <span className="font-black text-sm uppercase tracking-wider">Live on Stellar Testnet</span>
          </div>
          
          <h1 className="neo-heading-xl mb-8 leading-none text-gray-900">
            Stake Your Identity.
            <br />
            <span className="text-gray-700">Earn Passive Income.</span>
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto font-semibold leading-relaxed">
            Rent your verified KYC compliance to AI agents. 
            <span className="text-gray-900 font-black"> Earn 15% APY.</span> 
            <span className="text-gray-800 font-black"> Revoke anytime.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/onboard">
              <button className="neo-btn neo-btn-success text-xl px-12 py-6 w-full sm:w-auto">
                <DollarSign className="h-6 w-6 mr-3" />
                Start Earning Now
                <ArrowRight className="inline ml-3 h-6 w-6" />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="neo-btn neo-btn-outline text-xl px-12 py-6 w-full sm:w-auto">
                <TrendingUp className="h-6 w-6 mr-3" />
                View Live Demo
              </button>
            </Link>
          </div>

          {/* Live Stats Banner */}
          <div className="neo-card-lg p-8 bg-gray-900 text-white max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-black mb-2">15%</div>
                <div className="font-bold uppercase tracking-wide">Annual Yield</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">88%</div>
                <div className="font-bold uppercase tracking-wide">Fee Share to You</div>
              </div>
              <div>
                <div className="text-5xl font-black mb-2">&lt;1s</div>
                <div className="font-bold uppercase tracking-wide">Kill Switch Speed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="text-center mb-16">
            <h2 className="neo-heading-lg mb-6 text-gray-900">The Future of Agentic Commerce</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium">
              AI agents need compliance to trade. You have verified identity. 
              <span className="font-black text-gray-900"> Rent it. Earn from it. Control it.</span>
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="neo-card-lg p-10 hover:shadow-[12px_12px_0px_0px_#000000] transition-all duration-300">
              <div className="icon-box bg-gray-800 text-white mb-8">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="neo-heading-sm mb-4 text-gray-900">Privacy-First Design</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Zero-knowledge proofs protect your personal data. AI agents get compliance access without seeing your information.
              </p>
              <div className="neo-badge neo-badge-info">
                <span>ZK-Proofs Ready</span>
              </div>
            </div>

            <div className="neo-card-lg p-10 hover:shadow-[12px_12px_0px_0px_#000000] transition-all duration-300">
              <div className="icon-box bg-gray-800 text-white mb-8">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="neo-heading-sm mb-4 text-gray-900">Automatic Earnings</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                Earn $0.88 per transaction automatically. 88% of all query fees flow directly to your wallet.
              </p>
              <div className="neo-badge neo-badge-success">
                <span>$0.88 Per Query</span>
              </div>
            </div>

            <div className="neo-card-lg p-10 hover:shadow-[12px_12px_0px_0px_#000000] transition-all duration-300">
              <div className="icon-box bg-gray-800 text-white mb-8">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="neo-heading-sm mb-4 text-gray-900">Instant Control</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                One-click Kill Switch revokes all agent access instantly. You maintain complete control over your identity.
              </p>
              <div className="neo-badge neo-badge-warning">
                <span>Instant Revocation</span>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-20">
            <h2 className="neo-heading-lg mb-6 text-gray-900">How It Works</h2>
            <p className="text-xl text-gray-600 font-medium">
              Four simple steps to start earning from your identity
            </p>
          </div>
          
          <div className="space-y-12">
            {[
              { 
                num: '01', 
                title: 'Verify Your Identity', 
                desc: 'Complete KYC verification and receive your non-transferable Soulbound Token on Stellar blockchain',
                icon: Shield,
                color: 'bg-gray-800'
              },
              { 
                num: '02', 
                title: 'Stake & Set Limits', 
                desc: 'Lock your verified identity with custom spending limits and time bounds for maximum security',
                icon: Users,
                color: 'bg-gray-800'
              },
              { 
                num: '03', 
                title: 'AI Agents Rent Access', 
                desc: 'Trading bots and AI agents pay query fees to use your compliance capacity for transactions',
                icon: Globe,
                color: 'bg-gray-800'
              },
              { 
                num: '04', 
                title: 'Earn Passive Income', 
                desc: 'Receive 88% of all query fees automatically distributed to your wallet every transaction',
                icon: TrendingUp,
                color: 'bg-gray-800'
              },
            ].map((step, index) => (
              <div key={step.num} className="flex gap-8 items-start group">
                <div className="flex-shrink-0">
                  <div className={`w-20 h-20 ${step.color} border-[3px] border-black flex items-center justify-center text-white font-black text-2xl shadow-[6px_6px_0px_0px_#000000] group-hover:shadow-[8px_8px_0px_0px_#000000] transition-all duration-300`}>
                    {step.num}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="neo-heading-sm text-gray-800">{step.title}</h3>
                    <div className="icon-box bg-gray-100">
                      <step.icon className="h-6 w-6 text-gray-600" />
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="neo-card-lg p-16 text-center max-w-4xl mx-auto bg-gray-50">
          <div className="mb-8">
            <h2 className="neo-heading-lg mb-6 text-gray-800">Ready to Transform Your Identity into Income?</h2>
            <p className="text-xl text-gray-700 mb-8 font-medium max-w-2xl mx-auto">
              Join the future of decentralized compliance. Start earning from your verified identity today.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link href="/onboard">
              <button className="neo-btn neo-btn-primary text-xl px-16 py-6 w-full sm:w-auto">
                Get Started Now
                <ArrowRight className="inline ml-3 h-6 w-6" />
              </button>
            </Link>
            <Link href="/stake">
              <button className="neo-btn neo-btn-success text-xl px-16 py-6 w-full sm:w-auto">
                <DollarSign className="h-6 w-6 mr-3" />
                Start Earning
              </button>
            </Link>
          </div>

          <div className="text-sm text-gray-600 font-medium">
            Secured by Stellar blockchain • Live on testnet • Deploy in minutes
          </div>
        </div>
      </main>
    </div>
  );
}
