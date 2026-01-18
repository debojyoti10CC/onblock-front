# 🚀 Dharma Protocol v2.0 - Real MVP Deployment Guide

This guide will help you deploy a **real, working MVP** with actual smart contracts on Stellar testnet.

## What You're Building

A fully functional "Identity as Liquidity" protocol where:
- ✅ Users stake their KYC identity on-chain
- ✅ AI agents request compliance rails
- ✅ Users earn fees automatically (88% of query fees)
- ✅ Kill Switch instantly revokes all access
- ✅ Everything verifiable on Stellar blockchain

---

## Prerequisites Installation

### 1. Install Rust & Soroban CLI

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Add WASM target
rustup target add wasm32-unknown-unknown

# Install Soroban CLI
cargo install --locked soroban-cli --version 22.0.1

# Verify installation
soroban --version
```

### 2. Configure Stellar Testnet

```bash
soroban network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

### 3. Create & Fund Deployer Account

```bash
# Generate keypair
soroban keys generate deployer --network testnet

# Get your address
soroban keys address deployer

# Fund account (copy the address from above)
curl "https://friendbot.stellar.org?addr=$(soroban keys address deployer)"
```

---

## Smart Contract Deployment

### Step 1: Build Contracts

```bash
cd contracts

# Build SBT contract
cd sbt
soroban contract build
cd ..

# Build Identity Pool
cd identity-pool
soroban contract build
cd ..

# Build Dharma Pool
cd dharma-pool
soroban contract build
cd ..
```

### Step 2: Deploy Contracts

```bash
# Deploy SBT Contract
SBT_ID=$(soroban contract deploy \
  --wasm sbt/target/wasm32-unknown-unknown/release/sbt.wasm \
  --source deployer \
  --network testnet)

echo "✅ SBT Contract: $SBT_ID"

# Deploy Identity Pool
POOL_ID=$(soroban contract deploy \
  --wasm identity-pool/target/wasm32-unknown-unknown/release/identity_pool.wasm \
  --source deployer \
  --network testnet)

echo "✅ Identity Pool: $POOL_ID"

# Deploy Dharma Pool
DHARMA_ID=$(soroban contract deploy \
  --wasm dharma-pool/target/wasm32-unknown-unknown/release/dharma_pool.wasm \
  --source deployer \
  --network testnet)

echo "✅ Dharma Pool: $DHARMA_ID"
```

### Step 3: Initialize Contracts

```bash
# Get deployer address
DEPLOYER=$(soroban keys address deployer)

# Initialize SBT
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --admin $DEPLOYER

# Initialize Identity Pool
soroban contract invoke \
  --id $POOL_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --sbt_contract $SBT_ID

# Initialize Dharma Pool
soroban contract invoke \
  --id $DHARMA_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --identity_pool $POOL_ID \
  --protocol_treasury $DEPLOYER

echo "✅ All contracts initialized!"
```

---

## Frontend Configuration

### Step 1: Create Environment File

Create `.env.local` in your project root:

```bash
# Copy contract IDs from deployment
NEXT_PUBLIC_SBT_CONTRACT_ID=<your_sbt_contract_id>
NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID=<your_pool_contract_id>
NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID=<your_dharma_contract_id>
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
```

### Step 2: Install Freighter Wallet

1. Install [Freighter Wallet](https://www.freighter.app/) browser extension
2. Create a new wallet or import existing
3. Switch to **Stellar Testnet** in Freighter settings
4. Fund your wallet: `https://friendbot.stellar.org?addr=YOUR_ADDRESS`

### Step 3: Start Development Server

```bash
npm install
npm run dev
```

Open http://localhost:3000

---

## Testing Your Real MVP

### 1. Connect Wallet
- Click "Connect Wallet" in navigation
- Approve connection in Freighter

### 2. Complete Onboarding
- Go to `/onboard`
- Fill in name and email
- Click "Complete KYC & Issue SBT"
- Sign transaction in Freighter
- ✅ Real SBT issued on Stellar!

### 3. Stake Identity
- Go to `/stake`
- Set spending limit (e.g., $1,000)
- Choose time bound (e.g., 24 hours)
- Click "Stake Identity"
- Sign transaction
- ✅ Identity staked on-chain!

### 4. View Dashboard
- Go to `/dashboard`
- See your real staked amount
- View accumulated fees
- Monitor active rails
- ✅ All data from blockchain!

### 5. Test Kill Switch
- In dashboard, click "KILL SWITCH"
- Confirm action
- Sign transaction
- ✅ All rails revoked on-chain!

---

## Verify on Blockchain

View your transactions on Stellar Expert:

```
https://stellar.expert/explorer/testnet/account/YOUR_ADDRESS
```

You can see:
- SBT issuance transactions
- Staking transactions
- Rail revocations
- Fee distributions

---

## What Makes This a Real MVP

### ❌ Before (Mockup):
- Fake data in state
- No blockchain interaction
- Just UI demonstration

### ✅ After (Real MVP):
- Smart contracts deployed on Stellar testnet
- Real transactions signed with Freighter
- Actual SBT tokens on blockchain
- On-chain staking with real state
- Working Kill Switch that revokes contracts
- Verifiable on Stellar Expert
- Real fee distribution logic

---

## Troubleshooting

### Contract Build Fails
```bash
# Make sure you're in the contract directory
cd contracts/sbt
soroban contract build

# Check Rust version
rustc --version  # Should be 1.70+
```

### Deployment Fails
```bash
# Check account balance
soroban contract invoke \
  --id CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC \
  --source deployer \
  --network testnet \
  -- balance \
  --id $(soroban keys address deployer)

# Fund again if needed
curl "https://friendbot.stellar.org?addr=$(soroban keys address deployer)"
```

### Frontend Can't Connect
1. Check `.env.local` has correct contract IDs
2. Restart dev server: `npm run dev`
3. Make sure Freighter is on testnet
4. Clear browser cache

### Transaction Fails
- Ensure wallet has XLM for fees
- Check contract is initialized
- Verify you have SBT before staking
- Check Freighter is unlocked

---

## Next Steps

### For Demo/Hackathon:
1. ✅ Deploy contracts (done)
2. ✅ Test complete flow (done)
3. 📹 Record demo video showing:
   - Wallet connection
   - SBT issuance
   - Identity staking
   - Dashboard with real data
   - Kill Switch in action
   - Verification on Stellar Expert

### For Production:
- Add comprehensive tests
- Implement ZK-proofs for privacy
- Add SEP-8 compliance integration
- Build real AI agent
- Security audit
- Mainnet deployment

---

## Contract Addresses

After deployment, save these for reference:

```
SBT Contract:      <your_contract_id>
Identity Pool:     <your_contract_id>
Dharma Pool:       <your_contract_id>
Deployer Address:  <your_address>
```

---

## Support

If you encounter issues:
1. Check contract is deployed: `soroban contract info --id <CONTRACT_ID> --network testnet`
2. Verify account funded: Check on Stellar Expert
3. Review browser console for errors
4. Check Freighter is connected to testnet

---

## Success Criteria

You have a working MVP when:
- ✅ Contracts deployed and initialized
- ✅ Frontend connects to Freighter
- ✅ Can issue SBT on-chain
- ✅ Can stake identity with real transaction
- ✅ Dashboard shows real blockchain data
- ✅ Kill Switch revokes rails on-chain
- ✅ All verifiable on Stellar Expert

**Congratulations! You now have a real, working MVP of Dharma Protocol v2.0!** 🎉
