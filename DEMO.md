# Dharma Protocol v2.0 - Demo Guide

## 🎬 Quick Demo (5 Minutes)

This guide will walk you through a complete demo of Dharma Protocol v2.0.

### Prerequisites
- Freighter Wallet installed (optional for demo)
- Development server running (`npm run dev`)

### Demo Flow

#### 1. Home Page (30 seconds)
**URL**: `http://localhost:3000`

**What to Show**:
- "Identity as Liquidity" concept
- Three key features: Privacy, Earnings, Control
- How it works (4-step process)

**Talking Points**:
- "Dharma Protocol lets verified humans stake their identity to earn passive income"
- "AI agents can rent this compliance capacity to execute regulated transactions"
- "Privacy is protected - only cryptographic hashes on-chain, never your personal data"

---

#### 2. Onboarding (1 minute)
**URL**: `http://localhost:3000/onboard`

**What to Show**:
- Connect wallet (or skip if demonstrating without wallet)
- Mock KYC form (name, email)
- SBT issuance success screen

**Talking Points**:
- "Users complete KYC verification through an anchor"
- "They receive a Soulbound Token - non-transferable, bound to their wallet"
- "Only a cryptographic hash is stored on-chain, protecting privacy"

**Demo Steps**:
1. Click "Connect Wallet" (or proceed without)
2. Fill in mock KYC form
3. Click "Complete KYC & Issue SBT"
4. Show SBT details (owner, hash, status)
5. Click "Stake Your Identity"

---

#### 3. Staking (1 minute)
**URL**: `http://localhost:3000/stake`

**What to Show**:
- Spending limit slider ($100-$10,000)
- Time-bound selector (1h-30d)
- APY display (15%)
- Estimated earnings

**Talking Points**:
- "Stakers set their own limits - how much agents can spend"
- "Time bounds control how long the identity stays staked"
- "Estimated 15% APY from query fees"
- "88% of fees go to stakers, 12% to protocol"

**Demo Steps**:
1. Adjust spending limit to $1,000
2. Select "24 hours" time bound
3. Show estimated earnings: $150/year
4. Click "Stake Identity"
5. Show success screen
6. Click "View Dashboard"

---

#### 4. Dashboard & Kill Switch (1.5 minutes)
**URL**: `http://localhost:3000/dashboard`

**What to Show**:
- Stats cards (staked amount, fees, active rails)
- Active compliance rails with progress bars
- **KILL SWITCH** button (prominent, red)
- Transaction history

**Talking Points**:
- "Dashboard shows real-time earnings and active rails"
- "Each rail represents an agent using your compliance capacity"
- "The Kill Switch is the key feature - instant revocation"
- "One click revokes ALL active rails in under 1 second"

**Demo Steps**:
1. Show stats: $1,000 staked, $12.50 earned
2. Scroll to active rails section
3. Show 2 active rails with usage progress
4. **Click "KILL SWITCH"**
5. Show confirmation modal with warning
6. Click "Activate Kill Switch"
7. Show success: "2 rails revoked"
8. Rails now show as "Revoked"

---

#### 5. Agent Monitoring (1 minute)
**URL**: `http://localhost:3000/agent`

**What to Show**:
- BOT-X agent status
- Live logs (if running)
- Active rails from agent perspective
- Transaction history with profits

**Talking Points**:
- "BOT-X is our demo AI agent"
- "It scans the Stellar DEX for arbitrage opportunities"
- "When it finds a trade, it requests a compliance rail"
- "Pays a query fee (88% to stakers), executes the swap"
- "Agent never touches your private keys or identity"

**Demo Steps**:
1. Show agent stats (2 swaps, $3.70 profit)
2. Click "Start Agent" to show live logs
3. Show active rail with spending limit
4. Show recent transactions with fees paid
5. Explain how fees flow to stakers

---

## 🎯 Key Demo Points

### 1. The Problem
"AI agents need to execute regulated transactions but can't complete KYC or hold identity documents."

### 2. The Solution
"Dharma Protocol creates a marketplace where verified humans stake their identity, and agents rent compliance capacity through time-bound, spending-limited authorization rails."

### 3. Privacy
"Zero-knowledge proofs ensure personal information never leaves the staker. Only cryptographic hashes on-chain."

### 4. Control
"Kill Switch provides instant revocation - under 1 second. One click revokes ALL active rails."

### 5. Earnings
"Stakers earn 88% of query fees. With 15% APY, a $1,000 stake earns $150/year passively."

