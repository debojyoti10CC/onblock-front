# 🚀 Quick Start - Build Your Real MVP in 30 Minutes

This guide gets you from zero to a working MVP with real blockchain integration.

## What You're Building

A fully functional "Identity as Liquidity" protocol where users stake their KYC identity and earn passive income from AI agents using their compliance.

**This is NOT a mockup** - everything runs on Stellar testnet with real smart contracts.

---

## Step 1: Install Prerequisites (10 minutes)

### Install Rust & Soroban

**Windows (PowerShell):**
```powershell
# Install Rust
Invoke-WebRequest -Uri https://win.rustup.rs/x86_64 -OutFile rustup-init.exe
.\rustup-init.exe

# Restart terminal, then:
rustup target add wasm32-unknown-unknown
cargo install --locked soroban-cli --version 22.0.1
```

**Mac/Linux:**
```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Add WASM target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install --locked soroban-cli --version 22.0.1
```

### Configure Stellar Testnet

```bash
soroban network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

---

## Step 2: Deploy Smart Contracts (5 minutes)

### Option A: Automated Script (Recommended)

**Windows:**
```powershell
.\scripts\deploy-contracts.ps1
```

**Mac/Linux:**
```bash
chmod +x scripts/deploy-contracts.sh
./scripts/deploy-contracts.sh
```

This will:
- ✅ Create and fund a deployer account
- ✅ Build all 3 smart contracts
- ✅ Deploy to Stellar testnet
- ✅ Initialize contracts
- ✅ Create `.env.local` with contract IDs

### Option B: Manual Deployment

See [MVP_DEPLOYMENT_GUIDE.md](./MVP_DEPLOYMENT_GUIDE.md) for step-by-step instructions.

---

## Step 3: Install Freighter Wallet (2 minutes)

1. Install [Freighter Wallet](https://www.freighter.app/) browser extension
2. Create a new wallet
3. **Switch to Stellar Testnet** in settings
4. Fund your wallet: https://friendbot.stellar.org

---

## Step 4: Start the App (1 minute)

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Step 5: Test Your Real MVP (10 minutes)

### 1. Connect Wallet
- Click "Connect Wallet" in navigation
- Approve in Freighter

### 2. Get Your SBT
- Go to "Onboard" page
- Fill in name and email
- Click "Complete KYC & Issue SBT"
- Sign transaction in Freighter
- ✅ **Real SBT issued on blockchain!**

### 3. Stake Your Identity
- Go to "Stake" page
- Set spending limit: $1,000
- Choose time: 24 hours
- Click "Stake Identity"
- Sign transaction
- ✅ **Identity staked on-chain!**

### 4. View Dashboard
- Go to "Dashboard"
- See your staked amount (from blockchain)
- View accumulated fees
- Monitor active rails
- ✅ **All data is real!**

### 5. Test Kill Switch
- Click "KILL SWITCH" button
- Confirm action
- Sign transaction
- ✅ **All rails revoked on blockchain!**

---

## Verify It's Real

View your transactions on Stellar Expert:
```
https://stellar.expert/explorer/testnet/account/YOUR_ADDRESS
```

You'll see:
- SBT issuance transaction
- Staking transaction
- Rail revocations
- All contract interactions

---

## What You Have Now

### ✅ Real MVP Features:
- Smart contracts deployed on Stellar testnet
- Real wallet integration with Freighter
- Actual SBT tokens (non-transferable)
- On-chain identity staking
- Working Kill Switch
- Real transaction signing
- Verifiable on blockchain explorer

### ❌ What's NOT Mocked:
- Contract deployment
- Transaction signing
- Blockchain state
- SBT issuance
- Staking logic
- Kill Switch functionality

---

## Troubleshooting

### "Soroban command not found"
```bash
# Make sure Rust is in PATH
source $HOME/.cargo/env  # Mac/Linux
# Or restart terminal on Windows
```

### "Contract deployment failed"
```bash
# Fund your deployer account
curl "https://friendbot.stellar.org?addr=$(soroban keys address deployer)"
```

### "Transaction failed in Freighter"
- Make sure Freighter is on **Testnet** (not Mainnet)
- Fund your wallet: https://friendbot.stellar.org
- Check you have SBT before staking

### "Frontend shows no data"
- Check `.env.local` exists with contract IDs
- Restart dev server: `npm run dev`
- Clear browser cache

---

## Next Steps

### For Demo:
1. ✅ Test complete flow
2. 📹 Record demo video
3. 📝 Document contract addresses
4. 🎯 Prepare talking points

### For Production:
- Add comprehensive tests
- Implement real ZK-proofs
- Add SEP-8 compliance
- Build AI agent
- Security audit
- Deploy to mainnet

---

## File Structure

```
├── contracts/              # Smart contracts (Rust)
│   ├── sbt/               # Soulbound Token
│   ├── identity-pool/     # Identity staking
│   └── dharma-pool/       # Compliance rails
├── app/                   # Next.js pages
│   ├── onboard/          # KYC & SBT issuance
│   ├── stake/            # Identity staking
│   └── dashboard/        # User dashboard
├── lib/
│   ├── contract-client.ts # Stellar SDK integration
│   ├── wallet-context.tsx # Freighter integration
│   └── stellar-config.ts  # Network config
├── scripts/
│   ├── deploy-contracts.sh   # Bash deployment
│   └── deploy-contracts.ps1  # PowerShell deployment
└── .env.local            # Contract IDs (created by script)
```

---

## Support

Need help?
1. Check [MVP_DEPLOYMENT_GUIDE.md](./MVP_DEPLOYMENT_GUIDE.md) for detailed instructions
2. Review browser console for errors
3. Verify contracts on Stellar Expert
4. Check Freighter is connected to testnet

---

## Success Checklist

- [ ] Rust and Soroban CLI installed
- [ ] Contracts deployed to testnet
- [ ] `.env.local` created with contract IDs
- [ ] Freighter wallet installed and funded
- [ ] Can connect wallet to app
- [ ] Can issue SBT on-chain
- [ ] Can stake identity
- [ ] Dashboard shows real data
- [ ] Kill Switch works
- [ ] Verified on Stellar Expert

**When all checked, you have a real working MVP!** 🎉

---

## Time Estimate

- Prerequisites: 10 minutes
- Contract deployment: 5 minutes
- Wallet setup: 2 minutes
- App startup: 1 minute
- Testing: 10 minutes

**Total: ~30 minutes to working MVP**

---

Ready to build? Start with Step 1! 🚀
