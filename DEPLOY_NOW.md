# 🚀 Deploy Dharma Protocol - Step by Step

## What You'll Do:
1. Install Rust and Soroban CLI (5 minutes)
2. Build the smart contracts (2 minutes)
3. Deploy to Stellar testnet (5 minutes)
4. Update frontend with contract IDs (1 minute)

**Total Time: ~15 minutes**

---

## Step 1: Install Rust

Open a **new terminal** (not PowerShell, use Git Bash or WSL if on Windows):

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Follow prompts, choose default installation

# Restart terminal or run:
source $HOME/.cargo/env

# Verify installation
rustc --version
```

**Expected output**: `rustc 1.xx.x`

---

## Step 2: Add WASM Target

```bash
rustup target add wasm32-unknown-unknown
```

**Expected output**: `info: component 'rust-std' for target 'wasm32-unknown-unknown' is up to date`

---

## Step 3: Install Soroban CLI

```bash
cargo install --locked soroban-cli
```

**This takes 5-10 minutes. Wait for it to complete.**

**Expected output**: `Installed package soroban-cli`

---

## Step 4: Configure Stellar Testnet

```bash
soroban network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

**Expected output**: Network added successfully

---

## Step 5: Generate Deployer Key

```bash
soroban keys generate deployer --network testnet
```

**Expected output**: Key generated

Get your public key:
```bash
soroban keys address deployer
```

**Copy this address!** You'll need it.

---

## Step 6: Fund Your Account

Visit: https://laboratory.stellar.org/#account-creator?network=test

Or use friendbot:
```bash
curl "https://friendbot.stellar.org?addr=$(soroban keys address deployer)"
```

**Expected output**: JSON response with account details

---

## Step 7: Build Contracts

```bash
cd contracts

# Build SBT
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

**Expected output**: `Finished release [optimized] target(s)`

---

## Step 8: Deploy Contracts

### Deploy SBT:
```bash
SBT_ID=$(soroban contract deploy \
  --wasm sbt/target/wasm32-unknown-unknown/release/sbt.wasm \
  --source deployer \
  --network testnet)

echo "SBT Contract: $SBT_ID"
```

**Copy the SBT_ID!**

### Deploy Identity Pool:
```bash
POOL_ID=$(soroban contract deploy \
  --wasm identity-pool/target/wasm32-unknown-unknown/release/identity_pool.wasm \
  --source deployer \
  --network testnet)

echo "Identity Pool: $POOL_ID"
```

**Copy the POOL_ID!**

### Deploy Dharma Pool:
```bash
DHARMA_ID=$(soroban contract deploy \
  --wasm dharma-pool/target/wasm32-unknown-unknown/release/dharma_pool.wasm \
  --source deployer \
  --network testnet)

echo "Dharma Pool: $DHARMA_ID"
```

**Copy the DHARMA_ID!**

---

## Step 9: Initialize Contracts

### Initialize SBT:
```bash
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --admin $(soroban keys address deployer)
```

### Initialize Identity Pool:
```bash
soroban contract invoke \
  --id $POOL_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --sbt_contract $SBT_ID
```

### Initialize Dharma Pool:
```bash
soroban contract invoke \
  --id $DHARMA_ID \
  --source deployer \
  --network testnet \
  -- initialize \
  --identity_pool $POOL_ID \
  --protocol_treasury $(soroban keys address deployer)
```

---

## Step 10: Update Frontend

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_SBT_CONTRACT_ID=<paste SBT_ID here>
NEXT_PUBLIC_IDENTITY_POOL_CONTRACT_ID=<paste POOL_ID here>
NEXT_PUBLIC_DHARMA_POOL_CONTRACT_ID=<paste DHARMA_ID here>
NEXT_PUBLIC_STELLAR_NETWORK=TESTNET
```

---

## Step 11: Test It Works

```bash
# Issue an SBT to yourself
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- issue_sbt \
  --owner $(soroban keys address deployer) \
  --kyc_hash 0000000000000000000000000000000000000000000000000000000000000001

# Verify it worked
soroban contract invoke \
  --id $SBT_ID \
  --source deployer \
  --network testnet \
  -- verify_sbt \
  --owner $(soroban keys address deployer)
```

**Expected output**: `true`

---

## ✅ You're Done!

Your contracts are now live on Stellar testnet!

**Contract Explorer**: https://stellar.expert/explorer/testnet

**Next**: Update your frontend to use these contract IDs and you'll have a real working MVP!

---

## Troubleshooting

### "cargo: command not found"
- Restart your terminal after installing Rust
- Or run: `source $HOME/.cargo/env`

### "insufficient balance"
- Fund your account again from friendbot
- Wait 30 seconds and try again

### "contract not found"
- Make sure you saved the contract IDs
- Check they're not empty: `echo $SBT_ID`

### Build errors
- Make sure you're in the contracts directory
- Check Rust is installed: `rustc --version`
- Try: `cargo clean` then rebuild

---

## Alternative: Keep as Demo

If deployment is too complex, I can make the mockup way more impressive:
- Add animations showing the flow
- Add explanatory tooltips
- Add a "Demo Mode" banner
- Make it clear what's happening at each step
- Add more visual feedback

**Let me know which path you want!**
