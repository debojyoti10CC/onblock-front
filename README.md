# Dharma Protocol v2.0 - Identity as Liquidity

> **Rent compliance capacity from verified humans for autonomous AI agent transactions on Stellar/Soroban**

![Dharma Protocol](https://img.shields.io/badge/Stellar-Soroban-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-MVP-yellow)

## 🌟 Overview

Dharma Protocol v2.0 enables a revolutionary "Identity as Liquidity" marketplace where:

- **Humans** stake their verified KYC credentials to earn passive income (15% APY)
- **AI Agents** rent compliance capacity to execute regulated transactions autonomously
- **Privacy** is preserved through zero-knowledge proofs - no PII ever leaves the staker
- **Control** is maintained via instant Kill Switch - revoke all access in < 1 second

## 🎯 Problem & Solution

### Problem
AI agents need to execute regulated transactions (swaps, payments) but can't complete KYC or hold identity documents.

### Solution
Dharma Protocol creates a trust layer where verified humans "stake" their identity, allowing agents to temporarily rent compliance capacity through time-bound, spending-limited authorization rails.

## 🏗️ Architecture

```
┌─────────────────┐
│  Human Staker   │
│  (Verified KYC) │
└────────┬────────┘
         │ Stakes SBT
         ↓
┌─────────────────────┐
│  Identity Pool      │
│  (Soroban Contract) │
└────────┬────────────┘
         │ Provides Capacity
         ↓
┌─────────────────────┐      ┌──────────────┐
│   Dharma Pool       │←─────│  AI Agent    │
│  (Compliance Rails) │      │   (BOT-X)    │
└────────┬────────────┘      └──────┬───────┘
         │                          │
         │ Validates                │ Executes
         ↓                          ↓
┌─────────────────────┐      ┌──────────────┐
│   ZK-Proof Engine   │      │ Stellar DEX  │
│  (Privacy Layer)    │      │  (Swaps)     │
└─────────────────────┘      └──────────────┘
```

## ✨ Key Features

### For Human Stakers
- ✅ **Earn Passive Income**: 88% of query fees (15% APY)
- ✅ **Full Control**: Set spending limits ($100-$10,000) and time bounds (1h-30d)
- ✅ **Instant Revocation**: Kill Switch revokes all rails in < 1 second
- ✅ **Privacy Protected**: Only cryptographic hashes stored on-chain
- ✅ **Non-Transferable**: Soulbound Tokens (SBTs) bound to your wallet

### For AI Agents
- ✅ **Autonomous Execution**: Execute regulated transactions without KYC
- ✅ **No Private Keys**: Never touch human credentials or wallet keys
- ✅ **Time-Bound Access**: Temporary compliance rails with automatic expiration
- ✅ **Spending Limits**: Hard-coded maximum transaction amounts
- ✅ **Instant Feedback**: Real-time rail validity checking

### For Protocols
- ✅ **Regulatory Compliance**: SEP-8 integration for regulated assets
- ✅ **Audit Trail**: All transactions logged on-chain
- ✅ **Fee Distribution**: Automatic 12%/88% split (protocol/stakers)
- ✅ **Scalable**: Support for multiple agents and stakers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/pnpm
- Rust and Cargo (for contract deployment)
- Freighter Wallet browser extension
- Stellar testnet account with XLM

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dharma-protocol-v2.git
cd dharma-protocol-v2

# Install frontend dependencies
npm install

# Install Rust and Soroban CLI (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustup target add wasm32-unknown-unknown
cargo install --locked soroban-cli
```

### Running the Frontend

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Deploying Contracts

See [contracts/DEPLOYMENT.md](contracts/DEPLOYMENT.md) for detailed instructions.

```bash
cd contracts

# Build all contracts
cd sbt && soroban contract build && cd ..
cd identity-pool && soroban contract build && cd ..
cd dharma-pool && soroban contract build && cd ..

# Deploy to testnet (see DEPLOYMENT.md for full steps)
```

## 📱 User Journey

### 1. Onboard (`/onboard`)
- Connect Freighter wallet
- Complete mock KYC verification
- Receive Soulbound Token (SBT)

### 2. Stake (`/stake`)
- Set spending limit ($100-$10,000)
- Choose time bound (1h-30d)
- View estimated APY (15%)
- Stake your identity

### 3. Earn (`/dashboard`)
- Monitor accumulated fees
- View active compliance rails
- Track transaction history
- Use Kill Switch if needed

### 4. Monitor (`/agent`)
- Watch BOT-X agent in action
- See live transaction logs
- Track agent performance
- View rail usage

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Wallet**: Freighter API
- **Blockchain**: Stellar SDK

### Smart Contracts
- **Platform**: Stellar Soroban
- **Language**: Rust
- **SDK**: soroban-sdk 22.0.0
- **Network**: Testnet

### Contracts
1. **SBT Contract**: Non-transferable identity tokens
2. **Identity Pool**: Staking and capacity management
3. **Dharma Pool**: Compliance rail issuance and fee distribution

## 📊 Demo Flow

```
1. Human stakes identity with $1,000 limit
   ↓
2. BOT-X scans Stellar DEX for opportunities
   ↓
3. Agent finds arbitrage: 100 USDC → 105 XLM
   ↓
4. Agent requests Compliance Rail from Dharma Pool
   ↓
5. Agent pays $0.88 query fee (88% to staker)
   ↓
6. Dharma Pool issues time-bound rail
   ↓
7. Agent executes swap on DEX
   ↓
8. Staker earns $0.77 fee (88% of $0.88)
   ↓
9. Human can revoke access anytime via Kill Switch
```

## 🔐 Security Features

### Smart Contract Security
- ✅ Reentrancy protection
- ✅ Access control (role-based permissions)
- ✅ Integer overflow checks
- ✅ Time-based expiration
- ✅ Spending limit enforcement

### Privacy Protection
- ✅ Zero-knowledge proofs (simplified for MVP)
- ✅ Only cryptographic hashes on-chain
- ✅ No PII in contract storage
- ✅ Agent never accesses private keys

### Kill Switch
- ✅ Instant revocation (< 1 second)
- ✅ Revokes ALL active rails
- ✅ Irreversible (agents must request new rails)
- ✅ Emergency admin override

## 📈 Roadmap

### MVP (Current)
- ✅ SBT issuance and verification
- ✅ Identity staking with limits
- ✅ Compliance rail issuance
- ✅ Kill Switch functionality
- ✅ Fee distribution (12%/88%)
- ✅ Frontend dashboard
- ✅ Mock agent simulation

### Phase 2 (Post-Hackathon)
- [ ] Full ZK-SNARK implementation
- [ ] SEP-8 compliance integration
- [ ] Real AI agent with LangChain
- [ ] Multi-staker proportional distribution
- [ ] Cross-contract calls (SBT verification)
- [ ] Production security audit

### Phase 3 (Future)
- [ ] Multi-chain support (Ethereum, Solana)
- [ ] Dynamic APY based on demand
- [ ] Reputation system for stakers
- [ ] Agent marketplace
- [ ] Insurance pool
- [ ] Governance token
- [ ] Mobile apps

## 🎓 Learn More

### Documentation
- [Requirements](./kiro/specs/dharma-protocol-v2/requirements.md)
- [Design](./kiro/specs/dharma-protocol-v2/design.md)
- [Tasks](./kiro/specs/dharma-protocol-v2/tasks.md)
- [Deployment Guide](./contracts/DEPLOYMENT.md)
- [Progress Tracker](./PROGRESS.md)

### Resources
- [Stellar Documentation](https://developers.stellar.org/)
- [Soroban Smart Contracts](https://soroban.stellar.org/)
- [Freighter Wallet](https://www.freighter.app/)
- [SEP-8 Standard](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0008.md)

## 🤝 Contributing

This is a hackathon MVP. Contributions welcome after the event!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- **Stellar Foundation** for Soroban smart contract platform
- **Agentic Commerce Track** for the hackathon opportunity
- **shadcn/ui** for beautiful UI components
- **Freighter** for wallet integration

## 📞 Contact

- **Project**: Dharma Protocol v2.0
- **Track**: Agentic Commerce on Stellar/Soroban
- **Demo**: [Live Demo Link]
- **Video**: [Demo Video Link]

---

**Built with ❤️ for the Stellar Agentic Commerce Hackathon**

*"Identity as Liquidity - Empowering autonomous agents while protecting human privacy"*