### 6. Security
"Agents never access private keys. Spending limits and time bounds are enforced on-chain. Soulbound tokens are non-transferable."

---

## 📊 Demo Script (Elevator Pitch)

**30 Second Version**:
"Dharma Protocol enables 'Identity as Liquidity' - verified humans stake their KYC credentials to earn passive income, while AI agents rent this compliance capacity to execute regulated transactions. Privacy is protected through zero-knowledge proofs, and stakers maintain full control via an instant Kill Switch. It's like a pre-paid trust card for autonomous agents."

**2 Minute Version**:
"The problem: AI agents need to execute regulated transactions on DEXs and payment rails, but they can't complete KYC or hold identity documents.

Our solution: Dharma Protocol creates a trust layer where verified humans 'stake' their identity to provide compliance capacity. AI agents can temporarily rent this capacity through time-bound, spending-limited authorization rails.

Here's how it works:
1. Humans complete KYC and receive a Soulbound Token
2. They stake their SBT with spending limits and time bounds
3. AI agents pay a query fee to rent compliance capacity
4. Agents execute transactions using the rented compliance
5. Stakers earn 88% of fees automatically

Key features:
- Privacy: Zero-knowledge proofs protect personal data
- Control: Kill Switch revokes all access in under 1 second
- Earnings: 15% APY from query fees
- Security: Agents never touch private keys

Built on Stellar/Soroban for fast, low-cost transactions. Perfect for agentic commerce."

---

## 🎥 Video Demo Tips

### Recording Setup
1. Use 1920x1080 resolution
2. Hide browser bookmarks bar
3. Close unnecessary tabs
4. Use incognito mode for clean demo
5. Prepare test data beforehand

### Recording Flow
1. **Intro** (10 seconds): Show home page, explain concept
2. **Onboarding** (30 seconds): KYC flow, SBT issuance
3. **Staking** (30 seconds): Set limits, show APY
4. **Dashboard** (45 seconds): Show earnings, demonstrate Kill Switch
5. **Agent** (30 seconds): Show BOT-X in action
6. **Outro** (15 seconds): Recap benefits, call to action

### Narration Tips
- Speak clearly and at moderate pace
- Explain what you're clicking before clicking
- Highlight key numbers (APY, fees, earnings)
- Emphasize the Kill Switch demo
- End with the value proposition

---

## 🚀 Live Demo Checklist

### Before Demo
- [ ] Development server running
- [ ] Browser in incognito mode
- [ ] Freighter wallet installed (if showing wallet connection)
- [ ] All pages load correctly
- [ ] Mock data displays properly
- [ ] Animations working smoothly

### During Demo
- [ ] Start with home page overview
- [ ] Show complete onboarding flow
- [ ] Demonstrate staking with limits
- [ ] **Highlight Kill Switch** (most important!)
- [ ] Show agent monitoring
- [ ] Explain fee distribution

### After Demo
- [ ] Answer questions about privacy
- [ ] Explain smart contract architecture
- [ ] Discuss roadmap and future features
- [ ] Share GitHub repo and documentation

---

## 💡 Common Questions & Answers

**Q: How is privacy protected?**
A: We use zero-knowledge proofs to verify compliance without revealing personal information. Only cryptographic hashes are stored on-chain, never raw PII.

**Q: What if an agent misbehaves?**
A: Stakers can activate the Kill Switch to instantly revoke all active rails in under 1 second. Spending limits and time bounds also provide protection.

**Q: How much can I earn?**
A: With 15% APY, a $1,000 stake earns approximately $150 per year. Earnings come from query fees paid by agents (88% goes to stakers).

**Q: Can I transfer my SBT?**
A: No, SBTs are "soulbound" - non-transferable and bound to your wallet. This ensures identity cannot be sold or stolen.

**Q: What happens when the time bound expires?**
A: The stake automatically becomes inactive. You can unstake and withdraw your earnings, or extend the time bound.

**Q: Do agents have access to my private keys?**
A: Never. Agents only receive time-bound authorization rails. They cannot access your wallet, keys, or personal information.

---

## 🎬 Ready to Demo!

Your Dharma Protocol v2.0 MVP is complete and ready to showcase. The demo flow takes about 5 minutes and effectively demonstrates the "Identity as Liquidity" concept.

**Key Highlight**: The Kill Switch demo is your strongest feature - make sure to emphasize the instant revocation capability!

Good luck with your presentation! 🚀
